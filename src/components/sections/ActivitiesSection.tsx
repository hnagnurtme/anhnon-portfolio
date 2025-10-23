import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CERT6 from "../../assets/gmail/CERT6.png";
import CERT7 from "../../assets/gmail/CERT7.png";

const ParticipationCard: React.FC = () => {
    const [ topFirst, setTopFirst ] = useState( true );

    useEffect( () => {
        const interval = setInterval( () => setTopFirst( prev => !prev ), 2000 );
        return () => clearInterval( interval );
    }, [] );

    return (
        <div className="relative mx-auto max-w-md">
            {/* 2 ảnh xếp chéo */ }
            <motion.img
                src={ CERT6 }
                alt="CERT6"
                className={ `absolute -top-32 -right-8 w-64 rounded-xl shadow-2xl object-cover transition-all duration-500 ${ topFirst ? "-rotate-6 z-10" : "rotate-6 z-0"
                    }` }
            />
            <motion.img
                src={ CERT7 }
                alt="CERT7"
                className={ `absolute -top-28 -right-4 w-64 rounded-xl shadow-2xl object-cover transition-all duration-500 ${ topFirst ? "rotate-6 z-0" : "-rotate-6 z-10"
                    }` }
            />

            {/* Thẻ giới thiệu */ }
            <motion.div
                className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl flex flex-col items-center max-w-md mx-auto"
                initial={ { opacity: 0, y: 20 } }
                whileInView={ { opacity: 1, y: 0 } }
                viewport={ { once: true } }
                transition={ { duration: 0.6 } }
            >
                <h3 className="text-2xl font-bold text-purple-400 mb-4">
                    Hackathon & Competitions
                </h3>

                {/* Top 10% */ }
                <div className="relative inline-block mb-2">
  <p className="text-gray-300 text-sm sm:text-base">
    Top 10% of <span className="font-semibold text-white relative z-10">NAVER AI Vietnam Hackathon 2025</span>
  </p>
  <span className="absolute -top-3 right-[-30px] text-xs text-gray-300 rotate-12 py-0.5 px-2 bg-purple-900/30 border border-purple-700/30 rounded-lg z-20">
    continuing
  </span>
</div>
                <p className="text-gray-300 text-center text-sm sm:text-base leading-snug">
                    Participated in <span className="font-semibold text-white">APAC Solution Challenge 2025</span>
                </p>
            </motion.div>



        </div>
    );
};

export default ParticipationCard;
