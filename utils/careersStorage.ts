export interface JobOpening {
    id: string;
    title: string;
    type: string;
    responsibilities: string[];
    requirements: string[];
    status: 'open' | 'closed';
}



const STORAGE_KEY = 'stallioni_jobs';

const INITIAL_JOBS: JobOpening[] = [
    {
        id: 'wordpress-developer',
        title: 'WordPress Developer',
        type: 'Freelance / Contract',
        responsibilities: [
            'Build custom WordPress websites, themes, and plugins',
            'Optimize website speed, SEO structure, and security',
            'Work with ACF, Elementor, Divi, WPBakery, or custom builders',
            'Handle migrations, bug fixes, and WordPress updates',
            'Collaborate with designers and backend developers'
        ],
        requirements: [
            '2+ years of WordPress development experience',
            'Strong PHP & MySQL fundamentals',
            'Experience with APIs, WooCommerce, and custom post types',
            'Clear communication & ability to meet deadlines',
            'Portfolio of previous WordPress projects'
        ],
        status: 'open'
    },
    {
        id: 'react-developer',
        title: 'React Developer',
        type: 'Freelance / Contract',
        responsibilities: [
            'Build modern, responsive front-end applications using React',
            'Integrate APIs and work with backend teams',
            'Optimize components for speed & performance',
            'Convert UI/UX designs into functional code',
            'Write reusable components and modular architecture'
        ],
        requirements: [
            '2+ years of experience with React.js',
            'Strong JavaScript, HTML, CSS',
            'Experience with Redux, hooks, REST APIs',
            'Familiarity with Git, Figma, and agile workflows',
            'Strong problem-solving skills'
        ],
        status: 'open'
    },
    {
        id: 'php-developer',
        title: 'PHP Developer',
        type: 'Freelance / Contract',
        responsibilities: [
            'Develop custom PHP applications',
            'Maintain and optimize existing platforms',
            'Work with MySQL databases and REST APIs',
            'Debug, fix issues, and improve application performance',
            'Collaborate with frontend and backend teams'
        ],
        requirements: [
            '2+ years of experience with Core PHP or PHP frameworks',
            'Strong knowledge of MySQL',
            'Familiar with MVC architecture',
            'Experience with Laravel or CodeIgniter is a plus',
            'Ability to write clean, secure, optimized code'
        ],
        status: 'open'
    },
    {
        id: 'ai-developer',
        title: 'AI Developer',
        type: 'Freelance / Contract',
        responsibilities: [
            'Build AI-driven tools, chatbots, automation scripts',
            'Work with LLMs, AI APIs (OpenAI, Claude, Gemini, etc.)',
            'Train and fine-tune machine learning models',
            'Integrate AI features into web or mobile apps',
            'Provide solutions for automation, prediction, analytics'
        ],
        requirements: [
            'Strong understanding of Python & machine learning',
            'Experience with AI APIs and frameworks (TensorFlow, PyTorch)',
            'Ability to build prototypes quickly',
            'Knowledge of prompt engineering & automation',
            'Portfolio or sample AI projects preferred'
        ],
        status: 'open'
    }
];

// Get all job openings
export function getJobOpenings(): JobOpening[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            saveJobOpenings(INITIAL_JOBS);
            return INITIAL_JOBS;
        }
        return JSON.parse(data);
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
