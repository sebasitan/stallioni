export interface JobOpening {
    id: string;
    title: string;
    type: string;
    responsibilities: string[];
    requirements: string[];
    status: 'open' | 'closed';
}

const STORAGE_KEY = 'stallioni_jobs';

// Get all job openings
export function getJobOpenings(): JobOpening[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading jobs:', error);
        return [];
    }
}

// Save job openings
export function saveJobOpenings(jobs: JobOpening[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch (error) {
        console.error('Error saving jobs:', error);
        throw error;
    }
}

// Add new job opening
export function addJobOpening(job: Omit<JobOpening, 'id'>): JobOpening {
    const jobs = getJobOpenings();
    const newJob: JobOpening = {
        ...job,
        id: `job-${Date.now()}`,
        status: job.status || 'open'
    };
    jobs.push(newJob);
    saveJobOpenings(jobs);
    return newJob;
}

// Update job opening
export function updateJobOpening(id: string, updates: Partial<JobOpening>): JobOpening | null {
    const jobs = getJobOpenings();
    const index = jobs.findIndex(job => job.id === id);

    if (index === -1) return null;

    jobs[index] = { ...jobs[index], ...updates };
    saveJobOpenings(jobs);
    return jobs[index];
}

// Delete job opening
export function deleteJobOpening(id: string): boolean {
    const jobs = getJobOpenings();
    const filtered = jobs.filter(job => job.id !== id);

    if (filtered.length === jobs.length) return false;

    saveJobOpenings(filtered);
    return true;
}

// Get single job opening
export function getJobOpening(id: string): JobOpening | null {
    const jobs = getJobOpenings();
    return jobs.find(job => job.id === id) || null;
}

// Toggle job status
export function toggleJobStatus(id: string): JobOpening | null {
    const job = getJobOpening(id);
    if (!job) return null;

    return updateJobOpening(id, {
        status: job.status === 'open' ? 'closed' : 'open'
    });
}
