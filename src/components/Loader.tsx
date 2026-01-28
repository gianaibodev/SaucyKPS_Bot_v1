import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-32 flex flex-col items-center justify-center">
            <div className="relative">
                {/* Animated Rings */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-primary/10"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-primary shadow-lg shadow-primary/20"
                />

                {/* Inner Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-4xl"
                    >
                        🍱
                    </motion.span>
                </div>
            </div>

            <div className="mt-10 text-center">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Fetching Excellence</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Preparing your premium menu</p>
            </div>

            {/* Skeleton Preview Simulation */}
            <div className="mt-16 w-full max-w-md space-y-4 opacity-50">
                <div className="h-4 bg-gray-100 rounded-full w-3/4 mx-auto animate-pulse" />
                <div className="h-4 bg-gray-100 rounded-full w-1/2 mx-auto animate-pulse" />
            </div>
        </div>
    );
}
