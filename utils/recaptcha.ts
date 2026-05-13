import { RECAPTCHA_SITE_KEY } from '../constants';

/**
 * Wait until window.grecaptcha is loaded and ready, then return a v3 token
 * for the given action. Handles the race between the form submit click and
 * the async `defer` script tag still being fetched/parsed.
 *
 * Throws if grecaptcha never becomes available within `timeoutMs` (default 10s).
 */
export async function getRecaptchaToken(action: string, timeoutMs = 10000): Promise<string> {
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
