import React from "react";

interface SectionTitleProps {
    planet?: string;
    title: string;
    className?: string;
    center?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ( {
    planet,
    title,
    className = "",
    center = true,
} ) => {
    // 🪐 Map tên hành tinh -> ảnh PNG (đường dẫn chuẩn trong Vite)
    const planetImages: Record<string, string> = {
        Mercury: "image/planet/mercury.png",
        Venus: "image/planet/venus.png",
        Mars: "image/planet/mars.png",
        Jupiter: "image/planet/jupiter.png",
        Saturn: "image/planet/saturn.png",
        Neptune: "image/planet/neptune.png",
    };

    return (
        <div
            className={ `relative flex flex-col items-center ${ center ? "text-center" : ""
                } mb-6 sm:mb-8 md:mb-10 ${ className }` }
        >
            {/* 🌌 Quầng sáng mờ phía sau */ }
            <div className="absolute -z-10 w-40 sm:w-48 md:w-56 h-40 sm:h-48 md:h-56 rounded-full bg-gradient-to-tr from-purple-500/20 to-indigo-400/10 blur-3xl animate-pulse-slow" />

            {/* 🪐 Hành tinh (xoay & trôi nhẹ) */ }
            { planet && planetImages[ planet ] && (
                <img
                    src={ planetImages[ planet ] }
                    alt={ `${ planet } icon` }
                    className="mb-3 w-14 sm:w-16 md:w-20 drop-shadow-[0_0_12px_rgba(139,92,246,0.4)] animate-float-glow select-none"
                />
            ) }

            {/* ✨ Tiêu đề */ }
            <h2
                className="
          text-2xl sm:text-3xl md:text-4xl font-space font-semibold tracking-[0.12em] uppercase
          bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400
          bg-clip-text text-transparent select-none
        "
            >
                { planet ? (
                    <>
                        <span className="text-white/90">{ planet }</span>
                        <span className="text-transparent"> – { title }</span>
                    </>
                ) : (
                    title
                ) }
            </h2>

            {/* 🌠 Line bên dưới */ }
            <div className="mt-3 sm:mt-4 h-[1px] w-20 sm:w-24 bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-300 opacity-70" />
        </div>
    );
};

export default SectionTitle;
