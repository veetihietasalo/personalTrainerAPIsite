import { demoCustomers, demoTrainings } from './demoData';

export const API_URL = 'https://traineeapp.azurewebsites.net';

// Set after the first failed request, so the other views go straight to demo data
let apiOffline = false;

const getJson = async (path) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        const response = await fetch(API_URL + path, { signal: controller.signal });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } finally {
        clearTimeout(timeout);
    }
};

// Resolves to { data, demo }. demo is true when the bundled sample data was used.
const withFallback = async (path, pick, demoData) => {
    if (!apiOffline) {
        try {
            const data = pick(await getJson(path));
            if (Array.isArray(data)) {
                return { data, demo: false };
            }
            throw new Error('Unexpected response');
        } catch (error) {
            apiOffline = true;
            console.info(`Course API not reachable (${error.message}), using demo data.`);
        }
    }
    return { data: demoData, demo: true };
};

export const getCustomers = () => withFallback('/api/customers', json => json.content, demoCustomers);

export const getTrainings = () => withFallback('/gettrainings', json => json, demoTrainings);
