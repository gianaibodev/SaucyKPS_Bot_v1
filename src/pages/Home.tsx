import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Flame, Sparkles } from 'lucide-react';
import { getMenuImage } from '../utils/images';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="px-4 pb-32 space-y-8 pt-4">
            {/* Intro */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h1 className="text-3xl font-black text-gray-900 leading-tight">
                    Good Morning, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Hungry Human?</span>
                </h1>
                <p className="text-gray-500 font-medium mt-1">Let's find you something saucy.</p>
            </motion.div>

            {/* Hero Banner (Dish of the Day) */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative h-72 rounded-[2.5rem] overflow-hidden shadow-premium group cursor-pointer"
                onClick={() => navigate('/menu')}
            >
                <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Dish of the Day"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                    <Flame size={14} className="text-orange-400 fill-orange-400 animate-pulse" />
                    <span className="text-xs font-bold text-white tracking-wide">Trending</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="bg-primary px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-lg shadow-primary/30">
                        Dish of the Day
                    </span>
                    <h2 className="text-3xl font-black leading-none mb-1 text-shadow-lg">Sunrise Bowl</h2>
                    <p className="text-gray-200 font-medium text-sm line-clamp-1 mb-4 opacity-90">Fresh salmon, avocado, edamame, and special sauce.</p>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-black text-primary-light">$14.99</span>
                        <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Categories */}
            <div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
                    {['FILIPINO SUNRICE', 'DISH OF THE DAY', 'VEGETABLE MEAL', 'SNACKS'].map((cat) => (
                        <motion.button
                            key={cat}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/menu')}
                            className="flex-shrink-0 px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm font-black text-gray-700 whitespace-nowrap hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Promotions Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-500/20">
                <div className="relative z-10">
                    <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Pro Deal</span>
                    <h3 className="text-3xl font-black mb-2">Free Delivery</h3>
                    <p className="text-purple-100 font-medium mb-6 max-w-[200px]">On all orders over $25. Treat yourself today!</p>
                    <button onClick={() => navigate('/menu')} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-purple-50 transition-colors">
                        Order Now
                    </button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
                    <Sparkles size={180} />
                </div>
            </div>

            {/* Popular Items */}
            <div>
                <div className="flex justify-between items-end mb-5 px-1">
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        <Sparkles size={18} className="text-yellow-500 fill-yellow-500" />
                        Popular Now
                    </h3>
                    <span onClick={() => navigate('/menu')} className="text-primary text-xs font-bold cursor-pointer hover:underline">View All</span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 no-scrollbar">
                    {['Spicy Ramen', 'Chicken Adobo', 'Pork Sisig'].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="flex-shrink-0 w-44 bg-white rounded-[2rem] p-3 shadow-lg shadow-gray-100 border border-white group cursor-pointer hover:shadow-xl transition-all"
                            onClick={() => navigate('/menu')}
                        >
                            <div className="h-32 rounded-[1.5rem] overflow-hidden mb-3 relative bg-gray-100">
                                <img
                                    src={getMenuImage(item, 'Main')}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt="Food"
                                />
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-0.5 shadow-sm">
                                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-[10px] font-bold">4.8</span>
                                </div>
                            </div>
                            <h4 className="font-black text-gray-900 mb-0.5 text-sm truncate px-1">{item}</h4>
                            <div className="flex justify-between items-center px-1">
                                <p className="text-xs text-gray-500 font-bold">$12.99</p>
                                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <ArrowRight size={12} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
