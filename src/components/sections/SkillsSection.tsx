import React, { useEffect, useRef } from "react";
import skillsData from "../../data/skills.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import SkillCard from "../features/skills/SkillCard";
import FloatingParticles from "../ui/FloatingParticles";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const skillCardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sectionRef.current && skillCardsRef.current) {
            const cards = Array.from(skillCardsRef.current.children);

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    requestAnimationFrame(() => {
                        cards.forEach((card, index) => {
                            gsap.set(card, { y: 30, opacity: 0 });
                            gsap.to(card, {
                                y: 0,
                                opacity: 1,
                                duration: 0.3,
                                delay: index * 0.05,
                                ease: "power2.out",
                                overwrite: true,
                                clearProps: "transform",
                            });
                        });
                    });

                    observer.disconnect();
                }
            }, { threshold: 0.1, rootMargin: "-10% 0px" });

            observer.observe(sectionRef.current);

            return () => {
                observer.disconnect();
                gsap.killTweensOf(cards);
            };
        }
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="w-full py-10 bg-gray-900 text-white">
            <FloatingParticles />
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionTitle title="Skills" />
                <div ref={skillCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skillsData).map(([category, skills]) => (
                        <SkillCard key={category} category={category} skills={skills as string[]} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
