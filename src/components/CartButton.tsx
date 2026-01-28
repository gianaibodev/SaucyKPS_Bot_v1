import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface CartButtonProps {
    itemCount: number;
    onClick: () => void;
    visible?: boolean;
}

export default function CartButton({ itemCount, onClick, visible = true }: CartButtonProps) {
    return (
        <AnimatePresence>
            {itemCount > 0 && visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 50 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClick}
                    className="fixed bottom-28 right-6 sm:right-8 bg-gray-900 text-white rounded-[2rem] px-6 py-4 flex items-center gap-3 shadow-2xl shadow-gray-900/40 z-[60] overflow-hidden group border border-white/10"
                >
                    {/* Animated Background Pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    />

                    <div className="relative">
                        <ShoppingBag className="w-6 h-6 group-hover:text-primary transition-colors" />
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-gray-900"
                        >
                            {itemCount}
                        </motion.span>
                    </div>

                    <div className="flex flex-col items-start leading-none mr-2">
                        <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 group-hover:text-primary/70 transition-colors">Checkout</span>
                        <span className="text-sm font-black">View Hub</span>
                    </div>

                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
