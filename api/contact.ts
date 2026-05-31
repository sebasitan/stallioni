import nodemailer from 'nodemailer';
// Triggering deployment...

// Simple in-memory rate limiting (Note: resets on cold starts in serverless)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_SUBMISSIONS = 3;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '127.0.0.1';

    // Rate limiting logic
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
        rateData.count = 0;
        rateData.lastReset = now;
    }

    if (rateData.count >= MAX_SUBMISSIONS) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    rateData.count++;
    rateLimitMap.set(ip, rateData);

    try {
        const { name, email, message, _gotcha, recaptchaToken, _subject, organization, phone, position, linkedin, portfolio, resume_link } = req.body;

        // Honeypot — invisible field, only bots fill it. The old `company` honeypot
        // collided with browser autofill (Chrome/Safari fill `name="company"` even
        // when display:none), silently dropping real submissions.
        if (_gotcha) {
            console.log('Bot detected via honeypot');
            return res.status(200).json({ success: true, message: 'Message sent successfully' });
        }

        // 2. Validate fields
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 3. Verify reCAPTCHA v3
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (secretKey) {
            const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `secret=${secretKey}&response=${recaptchaToken}`,
            });
            const recaptchaData = await recaptchaRes.json();

            if (!recaptchaData.success || recaptchaData.score < 0.5) {
                console.log('reCAPTCHA failed or low score', recaptchaData);
                // Fail silently for bots
                return res.status(200).json({ success: true, message: 'Message sent successfully' });
            }
        }

        // 4. Create Lead in Zoho CRM (non-blocking — if Zoho fails, email still goes through)
        try {
            console.log('Zoho env check:', {
                hasRefreshToken: !!process.env.ZOHO_REFRESH_TOKEN,
                hasClientId: !!process.env.ZOHO_CLIENT_ID,
                hasClientSecret: !!process.env.ZOHO_CLIENT_SECRET,
                apiDomain: process.env.ZOHO_API_DOMAIN,
            });

            const tokenRes = await fetch('https://accounts.zoho.com/oauth/v2/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    refresh_token: process.env.ZOHO_REFRESH_TOKEN || '',
                    client_id: process.env.ZOHO_CLIENT_ID || '',
                    client_secret: process.env.ZOHO_CLIENT_SECRET || '',
                    grant_type: 'refresh_token',
                }),
            });
            const tokenData = await tokenRes.json();
            const accessToken = tokenData.access_token;

            console.log('Zoho token response:', { status: tokenRes.status, hasAccessToken: !!accessToken, error: tokenData.error });

            if (accessToken) {
                const utmSource = (req.body.utm_source as string) || '';
                const utmCampaign = (req.body.utm_campaign as string) || '';

                let leadSource = 'Website - General';
                if (utmSource === 'smartlead' || utmSource === 'apollo') {
                    leadSource = `Cold Email${utmCampaign ? ' - ' + utmCampaign : ''}`;
                } else if (_subject?.includes('Partnership')) {
                    leadSource = 'Website - Partnership';
                } else if (_subject?.includes('Project')) {
                    leadSource = 'Website - Project';
                }

                const leadRes = await fetch(`${process.env.ZOHO_API_DOMAIN}/crm/v6/Leads`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Zoho-oauthtoken ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: [{
                            Last_Name: name,
                            Email: email,
                            Company: organization || 'Unknown',
                            Phone: phone || '',
                            Lead_Source: leadSource,
                            Description: message,
                        }],
                    }),
                });
                const leadResult = await leadRes.json();
                console.log('Zoho lead result:', { status: leadRes.status, body: leadResult });
            } else {
                console.error('Zoho: no access token returned. Skipping lead creation.');
            }
        } catch (zohoErr) {
            console.error('Zoho lead creation failed:', zohoErr);
        }

        // 5. Send Email via mail.stallioni.com SMTP (Nodemailer)
        const transporter = nodemailer.createTransport({
            host: 'mail.stallioni.com',
            port: 465,
            secure: true, // SSL
            auth: {
                user: process.env.SMTP_USER || 'contact@stallioni.com',
                pass: process.env.SMTP_PASS, // App password from mail.stallioni.com user panel
            },
        });

        const mailOptions = {
            from: `"Stallioni Web Form" <${process.env.SMTP_USER || 'contact@stallioni.com'}>`,
            to: 'contact@stallioni.com',
            replyTo: email,
            subject: _subject || `New Lead: ${name} from Stallioni Website`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #FF6633;">${_subject || 'New Contact Lead Received'}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${organization ? `<p><strong>Company:</strong> ${organization}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${position ? `<p><strong>Applied for:</strong> ${position}</p>` : ''}
          ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : ''}
          ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>` : ''}
          ${resume_link ? `<p><strong>Resume:</strong> <a href="${resume_link}">View Resume</a></p>` : ''}
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (mailErr) {
            // Don't fail the form if email fails — Zoho lead already created above
            console.error('Email send failed:', mailErr);
        }

        return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact API Route Error:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
}
