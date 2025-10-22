import { createContext } from 'react';
import Lenis from '@studio-freight/lenis';

// Create animation context to share animation controls across components
export const AnimationContext = createContext<{
  lenis: Lenis | null;
  activateSection: (id: string) => void;
  activeSection: string;
}>({ 
  lenis: null, 
  activateSection: () => {}, 
  activeSection: '' 
});