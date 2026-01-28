import { motion } from 'framer-motion';
import { Plus, Minus, Star, Heart } from 'lucide-react';
import type { MenuItem } from '../types';
import { useCartStore } from '../store/cartStore';

interface MenuGridProps {
    items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
    const addItem = useCartStore((state) => state.addItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const toggleFavorite = useCartStore((state) => state.toggleFavorite);
    const favorites = useCartStore((state) => state.favorites);
    const cart = useCartStore((state) => state.cart);

    if (items.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto px-4 py-20 text-center bg-white rounded-3xl shadow-sm border border-gray-100"
            >
                <div className="text-6xl mb-6 grayscale opacity-50">🍱</div>
                <h3 className="text-2xl font-black text-gray-800 mb-2">No delicacies found</h3>
                <p className="text-gray-500 font-medium">Try adjusting your filters or search query</p>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item, idx) => {
                const quantity = cart[item.id]?.quantity || 0;

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -8 }}
                        className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full"
                    >
                        {/* Image Section with Overlay */}
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Popular Badge */}
                            {item.popular && (
                                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-wider text-primary">Popular</span>
                                </div>
                            )}

                            {/* Favorite Button */}
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(item.id);
                                }}
                                className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${favorites.includes(item.id)
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                    : 'bg-white/90 backdrop-blur text-gray-400 hover:text-red-500 hover:bg-white shadow-sm'
                                    }`}
                            >
                                <Heart size={16} className={favorites.includes(item.id) ? 'fill-current' : ''} />
                            </motion.button>

                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="w-full h-full bg-[#FDF2F0] flex items-center justify-center"
                            >
                                {item.imageURL.startsWith('http') ? (
                                    <img
                                        src={item.imageURL}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null; // Prevent infinite loop
                                            target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"; // Reliable fallback
                                        }}
                                    />
                                ) : (
                                    <span className="text-8xl filter drop-shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                                        {item.emoji}
                                    </span>
                                )}
                            </motion.div>

                            <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <p className="text-white text-xs font-medium leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="mb-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1 block">
                                    {item.category}
                                </span>
                                <h3 className="font-extrabold text-xl leading-tight text-gray-900 group-hover:text-primary transition-colors duration-300">
                                    {item.name}
                                </h3>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 leading-none mb-1">Price</span>
                                    <span className="text-2xl font-black text-gray-900">
                                        <span className="text-primary text-sm mr-0.5">$</span>
                                        {item.price.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    {quantity > 0 ? (
                                        <div className="flex items-center bg-gray-50 p-1 rounded-2xl border border-gray-100 shadow-inner">
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => updateQuantity(item.id, quantity - 1)}
                                                className="w-10 h-10 rounded-xl bg-white text-gray-400 hover:text-primary hover:shadow-md transition-all flex items-center justify-center"
                                            >
                                                <Minus size={18} />
                                            </motion.button>
                                            <span className="font-black w-10 text-center text-lg">{quantity}</span>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => addItem(item)}
                                                className="w-10 h-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center"
                                            >
                                                <Plus size={18} />
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => addItem(item)}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-extrabold text-sm hover:bg-primary transition-all duration-300 shadow-xl shadow-gray-900/10 hover:shadow-primary/30"
                                        >
                                            <Plus size={18} />
                                            Add to Hub
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
