import { ClipboardList, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Orders() {
    // Mock Data for now - envisioning integration later
    const orders = [
        { id: '#8923', date: 'Today, 10:23 AM', status: 'In Progress', total: 42.50, items: 3 },
        { id: '#8920', date: 'Yesterday', status: 'Delivered', total: 28.00, items: 2 },
        { id: '#8892', date: 'Jan 24, 2024', status: 'Delivered', total: 65.00, items: 4 },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
            <h1 className="text-3xl font-black text-gray-900 mb-8">Your Orders</h1>

            <div className="space-y-4">
                {orders.map((order, i) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-2xl ${order.status === 'In Progress' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                    <ClipboardList size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg text-gray-900">{order.id}</h3>
                                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                                        <Clock size={12} />
                                        {order.date}
                                    </div>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'In Progress' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                }`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                            <div className="flex items-baseline gap-1">
                                <span className="text-xs font-bold text-gray-400">{order.items} Items</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-lg font-black text-gray-900">${order.total.toFixed(2)}</span>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                                    Detail
                                </button>
                                <button className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all">
                                    Reorder
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
