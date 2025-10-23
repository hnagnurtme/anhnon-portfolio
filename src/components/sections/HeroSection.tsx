import React, { useContext, useEffect, useRef } from "react";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import personalData from "../../data/personal.json";
import { AnimationContext } from "../../store/AnimationContext";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import FloatingParticles from "../ui/FloatingParticles";
import DownloadCVButton from "../ui/DownloadCVButton";

// Register TextPlugin for GSAP
gsap.registerPlugin( TextPlugin );

// Define additional personal data properties
type EnhancedPersonalData = typeof personalData & {
    greeting?: string;
    shortBio?: string;
};

const enhancedData = personalData as EnhancedPersonalData;

const HeroSection: React.FC = () => {
    const { activateSection } = useContext( AnimationContext );
    const sectionRef = useRef<HTMLElement>( null );

    // Text animation with GSAP - tối ưu cao
    useEffect( () => {
        const textElement = document.querySelector( '.typing-text' );
        const skills = [ "Web Developer", "UI/UX Designer", "Problem Solver", personalData.title ];
        let currentIndex = 0;
        let timeoutId: number;

        if ( textElement ) {
            // Tạo timeline để quản lý animation tốt hơn
            const typingTimeline = gsap.timeline( {
                paused: true,
                onComplete: () => {
                    // Giải phóng bộ nhớ khi hoàn thành
                    typingTimeline.clear();
                }
            } );

            const typeText = () => {
                // Reset timeline
                typingTimeline.clear();

                // Thêm animation vào timeline
                typingTimeline
                    .set( textElement, { text: "" } )
                    .to( textElement, {
                        duration: 0.5, // Giảm thời gian để animation nhanh hơn
                        text: {
                            value: skills[ currentIndex ],
                            delimiter: ""
                        },
                        ease: "none",
                        overwrite: "auto" // Tránh xếp hàng đợi animation
                    } )
                    .call( () => {
                        timeoutId = window.setTimeout( () => {
                            typingTimeline.clear().to( textElement, {
                                duration: 0.25, // Giảm thời gian xóa text
                                text: "",
                                ease: "none",
                                onComplete: () => {
                                    currentIndex = ( currentIndex + 1 ) % skills.length;
                                    // Sử dụng requestAnimationFrame để đồng bộ với vòng lặp render
                                    requestAnimationFrame( typeText );
                                }
                            } );
                            typingTimeline.play();
                        }, 1200 ); // Giảm thời gian đợi
                    } );

                // Play timeline
                typingTimeline.play();
            };

            // Bắt đầu animation với một chút độ trễ
            requestAnimationFrame( typeText );
        }

        // Cleanup function để tránh memory leak
        return () => {
            window.clearTimeout( timeoutId );
            gsap.killTweensOf( '.typing-text' );
        };
    }, [] );

    // Animation variants for staggered text - tối ưu hiệu suất
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Giảm thời gian giữa các animation
                delayChildren: 0.2, // Giảm thời gian delay
            }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 10 }, // Giảm khoảng cách di chuyển
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5, // Giảm thời gian animation
                ease: "easeOut",
                type: "tween" // Sử dụng tween thay vì spring để tiết kiệm tài nguyên
            }
        }
    };

    // Particle animation - tối ưu với vô hiệu hóa khi scroll
    useEffect( () => {
        // Khởi tạo các particles
        const particles = document.querySelectorAll( '.particle' );
        const particleTimelines: gsap.core.Timeline[] = [];

        // Tạo animation cho các particles
        particles.forEach( ( particle ) => {
            // Giảm phạm vi di chuyển
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            const duration = 3 + Math.random() * 1;

            // Tạo timeline riêng cho mỗi particle
            const tl = gsap.timeline( {
                repeat: -1,
                repeatDelay: Math.random() * 0.5 + 0.5
            } );

            // Set initial properties
            tl.set( particle, {
                x: 0,
                y: 0,
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 0.4 + 0.1,
                force3D: true, // Kích hoạt GPU acceleration
                xPercent: -50,
                yPercent: -50,
            } );

            // Animate
            tl.to( particle, {
                x: x,
                y: y,
                opacity: 0,
                scale: 0,
                duration: duration,
                ease: "power1.out",
            } );

            particleTimelines.push( tl );
        } );

        // Dọn dẹp timelines khi unmount
        return () => {
            particleTimelines.forEach( tl => tl.kill() );
        };
    }, [] );

    return (
        <section
            ref={ sectionRef }
            id="hero"
            className="w-full h-screen bg-linear-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white relative overflow-hidden"
        >
            {/* Star field background */ }
            <FloatingParticles />
            {/* Particle effects - số lượng giảm để tối ưu hiệu suất */ }
            <div className="absolute inset-0 pointer-events-none">
                { [ ...Array( 10 ) ].map( ( _, index ) => (
                    <div
                        key={ index }
                        className="particle absolute w-2 h-2 rounded-full bg-purple-500"
                        style={ {
                            top: "50%",
                            left: "50%",
                            transform: "translate3d(-50%, -50%, 0)", // Sử dụng translate3d để kích hoạt GPU
                        } }
                    />
                ) ) }
            </div>

            {/* Hero content */ }
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
                <motion.div
                    variants={ container }
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center motion-element"
                >
                    <motion.div variants={ item } className="relative inline-block mb-6">
                        <motion.span
                            className="absolute -inset-1 rounded-lg bg-linear-to-r from-purple-600 to-pink-500 blur opacity-30"
                            animate={ {
                                opacity: [ 0.3, 0.6, 0.3 ],
                            } }
                            transition={ {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            } }
                        />
                        <motion.h2
                            className="relative text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400"
                            whileHover={ { scale: 1.05 } }
                        >
                            { enhancedData.greeting || "Welcome to my universe" }
                        </motion.h2>
                    </motion.div>

                    <motion.h1
                        variants={ item }
                        className="text-5xl md:text-7xl font-bold mb-4 text-gradient glow"
                        whileHover={ { scale: 1.02 } }
                    >
                        Hi, I'm { personalData.name.split( " " ).slice( -2 ).join( " " ) } <span className="wave">👋</span>
                    </motion.h1>
                    <motion.div variants={ item } className="flex items-center text-lg md:text-xl mb-8">
                        <span className="mr-2">I'm a</span>
                        <span className="typing-text text-purple-400"></span>
                        <span className="cursor-blink">|</span>
                    </motion.div>

                    <motion.p
                        variants={ item }
                        className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl"
                    >
                        { enhancedData.shortBio || "Passionate about creating digital experiences that are both beautiful and functional." }
                    </motion.p>

                    <motion.div
                        variants={ item }
                        className="flex gap-4 justify-center"
                    >
                        <DownloadCVButton />
                        <Button
                            onClick={ () => activateSection( 'contact' ) }
                            className="bg-transparent border border-purple-500 text-white hover:bg-purple-500/20 interactive"
                        >
                            <motion.span
                                whileHover={ {
                                    scale: 1.05,
                                    transition: { duration: 0.3 }
                                } }
                            >
                                Contact Me
                            </motion.span>
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={ item }
                        className="mt-16"
                    >
                        <motion.a
                            href="#about"
                            onClick={ ( e ) => {
                                e.preventDefault();
                                activateSection( 'about' );
                            } }
                            className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300 interactive"
                            whileHover={ { y: -2 } }
                        >
                            <span className="text-sm md:text-base font-light tracking-[0.25em] font-josefin uppercase bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]">
                                Visit My Universe
                            </span>

                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={ {
                                    y: [ 0, 5, 0 ],
                                } }
                                transition={ {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                } }
                            >
                                <polyline points="7 13 12 18 17 13"></polyline>
                                <polyline points="7 6 12 11 17 6"></polyline>
                            </motion.svg>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
