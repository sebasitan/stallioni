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
        const { name, email, message, company, recaptchaToken, _subject, organization, phone, position, linkedin, portfolio, resume_link } = req.body;

        // 1. Honeypot check (company field should be empty)
        if (company) {
            console.log('Bot detected via honeypot field "company"');
            // Fail silently: return success but don't do anything
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

        // 4. Send Email using Google SMTP (Nodemailer)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // TLS
            auth: {
                user: process.env.SMTP_USER || 'sebas@stallioni.com',
                pass: process.env.SMTP_PASS, // This must be an App Password
            },
        });

        const mailOptions = {
            from: `"Stallioni Web Form" <${process.env.SMTP_USER || 'sebas@stallioni.com'}>`,
            to: 'sebas@stallioni.com',
            replyTo: email,
            subject: _subject || `New Lead: ${name} from Stallioni Website`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #F26522;">${_subject || 'New Contact Lead Received'}</h2>
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

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact API Route Error:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
}
