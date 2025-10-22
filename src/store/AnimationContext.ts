import { createContext } from 'react';
import Lenis from '@studio-freight/lenis';

export const AnimationContext = createContext<{
    lenis: Lenis | null;
    activateSection: ( id: string ) => void;
    activeSection: string;
}>( {
    lenis: null,
    activateSection: () => { },
    activeSection: ''
} );