import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Onboarding() {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-gray-900 relative overflow-hidden flex flex-col items-center justify-end pb-12">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                    className="w-full h-full object-cover opacity-60"
                    alt="Onboarding"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            </div>

            <div className="relative z-10 w-full px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Saucy KPS</span>
                    <h1 className="text-5xl font-black text-white leading-tight mb-6">
                        Taste the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Extraordinary</span>
                    </h1>
                    <p className="text-gray-300 font-medium mb-10 leading-relaxed">
                        Experience premium dining delivered to your doorstep. Curated menus, exquisite flavors.
                    </p>

                    <button
                        onClick={() => navigate('/home')}
                        className="w-full bg-white text-gray-900 font-black text-lg py-5 rounded-[2rem] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Get Started
                    </button>

                    <button
                        onClick={() => navigate('/home')}
                        className="mt-6 text-gray-500 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Skip Intro
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
