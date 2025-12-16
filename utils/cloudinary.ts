// Cloudinary upload utility
// Can be used with URL or file upload

export const CLOUDINARY_CONFIG = {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
};

export async function uploadToCloudinary(file: File): Promise<string> {
    if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
        throw new Error('Cloudinary not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env file');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error?.message || `Upload failed with status ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();

        // Optimize the URL for web usage (ONLY FOR IMAGES)
        // Insert transformations after /upload/
        // Transformations: f_auto (auto format), q_auto (auto quality), c_limit (limit size), w_1600 (max width 1600px)
        let optimizedUrl = data.secure_url;

        // Simple check if it looks like an image based on extension or resource_type
        const isImage = data.resource_type === 'image' && !optimizedUrl.endsWith('.pdf');

        if (isImage && optimizedUrl.includes('/upload/')) {
            const parts = optimizedUrl.split('/upload/');
            optimizedUrl = `${parts[0]}/upload/f_auto,q_auto,c_limit,w_1600/${parts[1]}`;
        }

        return optimizedUrl;
    } catch (error: any) {
        console.error('Cloudinary upload error:', error);
        // Re-throw with a user-friendly message if possible, or the original error
        throw new Error(error.message || 'Image upload failed. Please check your internet connection or try a different file.');
    }
}

// Validate image URL
export function isValidImageUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(urlObj.pathname);
    } catch {
        return false;
    }
}
