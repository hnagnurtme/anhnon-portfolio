import React, { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import CertificationsSection from "./components/sections/CertificationsSection";
import ContactSection from "./components/sections/ContactSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCarousel from "./components/features/projects/ProjectCarousel";

const App: React.FC = () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin( ScrollTrigger );

    // Initialize scroll animations
    useEffect( () => {
        // Add a small delay to ensure DOM is fully loaded
        const timer = setTimeout( () => {
            // Animate sections on scroll
            const sections = document.querySelectorAll( 'section' );
            sections.forEach( ( section ) => {
                ScrollTrigger.create( {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleClass: { targets: section, className: 'active' },
                    once: true
                } );
            } );
        }, 100 );

        return () => clearTimeout( timer );
    }, [] );

    return (
        <MainLayout>
            <section id="hero" className="py-section-xs md:py-section-sm px-4 md:px-6">
                <HeroSection />
            </section>

            <section id="about" className="py-section-xs md:py-section-sm px-4 md:px-6">
                <AboutSection />
            </section>

            <section id="skills" className="py-section-xs md:py-section-sm px-4 md:px-6">
                <SkillsSection />
            </section>

            <section id="projects" className="py-section-xs md:py-section-sm px-4 md:px-6">
                <ProjectCarousel />
            </section>

            <section id="experience" className="py-section-xs md:py-section-sm px-4 md:px-6">
                <ExperienceSection />
            </section>

            <section id="certifications" className="py-section-xs md:py-section-sm px-4 md:px-6">
                <CertificationsSection />
            </section>

            <section id="contact" className="py-section-xs md:py-section-sm px-4 md:px-6">
                <ContactSection />
            </section>

        </MainLayout>
    );
};

export default App;
