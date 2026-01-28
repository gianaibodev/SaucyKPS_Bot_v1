import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CartSheetProps {
    onClose: () => void;
}

import { useNavigate } from 'react-router-dom';

export default function CartSheet({ onClose }: CartSheetProps) {
    const navigate = useNavigate();
    const cart = useCartStore((state) => state.cart);
    const totalPrice = useCartStore((state) => state.getTotalPrice());
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);

    const cartItems = Object.values(cart);

    return (
        <>
            {/* Premium Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 px-4"
                onClick={onClose}
            />

            {/* Premium Side Panel / Sheet */}
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] z-50 max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Handle for drawer feel */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />

                <div className="px-6 pb-8 pt-2 flex flex-col h-full overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2.5 rounded-2xl text-primary">
                                <ShoppingBag size={24} strokeWidth={3} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 leading-none">Your Hub</h2>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    {cartItems.length} delicacies selected
                                </span>
                            </div>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all border border-gray-100"
                        >
                            <X size={24} />
                        </motion.button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 mb-8 custom-scrollbar">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100 italic">
                                    🍱
                                </div>
                                <p className="text-xl font-black text-gray-800 mb-1">Hub is empty</p>
                                <p className="text-gray-400 font-medium">Add some delicacies to start</p>
                            </div>
                        ) : (
                            <AnimatePresence initial={false}>
                                {cartItems.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group flex items-center gap-5 p-5 bg-white rounded-[2rem] border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                                    >
                                        <div className="w-20 h-20 bg-[#FDF2F0] rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:rotate-6 transition-transform">
                                            {item.imageURL.startsWith('http') ? (
                                                <img src={item.imageURL} alt={item.name} className="w-full h-full object-cover rounded-2xl" />
                                            ) : (
                                                <span className="filter drop-shadow-md">{item.emoji}</span>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-extrabold text-gray-900 truncate leading-tight mb-1">{item.name}</h3>
                                            <p className="text-xs font-bold text-primary mb-3">
                                                ${item.price.toFixed(2)} <span className="text-gray-300">/ unit</span>
                                            </p>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100">
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-lg bg-white text-gray-400 hover:text-primary transition-colors flex items-center justify-center shadow-sm"
                                                    >
                                                        <Minus size={14} />
                                                    </motion.button>
                                                    <span className="font-black w-8 text-center text-sm">{item.quantity}</span>
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-lg bg-primary text-white transition-colors flex items-center justify-center shadow-md shadow-primary/20"
                                                    >
                                                        <Plus size={14} />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.8 }}
                                            whileHover={{ scale: 1.1, color: '#ef4444' }}
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-300 hover:bg-red-50 p-3 rounded-2xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Footer Card */}
                    {cartItems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-gray-900/40 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -ml-12 -mb-12" />

                            <div className="relative flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">Total Amount</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-secondary text-lg font-black">$</span>
                                        <span className="text-4xl font-black tracking-tighter">{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-right">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase block leading-none mb-1">Tax Incl.</span>
                                    <span className="text-xs font-black">Verified Secure</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    onClose();
                                    navigate('/checkout');
                                }}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/30"
                            >
                                Proceed to Checkout
                                <ArrowRight size={20} />
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </>
    );
}
