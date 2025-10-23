import React, { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ContactSection from "./components/sections/ContactSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const App: React.FC = () => {
    const [ isMobile, setIsMobile ] = useState( false );

    // Register ScrollTrigger plugin
    gsap.registerPlugin( ScrollTrigger );

    useEffect( () => {
        // Check if user is on mobile
        const ua = navigator.userAgent.toLowerCase();
        const mobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( ua );
        setIsMobile( mobile );

        if ( !mobile ) {
            // Initialize scroll animations only on non-mobile
            const timer = setTimeout( () => {
                const sections = document.querySelectorAll( "section" );
                sections.forEach( ( section ) => {
                    ScrollTrigger.create( {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleClass: { targets: section, className: "active" },
                        once: true,
                    } );
                } );
            }, 100 );

            return () => clearTimeout( timer );
        }
    }, [] );

    // Nếu là mobile, render màn hình cảnh báo
    if ( isMobile ) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                <div className="text-center p-6 max-w-sm bg-white rounded-2xl">
                    <h1 className="text-2xl font-bold mb-4">⚠️ Trang web chỉ hỗ trợ Laptop</h1>
                    <p className="text-gray-700">
                        Vui lòng mở trang web này trên máy tính để có trải nghiệm đầy đủ.
                    </p>
                </div>
            </div>
        );
    }

    // Nếu không phải mobile, render app bình thường
    return (
        <div className="relative w-screen overflow-x-hidden">
            <MainLayout>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ExperienceSection />
                <ContactSection />
            </MainLayout>
        </div>
    );
};

export default App;
