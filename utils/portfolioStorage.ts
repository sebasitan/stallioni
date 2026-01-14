import { PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../constants';

const STORAGE_KEY = 'stallioni_portfolio_v2';

// Get all portfolio items
export function getPortfolioItems(): PortfolioItem[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        let items: PortfolioItem[] = [];

        if (data) {
            items = JSON.parse(data);
        }

        // If the list is empty, re-initialize with defaults
        if (items.length === 0) {
            const initialItems = PORTFOLIO_ITEMS.map(p => ({ ...p, id: p.id.toString() }));
            savePortfolioItems(initialItems);
            return initialItems;
        }

        return items;
    } catch (error) {
        console.error('Error loading portfolio:', error);
        // Fallback to defaults on error
        return PORTFOLIO_ITEMS.map(p => ({ ...p, id: p.id.toString() }));
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
