import { useState, useEffect } from 'react';
import { fetchMenuWithTimeout, getFallbackMenu } from '../services/supabase';
import type { MenuItem } from '../types';

export function useMenu() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        async function loadMenu() {
            try {
                setLoading(true);
                const menuItems = await fetchMenuWithTimeout(5000);

                if (mounted) {
                    setItems(menuItems);
                    setError(null);
                }
            } catch (err) {
                console.error('Failed to load menu, using fallback:', err);

                if (mounted) {
                    setItems(getFallbackMenu());
                    setError(err as Error);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadMenu();

        return () => {
            mounted = false;
        };
    }, []);

    return { items, loading, error };
}
