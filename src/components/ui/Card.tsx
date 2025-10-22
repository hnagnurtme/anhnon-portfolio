import React from "react";
import { motion } from "framer-motion";

type CardProps = {
    title: string;
    children: React.ReactNode;
    image?: string; // optional avatar/image
};

const Card: React.FC<CardProps> = ( { title, children, image } ) => (
    <motion.div
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group perspective-1000 bg-gray-800/50 border border-purple-800/30"
        whileHover={ { scale: 1.05 } }
        transition={ { type: "spring", stiffness: 300, damping: 20 } }
    >
        {/* Ảnh nếu có */ }
        { image && (
            <div className="absolute inset-0">
                <img
                    src={ image }
                    alt={ title }
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-30"
                />
            </div>
        ) }

        {/* Glow overlay */ }
        <motion.div
            className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.5)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        />

        {/* Content */ }
        <div className="relative p-6 flex flex-col">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">{ title }</h3>
            <div className="space-y-2 text-gray-300">{ children }</div>
        </div>
    </motion.div>
);

export default Card;
