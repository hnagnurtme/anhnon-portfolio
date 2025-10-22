import React, { useEffect, useState, useCallback } from 'react';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { motion } from 'framer-motion';
import { AnimationContext } from '../store/AnimationContext';

type Props = { children: React.ReactNode };

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Observer);

const MainLayout: React.FC<Props> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  // Handle cursor movement for custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Handle cursor hover state
    const handleMouseEnter = () => {
      setCursorVariant('hover');
    };
    
    const handleMouseLeave = () => {
      setCursorVariant('default');
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  // Initialize smooth scrolling
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    // Setup section activation on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.15,
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id') || '';
          setActiveSection(id);
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);
    
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      lenisInstance.destroy();
      sectionObserver.disconnect();
    };
  }, []);

  // Connect Lenis scroll to GSAP ScrollTrigger
  useEffect(() => {
    if (!lenis) return;
    
    function onScroll(e: { scroll: number }) {
      ScrollTrigger.update();
      
      // Update background gradient position on scroll
      const scrollY = e.scroll;
      const gradientElement = document.querySelector('.animated-bg') as HTMLElement;
      if (gradientElement) {
        gradientElement.style.backgroundPosition = `0 ${scrollY * 0.1}px`;
      }
    }

    lenis.on('scroll', onScroll);
    
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);

  // Function to programmatically activate a section (for navigation)
  const activateSection = useCallback((id: string) => {
    if (lenis) {
      const element = document.getElementById(id);
      if (element) {
        lenis.scrollTo(element, {
          offset: -80, // Adjust for header height
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  }, [lenis]);

  // Cursor animation variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: 'rgba(139, 92, 246, 0.3)',
      mixBlendMode: 'difference',
    },
  };

  return (
    <AnimationContext.Provider value={{ lenis, activateSection, activeSection }}>
      <div className="flex flex-col min-h-screen bg-black text-white relative">
        {/* Custom cursor (hidden on mobile) */}
        <motion.div 
          className="cursor hidden md:block fixed top-0 left-0 rounded-full bg-purple-500/20 pointer-events-none z-50"
          variants={variants}
          animate={cursorVariant}
          transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        />
        
        {/* Animated background */}
        <div className="animated-bg"></div>
        
        <HeaderLayout />
        
        <motion.main 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.main>
        
        <FooterLayout />
      </div>
    </AnimationContext.Provider>
  );
};

export default MainLayout;
