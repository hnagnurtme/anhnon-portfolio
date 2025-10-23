import React, { useRef, useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import TimelineCard, { type TimelineEvent } from "../features/experiences/TimelineCard";
import timelineDataRaw from "../../data/timelineData.json";
import SectionTitle from "../ui/SectionTitle";
import FloatingParticles from "../ui/FloatingParticles";

const timelineData: TimelineEvent[] = timelineDataRaw as TimelineEvent[];

const TimelineCarousel: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>( null );
    const cardRefs = useRef<( HTMLDivElement | null )[]>( [] );
    const [ activeIndex, setActiveIndex ] = useState( 0 );

    const scrollToIndex = ( index: number ) => {
        const el = scrollRef.current;
        if ( !el ) return;
        const child = el.children[ index ] as HTMLElement;
        if ( !child ) return;

        const offset = child.offsetLeft - el.offsetWidth / 2 + child.offsetWidth / 2;
        el.scrollTo( { left: offset, behavior: "smooth" } );
        setActiveIndex( index );
    };

    // Xác định activeIndex theo scroll
    useEffect( () => {
        const el = scrollRef.current;
        if ( !el ) return;

        const handleScroll = () => {
            const children = Array.from( el.children ) as HTMLElement[];
            const center = el.scrollLeft + el.offsetWidth / 2;
            let closestIndex = 0;
            let closestDistance = Infinity;

            children.forEach( ( child, i ) => {
                const childCenter = child.offsetLeft + child.offsetWidth / 2;
                const distance = Math.abs( center - childCenter );
                if ( distance < closestDistance ) {
                    closestDistance = distance;
                    closestIndex = i;
                }
            } );

            setActiveIndex( closestIndex );
        };

        el.addEventListener( "scroll", handleScroll );
        handleScroll();
        return () => el.removeEventListener( "scroll", handleScroll );
    }, [] );

    return (
        <section
            id="experience"
            className="w-full py-8 md:py-12 bg-gray-900 text-whitepx-6 md:px-16 relative"
        >
            <FloatingParticles />

            <SectionTitle title="Experience & Certifications" />

            <div className="relative max-w-full mx-auto px-16">
                {/* Left Arrow */ }
                <button
                    onClick={ () => scrollToIndex( Math.max( activeIndex - 1, 0 ) ) }
                    className="absolute -left-8 md:-left-10 top-1/2 -translate-y-1/2 z-10 bg-purple-700/30 hover:bg-purple-700/50 p-3 rounded-full transition"
                >
                    <HiChevronLeft size={ 28 } />
                </button>

                {/* Right Arrow */ }
                <button
                    onClick={ () => scrollToIndex( Math.min( activeIndex + 1, timelineData.length - 1 ) ) }
                    className="absolute -right-8 md:-right-10 top-1/2 -translate-y-1/2 z-10 bg-purple-700/30 hover:bg-purple-700/50 p-3 rounded-full transition"
                >
                    <HiChevronRight size={ 28 } />
                </button>
                {/* Carousel */ }
                <div className="relative">
                    <div
                        ref={ scrollRef }
                        className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-snap-x gap-6 px-10 touch-pan-x"
                        style={ { scrollSnapType: "x mandatory" } }
                    >
                        { timelineData.map( ( event, index ) => (
                            <div
                                key={ event.id }
                                ref={ ( el ) => {
                                    cardRefs.current[ index ] = el;
                                } }
                                className="flex-none scroll-snap-child"
                                style={ { width: "calc(33.333% - 1rem)" } }
                                onMouseEnter={ () => scrollToIndex( index ) }
                            >
                                <TimelineCard event={ event } />
                            </div>
                        ) ) }
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TimelineCarousel;
