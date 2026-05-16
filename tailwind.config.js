/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./constants/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#FF6633',
                    'orange-hover': '#E5572A',
                    dark: '#1F3769',
                    'dark-hover': '#172B54',
                    light: '#F7F8FA',
                    border: '#E5E7EB',
                    muted: '#6B7280',
                },
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
            animation: {
                marquee: 'marquee 35s linear infinite',
                'fade-in': 'fadeIn 0.3s ease-out forwards',
                'modal-pop-in': 'modalPopIn 0.3s ease-out forwards',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                modalPopIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
            },
        },
    },
    plugins: [],
}
