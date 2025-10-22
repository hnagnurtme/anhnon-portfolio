import React, { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import CertificationsSection from "./components/sections/CertificationsSection";
import ContactSection from "./components/sections/ContactSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <CertificationsSection />
            <ContactSection />
        </MainLayout>
    );
};

export default App;
