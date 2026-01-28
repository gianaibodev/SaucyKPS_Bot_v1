import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useMenu } from '../hooks/useMenu';
import MenuGrid from '../components/MenuGrid';
import Loader from '../components/Loader';
import type { Category } from '../types';

export default function Menu() {
    const { items, loading } = useMenu();
    const [category, setCategory] = useState<Category>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories: Category[] = [
        'all',
        'FILIPINO SUNRICE',
        'DISH OF THE DAY',
        'VEGETABLE MEAL',
        'SEAFOOD',
        'SNACKS',
    ];

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesCategory = category === 'all' || item.category === category;
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [items, category, searchQuery]);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 min-h-screen">
            {/* Header */}
            <h1 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Our Menu</h1>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-8"
            >
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Search for something delicious..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-primary/20 focus:shadow-md transition-all placeholder:text-gray-400 font-medium"
                />
            </motion.div>

            {/* Category Filter */}
            <section className="mb-10">
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setCategory(cat)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${category === cat
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                                : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-primary shadow-sm'
                                }`}
                        >
                            {cat === 'all' ? 'All' : cat}
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Menu Grid */}
            <section>
                {loading ? (
                    <Loader />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={category + searchQuery}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MenuGrid items={filteredItems} />
                        </motion.div>
                    </AnimatePresence>
                )}
            </section>
        </div>
    );
}
