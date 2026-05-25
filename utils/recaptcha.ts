import { RECAPTCHA_SITE_KEY } from '../constants';

/**
 * reCAPTCHA v3 is only needed when a user actually submits a form (contact,
 * careers, chatbot, footer). Loading api.js eagerly in index.html added the
 * script + its chain-loaded recaptcha__en.js to the main thread on EVERY page,
 * hurting mobile TBT/LCP. We now inject the script lazily the first time a
 * token is requested.
 */
let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
    if (scriptPromise) return scriptPromise;

    scriptPromise = new Promise<void>((resolve, reject) => {
        // Already available (script injected by a previous call or SSR/prerender).
        if (typeof window.grecaptcha !== 'undefined') {
            resolve();
            return;
        }
        if (document.querySelector('script[data-recaptcha]')) {
            resolve();
            return;
        }

        const s = document.createElement('script');
        s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        s.async = true;
        s.defer = true;
        s.setAttribute('data-recaptcha', 'true');
        s.onload = () => resolve();
        s.onerror = () => {
            scriptPromise = null; // allow a retry on the next submit
            reject(new Error('reCAPTCHA failed to load. Please refresh the page and try again.'));
        };
        document.head.appendChild(s);
    });

    return scriptPromise;
}

/**
 * Lazily load reCAPTCHA (on first call), wait for it to be ready, then return a
 * v3 token for the given action.
 *
 * Throws if grecaptcha never becomes available within `timeoutMs` (default 10s).
 */
export async function getRecaptchaToken(action: string, timeoutMs = 10000): Promise<string> {
    // 0. Ensure the script is being (or has been) loaded.
    await loadRecaptchaScript();

    // 1. Wait for window.grecaptcha to be defined
    const start = Date.now();
    while (typeof window.grecaptcha === 'undefined' || typeof window.grecaptcha.ready !== 'function') {
        if (Date.now() - start > timeoutMs) {
            throw new Error('reCAPTCHA failed to load. Please refresh the page and try again.');
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 2. Wait for the v3 API to be ready (grecaptcha.ready fires once)
    await new Promise<void>((resolve) => {
        window.grecaptcha.ready(() => resolve());
    });

    // 3. Execute and return the token
    return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
}
