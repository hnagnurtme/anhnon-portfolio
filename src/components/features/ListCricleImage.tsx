import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageCard from "../ui/ImageCard";

interface CircleImage {
    id: number;
    image: string;
}

interface ListCircleImageProps {
    images: CircleImage[];
    interval?: number; // thời gian auto xoay (ms)
}

const ListCircleImage: React.FC<ListCircleImageProps> = ( {
    images,
    interval = 2000,
} ) => {
    const [ activeIndex, setActiveIndex ] = useState( 0 );

    // Auto rotate
    useEffect( () => {
        const timer = setInterval( () => {
            setActiveIndex( ( prev ) => ( prev + 1 ) % images.length );
        }, interval );
        return () => clearInterval( timer );
    }, [ images.length, interval ] );

    const prevIndex = ( activeIndex - 1 + images.length ) % images.length;
    const nextIndex = ( activeIndex + 1 ) % images.length;

    return (
        <div className="relative w-full h-[420px] flex justify-center items-center overflow-hidden">
            { images.map( ( item, index ) => {
                const isActive = index === activeIndex;
                const isPrev = index === prevIndex;
                const isNext = index === nextIndex;

                let x = 0;
                let scale = 1;
                let opacity = 1;
                let rotateY = 0;
                let zIndex = 0;

                if ( isActive ) {
                    x = 0;
                    scale = 1.5;
                    opacity = 1;
                    rotateY = 0;
                    zIndex = 4;
                } else if ( isPrev ) {
                    x = -220;
                    scale = 0.85;
                    opacity = 0.6;
                    rotateY = 20;
                    zIndex = 3;
                } else if ( isNext ) {
                    x = 220;
                    scale = 0.85;
                    opacity = 0.6;
                    rotateY = -20;
                    zIndex = 3;
                } else {
                    x = 0;
                    scale = 0.6;
                    opacity = 0;
                    zIndex = 1;
                }

                return (
                    <motion.div
                        key={ item.id }
                        className="absolute w-[360px] h-[240px] md:w-[420px] md:h-[280px] flex items-center justify-center bg-white rounded-xl overflow-hidden"
                        style={ { zIndex } }
                        animate={ { x, scale, opacity, rotateY } }
                        transition={ {
                            type: "spring",
                            stiffness: 80,
                            damping: 18,
                        } }
                        onClick={ () => setActiveIndex( index ) }
                    >
                        <ImageCard
                            image={ item.image }
                            className="max-w-full max-h-full object-contain"
                        />
                    </motion.div>
                );
            } ) }

            {/* Nút điều hướng */ }
            { images.length > 1 && (
                <>
                    <button
                        onClick={ () =>
                            setActiveIndex(
                                ( prev ) => ( prev - 1 + images.length ) % images.length
                            )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-800/30 hover:bg-purple-700/50 p-2 rounded-full text-white"
                    >
                        ‹
                    </button>

                    <button
                        onClick={ () =>
                            setActiveIndex( ( prev ) => ( prev + 1 ) % images.length )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-800/30 hover:bg-purple-700/50 p-2 rounded-full text-white"
                    >
                        ›
                    </button>
                </>
            ) }
        </div>
    );
};

export default ListCircleImage;
