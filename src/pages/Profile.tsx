import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, LogOut, ChevronRight, Save } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export default function Profile() {
    const { user } = useTelegram();
    const [name, setName] = useState(user?.first_name || 'Guest User');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showSupport, setShowSupport] = useState(false);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
            {/* Header */}
            <h1 className="text-3xl font-black text-gray-900 mb-8">My Profile</h1>

            {/* Avatar Section */}
            <div className="flex items-center gap-4 mb-10">
                <div className="w-20 h-20 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-primary">
                    {user?.photo_url ? (
                        <img src={user.photo_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User size={32} />
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                    <span className="text-sm font-medium text-gray-400">@{user?.username || 'user'}</span>
                </div>
            </div>

            {/* Settings Form */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-gray-900">Personal Details</h3>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-primary text-sm font-bold uppercase tracking-wider"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute top-3.5 left-4 text-gray-400" size={18} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditing}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-bold text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute top-3.5 left-4 text-gray-400" size={18} />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={!isEditing}
                                placeholder="+1 234 567 890"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-bold text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Saved Address</label>
                        <div className="relative">
                            <MapPin className="absolute top-3.5 left-4 text-gray-400" size={18} />
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={!isEditing}
                                rows={2}
                                placeholder="Enter your delivery address"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none font-bold text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsEditing(false)}
                            className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            <Save size={18} />
                            Save Changes
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Menu Options */}
            <div className="space-y-3">
                {['Order History', 'Support', 'Terms & Conditions'].map((item) => (
                    <button
                        key={item}
                        onClick={() => item === 'Support' && setShowSupport(true)}
                        className="w-full bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 hover:border-primary/20 transition-colors group"
                    >
                        <span className="font-bold text-gray-700 group-hover:text-primary transition-colors">{item}</span>
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                    </button>
                ))}

                <button className="w-full bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-colors group mt-6">
                    <span className="font-bold text-red-500">Log Out</span>
                    <LogOut size={18} className="text-red-300 group-hover:text-red-500 transition-colors" />
                </button>
            </div>

            {/* Support Modal */}
            {showSupport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <User size={32} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">Need Help?</h3>
                            <p className="text-gray-500 font-medium text-sm mt-1">Our saucy support team is here for you 24/7.</p>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20">
                                Chat with Support
                            </button>
                            <button
                                onClick={() => setShowSupport(false)}
                                className="w-full bg-gray-50 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-100"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
