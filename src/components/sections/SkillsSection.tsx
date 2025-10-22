import React, { useEffect, useRef } from "react";
import skillsData from "../../data/skills.json";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin( ScrollTrigger );

const SkillsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>( null );
    const skillCardsRef = useRef<HTMLDivElement>( null );

    useEffect( () => {
        if ( sectionRef.current && skillCardsRef.current ) {
            const cards = Array.from( skillCardsRef.current.children );

            // Đăng ký một chuyển động dựa trên requestAnimationFrame
            // thay vì dựa vào ScrollTrigger nặng nề
            const observer = new IntersectionObserver( ( entries ) => {
                if ( entries[ 0 ].isIntersecting ) {
                    // Sử dụng requestAnimationFrame để đảm bảo animation mượt mà
                    requestAnimationFrame( () => {
                        cards.forEach( ( card, index ) => {
                            // Khởi tạo style ban đầu
                            gsap.set( card, { y: 30, opacity: 0 } );

                            // Áp dụng animation với thời gian ngắn hơn
                            gsap.to( card, {
                                y: 0,
                                opacity: 1,
                                duration: 0.3,
                                delay: index * 0.05, // Giảm thời gian delay giữa các card
                                ease: "power2.out",
                                overwrite: true,
                                clearProps: "transform", // Xóa transform sau khi hoàn thành để cải thiện hiệu suất
                            } );
                        } );
                    } );

                    // Hủy đăng ký observer sau khi đã kích hoạt
                    observer.disconnect();
                }
            }, {
                threshold: 0.1, // Kích hoạt sớm hơn
                rootMargin: "-10% 0px" // Margin nhỏ hơn
            } );

            observer.observe( sectionRef.current );

            // Cleanup function
            return () => {
                observer.disconnect();
                gsap.killTweensOf( cards );
            };
        }
    }, [] );

    return (
        <section id="skills" ref={ sectionRef } className="w-full py-20 bg-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={ { opacity: 0, y: -20 } }
                    whileInView={ { opacity: 1, y: 0 } }
                    transition={ { duration: 0.5 } }
                    viewport={ { once: true } }
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-center mb-4 text-gradient">Skills</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My technical expertise and professional capabilities
                    </p>
                </motion.div>

                <div ref={ skillCardsRef } className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { Object.entries( skillsData ).map( ( [ category, skills ] ) => (
                        <div
                            key={ category }
                            className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col border border-gray-700 hover:border-purple-500 transition-all duration-300 card-hover"
                        >
                            <h3 className="font-semibold text-xl mb-4 text-purple-400">{ category }</h3>
                            <ul className="space-y-2 flex-grow">
                                { ( skills as string[] ).map( ( skill ) => (
                                    <li key={ skill } className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        <span className="text-gray-300">{ skill }</span>
                                    </li>
                                ) ) }
                            </ul>
                        </div>
                    ) ) }
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
