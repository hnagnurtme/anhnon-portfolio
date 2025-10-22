import React, { useEffect, useState, useRef, useCallback } from 'react';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { AnimationContext } from '../store/AnimationContext';
import CustomCursor from '../components/ui/CustomCursor';

type Props = { children: React.ReactNode };

gsap.registerPlugin( ScrollTrigger );

const MainLayout: React.FC<Props> = ( { children } ) => {
    const [ lenis, setLenis ] = useState<Lenis | null>( null );
    const [ activeSection, setActiveSection ] = useState( 'hero' );
    const gradientRef = useRef<HTMLDivElement>( null );

    useEffect( () => {
        const lenisInstance = new Lenis( {
            duration: 0.1,
            easing: ( t ) => t,
            wheelMultiplier: 1,
            smoothWheel: true,
            syncTouch: true,
        } );

        function raf ( time: number ) {
            lenisInstance.raf( time );
            requestAnimationFrame( raf );
        }
        requestAnimationFrame( raf );
        setLenis( lenisInstance );

        ScrollTrigger.scrollerProxy( document.body, {
            scrollTop ( value ) {
                if ( arguments.length && value !== undefined ) {
                    lenisInstance.scrollTo( value );
                    return value;
                }
                return lenisInstance.scroll;
            },
            getBoundingClientRect () {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
        } );

        const handleResize = () => ScrollTrigger.refresh();
        window.addEventListener( 'resize', handleResize );

        return () => {
            lenisInstance.destroy();
            window.removeEventListener( 'resize', handleResize );
            ScrollTrigger.getAll().forEach( ( trigger ) => trigger.kill() );
        };
    }, [] );

    // Background animation
    useEffect( () => {
        if ( !lenis ) return;
        const updateBackground = ( e: { scroll: number } ) => {
            if ( gradientRef.current ) {
                gradientRef.current.style.transform = `translateY(${ e.scroll * 0.1 }px)`;
            }
            ScrollTrigger.update();
        };
        lenis.on( 'scroll', updateBackground );
        return () => lenis.off( 'scroll', updateBackground );
    }, [ lenis ] );

    // IntersectionObserver sections
    useEffect( () => {
        const sections = document.querySelectorAll( 'section[id]' );
        const observerOptions = { root: null, rootMargin: '-10% 0px -10% 0px', threshold: 0.05 };
        const sectionObserver = new IntersectionObserver( ( entries ) => {
            entries.forEach( ( entry ) => {
                const id = entry.target.getAttribute( 'id' ) || '';
                if ( entry.isIntersecting && activeSection !== id ) setActiveSection( id );
            } );
        }, observerOptions );
        sections.forEach( ( section ) => sectionObserver.observe( section ) );
        return () => sectionObserver.disconnect();
    }, [ activeSection ] );

    const activateSection = useCallback( ( id: string ) => {
        const element = document.getElementById( id );
        if ( element ) {
            element.scrollIntoView( { behavior: 'smooth', block: 'start' } );
            setActiveSection( id );
        }
    }, [] );

    return (
        <AnimationContext.Provider value={ { lenis, activateSection, activeSection } }>
            <div className="flex flex-col min-h-screen bg-black text-white relative">
                <CustomCursor />
                <div ref={ gradientRef } className="animated-bg absolute inset-0 z-0 will-change-transform"></div>
                <HeaderLayout />
                <motion.main
                    className="flex-1 relative z-10"
                    initial={ { opacity: 0, y: 20 } }
                    animate={ { opacity: 1, y: 0 } }
                    transition={ { duration: 0.8 } }
                >
                    { children }
                </motion.main>
                <FooterLayout />
            </div>
        </AnimationContext.Provider>
    );
};

export default MainLayout;
