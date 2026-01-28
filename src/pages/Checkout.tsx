import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, User, Check, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { submitOrder } from '../services/supabase';
import { useTelegram } from '../hooks/useTelegram';
import type { Order } from '../types';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, getTotalPrice, clearCart } = useCartStore();
    const { user } = useTelegram();
    const totalPrice = getTotalPrice();
    const cartItems = Object.values(cart);

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: user?.first_name || '',
        phone: '',
        address: '',
        notes: '',
    });

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            navigate('/menu');
        }
    }, [cartItems, isSuccess, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const order: Order = {
                customer_name: formData.name,
                customer_phone: formData.phone,
                delivery_address: formData.address,
                total_price: totalPrice,
                items: cartItems, // Pass full objects as they match CartItem which extends MenuItem
                payment_status: 'pending',
                notes: formData.notes,
                customer_telegram_chat_id: user?.id,
            };

            await submitOrder(order);
            clearCart();
            setIsSuccess(true);
        } catch (err) {
            console.error('Checkout error:', err);
            setError('Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500"
                >
                    <Check size={48} strokeWidth={3} />
                </motion.div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h2>
                <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">
                    Your saucy meal is being prepared. We'll verify your details shortly.
                </p>
                <button
                    onClick={() => navigate('/orders')}
                    className="w-full max-w-sm bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30"
                >
                    Track Order
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 px-4 py-4 flex items-center shadow-sm">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm border border-gray-100"
                >
                    <ArrowLeft size={20} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-black text-gray-900 ml-4">Checkout</h1>
            </header>

            {/* Demo Notice Banner */}
            <div className="fixed top-[72px] left-0 right-0 z-30 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 shadow-lg shadow-amber-500/10 max-w-xl mx-auto"
                >
                    <AlertCircle className="text-amber-500 shrink-0" size={24} />
                    <div>
                        <h3 className="text-sm font-black text-amber-800 uppercase tracking-wide mb-1">Demo Mode Active</h3>
                        <p className="text-xs font-medium text-amber-700 leading-relaxed">
                            Orders placed securely but <strong>will not be fulfilled</strong>.
                            Telegram automation/bots are currently paused for maintenance.
                        </p>
                    </div>
                </motion.div>
            </div>

            <main className="pt-40 px-4 max-w-xl mx-auto space-y-6">
                {/* Order Summary Card */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                    <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Summary</h2>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-3xl font-black text-gray-900">${totalPrice.toFixed(2)}</span>
                        <span className="text-sm font-bold text-gray-500">{cartItems.length} items</span>
                    </div>
                    <div className="h-px bg-gray-100 my-4" />
                    <div className="flex -space-x-3 overflow-hidden py-1 pl-1">
                        {cartItems.slice(0, 5).map((item) => (
                            <div key={item.id} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative">
                                {item.imageURL.startsWith('http') ? (
                                    <img src={item.imageURL} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="flex items-center justify-center h-full text-base">{item.emoji}</span>
                                )}
                            </div>
                        ))}
                        {cartItems.length > 5 && (
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
                                +{cartItems.length - 5}
                            </div>
                        )}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Delivery Details</h2>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute top-3.5 left-4 text-gray-400" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute top-3.5 left-4 text-gray-400" size={18} />
                                <input
                                    required
                                    type="tel"
                                    placeholder="+1 234 567 8900"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 ml-1">Address</label>
                            <div className="relative">
                                <MapPin className="absolute top-3.5 left-4 text-gray-400" size={18} />
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Delivery Address..."
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300 resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 ml-1">Notes (Optional)</label>
                            <textarea
                                rows={2}
                                placeholder="Allergies, door codes, etc."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border-none font-bold text-gray-900 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300 resize-none"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-2xl flex items-center gap-2 font-bold text-sm">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    >
                        {isLoading ? (
                            <Loader2 size={24} className="animate-spin" />
                        ) : (
                            <>
                                Place Order <Sparkles size={18} className="text-yellow-300 fill-yellow-300" />
                            </>
                        )}
                    </motion.button>
                </form>
            </main>
        </div>
    );
}
