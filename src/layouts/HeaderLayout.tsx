import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { AnimationContext } from "../store/AnimationContext";
import { gsap } from "gsap";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSection } = useContext(AnimationContext);
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated menu button effect
  useEffect(() => {
    if (mobileMenuOpen) {
      // Close button animation
      gsap.to(".menu-line-1", {
        rotate: 45,
        y: 6,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(".menu-line-2", {
        opacity: 0,
        duration: 0.3
      });
      
      gsap.to(".menu-line-3", {
        rotate: -45,
        y: -6,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      // Hamburger menu animation
      gsap.to(".menu-line-1", {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(".menu-line-2", {
        opacity: 1,
        duration: 0.3
      });
      
      gsap.to(".menu-line-3", {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Home", target: "hero" },
    { name: "About", target: "about" },
    { name: "Skills", target: "skills" },
    { name: "Projects", target: "projects" },
    { name: "Experience", target: "experience" },
    { name: "Contact", target: "contact" },
  ];

  const headerVariants = {
    initial: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      height: "80px",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      backdropFilter: "blur(10px)",
      height: "60px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <motion.header
      className="w-full fixed top-0 z-50"
      initial="initial"
      animate={scrolled ? "scrolled" : "initial"}
      variants={headerVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-full">
        <motion.div
          className="text-xl font-bold tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-purple-500">Anh</span>
          <span className="text-white">Non</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item, i) => (
              <motion.li 
                key={item.target}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <Link
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={1000}
                  className={`text-sm tracking-wider font-medium px-2 py-2 relative inline-block transition-colors cursor-pointer interactive ${activeSection === item.target ? 'text-purple-400' : 'text-gray-300 hover:text-purple-300'}`}
                >
                  {item.name}
                  {activeSection === item.target && (
                    <motion.span 
                      className="absolute left-0 bottom-0 h-[2px] bg-purple-500"
                      layoutId="activeTab"
                      style={{ width: '100%' }}
                    />
                  )}
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none interactive p-2 relative z-20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="menu-line-1 w-full h-[2px] bg-white block transition-all duration-300 origin-left"></span>
              <span className="menu-line-2 w-full h-[2px] bg-white block transition-all duration-300"></span>
              <span className="menu-line-3 w-full h-[2px] bg-white block transition-all duration-300 origin-left"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-md z-10 flex items-center justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ 
              opacity: 1, 
              clipPath: "circle(150% at top right)",
              transition: { 
                duration: 0.7, 
                ease: [0.76, 0, 0.24, 1] 
              }
            }}
            exit={{ 
              opacity: 0, 
              clipPath: "circle(0% at top right)",
              transition: { 
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1]
              } 
            }}
          >
            <nav className="p-4 w-full">
              <ul className="flex flex-col space-y-6 items-center">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.target}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 0.3 + i * 0.1,
                        duration: 0.5
                      }
                    }}
                    exit={{ 
                      opacity: 0,
                      y: 10,
                      transition: { duration: 0.2 }
                    }}
                    className="w-full max-w-xs"
                  >
                    <Link
                      to={item.target}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={1000}
                      className={`text-2xl font-medium block py-2 text-center relative overflow-hidden interactive ${
                        activeSection === item.target ? 'text-purple-400' : 'text-gray-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.span 
                        className="relative z-10 block"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                      {activeSection === item.target && (
                        <motion.span
                          className="absolute bottom-0 left-0 h-[3px] bg-purple-500 w-full"
                          layoutId="mobileActiveTab"
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
