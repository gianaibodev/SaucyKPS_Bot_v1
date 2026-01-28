export function getMenuImage(name: string, category: string): string {
    const n = name.toLowerCase();

    // Stable, high-quality food photography from Unsplash (Direct IDs)
    // Chicken
    if (n.includes('chicken') && n.includes('fried')) return 'https://images.unsplash.com/photo-1626082927389-d31c6d365f9c?q=80&w=800&auto=format&fit=crop';
    if (n.includes('chicken') && n.includes('adobo')) return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop'; // close enough Asian chicken
    if (n.includes('chicken')) return 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800&auto=format&fit=crop';

    // Pork
    if (n.includes('pork') || n.includes('sisig') || n.includes('lechon')) return 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?q=80&w=800&auto=format&fit=crop';

    // Seafood
    if (n.includes('shrimp') || n.includes('seafood')) return 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop';
    if (n.includes('fish') || n.includes('bangus')) return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop';

    // Breakfast / Silog
    if (n.includes('egg') || n.includes('silog') || n.includes('breakfast')) return 'https://images.unsplash.com/photo-1525351484163-7529414395d8?q=80&w=800&auto=format&fit=crop';

    // Fallback by Category
    switch (category.toUpperCase()) {
        case 'FILIPINO SUNRICE':
        case 'FILIPINO':
            return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop'; // Rice bowl
        case 'DISH OF THE DAY':
            return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'; // Salad bowl
        case 'SNACKS':
        case 'MERIENDA':
            return 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop'; // Fries/Chicken
        case 'VEGETABLE MEAL':
        case 'VEGETABLES':
            return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop'; // Veggies
        default:
            return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop'; // Generic darker food bg
    }
}
