import type { ServiceDetail } from '../types';

// Lazy loader for SERVICE_DETAILS to avoid loading 500KB+ on every page
let cachedServiceDetails: ServiceDetail[] | null = null;

export async function getServiceDetails(): Promise<ServiceDetail[]> {
    if (cachedServiceDetails) {
        return cachedServiceDetails;
    }

    // Dynamically import the full constants file only when needed
    const module = await import('../constants-full');
    cachedServiceDetails = module.SERVICE_DETAILS;
    return cachedServiceDetails;
}

export async function getServiceDetail(id: string): Promise<ServiceDetail | undefined> {
    const details = await getServiceDetails();
    return details.find(s => s.id === id);
}
