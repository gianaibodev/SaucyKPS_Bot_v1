import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, MapPin, Phone, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useTelegram } from '../hooks/useTelegram';
import { submitOrder } from '../services/supabase';

interface CheckoutModalProps {
    onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
    const cart = useCartStore((state) => state.cart);
    const totalPrice = useCartStore((state) => state.getTotalPrice());
    const clearCart = useCartStore((state) => state.clearCart);
    const { user } = useTelegram();

    const [customerName, setCustomerName] = useState(user?.first_name || '');
    const [customerPhone, setCustomerPhone] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customerName || !customerPhone || !deliveryAddress) {
            alert('Please fill in all required fields');
            return;
        }

        setSubmitting(true);

        try {
            await submitOrder({
                customer_name: customerName,
                customer_phone: customerPhone,
                delivery_address: deliveryAddress,
                total_price: totalPrice,
                items: Object.values(cart),
                notes,
                payment_status: 'pending',
                customer_telegram_chat_id: user?.id?.toString(),
            });

            setStatus('success');
            clearCart();

            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error submitting order:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60]"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden flex flex-col shadow-2xl pointer-events-auto border border-gray-100"
                >
                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-16 px-8 text-center"
                        >
                            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <CheckCircle2 size={48} strokeWidth={3} />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Order Locked!</h2>
                            <p className="text-gray-500 font-medium">Your delicacies are being prepared. You'll receive a confirmation soon.</p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="relative p-8 pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Secure Checkout</span>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Finish Order</h2>
                            </div>

                            {/* Form */}
                            <div className="px-8 pb-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Summary Small */}
                                    <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100">
                                        <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                                            <span>Grand Total</span>
                                            <span className="text-primary">Verified</span>
                                        </div>
                                        <div className="text-4xl font-black text-gray-900 tracking-tighter">
                                            <span className="text-primary text-xl mr-1 italic">$</span>
                                            {totalPrice.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="grid gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                                                    <User size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={customerName}
                                                    onChange={(e) => setCustomerName(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300"
                                                    placeholder="How should we call you?"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Connect Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                                                    <Phone size={18} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={customerPhone}
                                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300"
                                                    placeholder="+123 456 7890"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Delivery Hub</label>
                                            <div className="relative">
                                                <div className="absolute top-4 left-4 text-gray-400">
                                                    <MapPin size={18} />
                                                </div>
                                                <textarea
                                                    value={deliveryAddress}
                                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                                    rows={3}
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300 resize-none"
                                                    placeholder="Your precise location..."
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Special Notes</label>
                                            <div className="relative">
                                                <textarea
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    rows={2}
                                                    className="w-full px-4 py-4 bg-gray-50 rounded-2xl border-none shadow-inner focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-gray-300 resize-none text-sm"
                                                    placeholder="Extra spicy? No onions?"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={submitting}
                                            className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${status === 'error'
                                                ? 'bg-red-500 text-white shadow-red-200'
                                                : 'bg-primary hover:bg-primary-dark text-white shadow-primary/30'
                                                }`}
                                        >
                                            {submitting ? (
                                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : status === 'error' ? (
                                                <>
                                                    <AlertCircle size={24} />
                                                    Submission Failed
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={22} className="-rotate-12" />
                                                    Complete Order
                                                </>
                                            )}
                                        </motion.button>
                                        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                                            By placing order you agree to our premium terms
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </>
    );
}
