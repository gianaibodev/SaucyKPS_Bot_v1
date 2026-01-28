import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, ClipboardList, User } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function BottomNav() {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
        { path: '/home', icon: Home, label: 'Home' },
        { path: '/menu', icon: UtensilsCrossed, label: 'Menu' },
        { path: '/orders', icon: ClipboardList, label: 'Orders' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    // Don't show nav on onboarding or checkout
    if (['/', '/onboarding', '/checkout'].includes(currentPath)) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50">
            <div className="bg-gray-900/70 backdrop-blur-xl rounded-[2rem] p-2 shadow-2xl shadow-gray-900/30 border border-white/10 flex justify-between items-center">
                {navItems.map((item) => {
                    const isActive = currentPath === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex-1 flex flex-col items-center justify-center py-3 relative"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white/10 rounded-[1.5rem]"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            <item.icon
                                size={24}
                                strokeWidth={isActive ? 3 : 2}
                                className={clsx(
                                    'transition-colors duration-200 relative z-10',
                                    isActive ? 'text-primary' : 'text-gray-400'
                                )}
                            />
                            <span className={clsx(
                                "text-[10px] font-bold mt-1 tracking-wide transition-colors relative z-10",
                                isActive ? "text-white" : "text-gray-500"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
