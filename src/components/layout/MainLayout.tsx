import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';

// Components
import CartButton from '../CartButton';
import CartSheet from '../CartSheet';

export default function MainLayout() {
    const location = useLocation();
    const [showCart, setShowCart] = useState(false);
    const totalItems = useCartStore((state) => state.getTotalItems());

    const isCheckoutFlow = location.pathname === '/checkout' || location.pathname === '/onboarding';

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-primary/20 pb-0">
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="pb-28 pt-20" // Padding for bottom nav AND top header
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>

            {/* Persistent Premium Header */}
            {!isCheckoutFlow && (
                <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" /><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L21 9" /><path d="m2 2 20 20" /></svg>
                        </div>
                        <div>
                            <h1 className="font-black text-lg leading-tight tracking-tight text-gray-900">Saucy KPS</h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Premium Taste</p>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <button
                        onClick={() => setShowCart(true)}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors relative"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            )}

            {/* Floating Elements (only if not in checkout flow) */}
            {!isCheckoutFlow && (
                <>
                    <CartButton
                        itemCount={totalItems}
                        onClick={() => setShowCart(true)}
                        visible={!showCart}
                    />
                    <BottomNav />
                </>
            )}

            {/* Overlays */}
            <AnimatePresence>
                {showCart && (
                    <CartSheet
                        onClose={() => setShowCart(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
