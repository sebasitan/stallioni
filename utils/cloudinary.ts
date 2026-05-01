// Cloudinary upload utility
// Optimized for both images (Portfolio/Blog) and Documents (Resumes)

export const CLOUDINARY_CONFIG = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
};

export async function uploadToCloudinary(file: File): Promise<string> {
    // 1. Validate Config
    if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
        console.error('Cloudinary Configuration Missing:', CLOUDINARY_CONFIG);
        throw new Error('Cloudinary not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your environment.');
    }

    // 2. Validate File
    if (!file || file.size === 0) {
        throw new Error('No file selected or file is empty.');
    }

    // Limit file size (e.g., 10MB for free tier safety)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
        throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is 10MB.`);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    // Determine resource type
    // Images: image
    // PDFs: image (Cloudinary handles PDFs in the image bucket for transformations)
    // Other Docs (doc, docx, zip): raw
    const isImageOrPdf = file.type.startsWith('image/') || file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const resourceType = isImageOrPdf ? 'image' : 'raw';

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Cloudinary API Error Response:', errorData);

            let errorMessage = errorData.error?.message || `Upload failed with status ${response.status}`;

            // Helpful hints for common errors
            if (errorMessage.includes('Missing upload preset')) {
                errorMessage = 'Cloudinary Upload Preset is missing or incorrect. Check your .env file.';
            } else if (errorMessage.includes('Invalid cloud name')) {
                errorMessage = 'Cloudinary Cloud Name is invalid. Check your .env file.';
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();

        // Optimize the URL for web usage (ONLY FOR ACTUAL IMAGES, NOT PDFS)
        let optimizedUrl = data.secure_url;
        const isActualImage = data.resource_type === 'image' && !optimizedUrl.toLowerCase().endsWith('.pdf');

        if (isActualImage && optimizedUrl.includes('/upload/')) {
            const parts = optimizedUrl.split('/upload/');
            // Transformations: f_auto (auto format), q_auto (auto quality), c_limit (limit size), w_1600 (max width 1600px)
            optimizedUrl = `${parts[0]}/upload/f_auto,q_auto,c_limit,w_1600/${parts[1]}`;
        }

        return optimizedUrl;
    } catch (error: any) {
        console.error('Cloudinary upload error:', error);
        // Re-throw with a user-friendly message if possible, or the original error
        throw new Error(error.message || 'File upload failed. Please check your internet connection and try again.');
    }
}

// Validate image URL
export function isValidImageUrl(url: string): boolean {
    if (!url) return false;
    try {
        const urlObj = new URL(url);
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(urlObj.pathname);
    } catch {
        return false;
    }
}
