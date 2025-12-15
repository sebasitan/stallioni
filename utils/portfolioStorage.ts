import { PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

const STORAGE_KEY = 'stallioni_portfolio';

// Get all portfolio items
export function getPortfolioItems(): PortfolioItem[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            const initialItems = [...PORTFOLIO_ITEMS];
            // Ensure IDs are handled as strings if we want consistency, but mixed is now allowed.
            // Let's explicitly cast to match our new loose type
            const formattedInitial = initialItems.map(p => ({ ...p, id: p.id.toString() }));
            savePortfolioItems(formattedInitial);
            return formattedInitial;
        }
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading portfolio:', error);
        return [];
    }
}

// Save portfolio items
export function savePortfolioItems(items: PortfolioItem[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Error saving portfolio:', error);
        throw error;
    }
}

// Add new portfolio item
export function addPortfolioItem(item: Omit<PortfolioItem, 'id'>): PortfolioItem {
    const items = getPortfolioItems();
    const newItem: PortfolioItem = {
        ...item,
        id: `portfolio-${Date.now()}`
    };
    items.push(newItem);
    savePortfolioItems(items);
    return newItem;
}

// Update portfolio item
export function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): PortfolioItem | null {
    const items = getPortfolioItems();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) return null;

    items[index] = { ...items[index], ...updates };
    savePortfolioItems(items);
    return items[index];
}

// Delete portfolio item
export function deletePortfolioItem(id: string): boolean {
    const items = getPortfolioItems();
    const filtered = items.filter(item => item.id !== id);

    if (filtered.length === items.length) return false;

    savePortfolioItems(filtered);
    return true;
}

// Get single portfolio item
export function getPortfolioItem(id: string): PortfolioItem | null {
    const items = getPortfolioItems();
    return items.find(item => item.id === id) || null;
}
