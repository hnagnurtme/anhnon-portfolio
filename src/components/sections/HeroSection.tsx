import React, { useContext, useEffect } from "react";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import personalData from "../../data/personal.json";
import { AnimationContext } from "../../store/AnimationContext";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register TextPlugin for GSAP
gsap.registerPlugin(TextPlugin);

// Define additional personal data properties
type EnhancedPersonalData = typeof personalData & {
  greeting?: string;
  shortBio?: string;
};

const enhancedData = personalData as EnhancedPersonalData;

const HeroSection: React.FC = () => {
  const { activateSection } = useContext(AnimationContext);
  
  // Text animation with GSAP
  useEffect(() => {
    const textElement = document.querySelector('.typing-text');
    const skills = ["Web Developer", "UI/UX Designer", "Problem Solver", personalData.title];
    let currentIndex = 0;
    
    if (textElement) {
      const typeText = () => {
        gsap.to(textElement, {
          duration: 1,
          text: skills[currentIndex],
          ease: "none",
          onComplete: () => {
            setTimeout(() => {
              gsap.to(textElement, {
                duration: 0.5,
                text: "",
                ease: "none",
                onComplete: () => {
                  currentIndex = (currentIndex + 1) % skills.length;
                  typeText();
                }
              });
            }, 2000);
          }
        });
      };
      
      typeText();
    }
  }, []);
  
  // Animation variants for staggered text
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };
  
  // Particle animation
  useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle) => {
      const x = Math.random() * 400 - 200;
      const y = Math.random() * 400 - 200;
      const duration = 2 + Math.random() * 2;
      
      gsap.set(particle, {
        x: 0,
        y: 0,
        opacity: Math.random() * 0.8 + 0.2,
        scale: Math.random() * 0.6 + 0.2
      });
      
      gsap.to(particle, {
        x: x,
        y: y,
        opacity: 0,
        scale: 0,
        duration: duration,
        repeat: -1,
        repeatDelay: Math.random() * 2,
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <section
      id="hero"
      className="w-full h-screen bg-linear-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white relative overflow-hidden"
    >
      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="particle absolute w-2 h-2 rounded-full bg-purple-500"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}
      </div>
      
      {/* Hero content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={item} className="relative inline-block mb-6">
            <motion.span
              className="absolute -inset-1 rounded-lg bg-linear-to-r from-purple-600 to-pink-500 blur opacity-30"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.h2 
              className="relative text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400"
              whileHover={{ scale: 1.05 }}
            >
              {enhancedData.greeting || "Welcome to my universe"}
            </motion.h2>
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-5xl md:text-7xl font-bold mb-4 text-gradient glow"
            whileHover={{ scale: 1.02 }}
          >
            Hi, I'm {personalData.name.split(" ").pop()} <span className="wave">👋</span>
          </motion.h1>
          
          <motion.div variants={item} className="flex items-center text-lg md:text-xl mb-8">
            <span className="mr-2">I'm a</span> 
            <span className="typing-text text-purple-400"></span>
            <span className="cursor-blink">|</span>
          </motion.div>
          
          <motion.p 
            variants={item}
            className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl"
          >
            {enhancedData.shortBio || "Passionate about creating digital experiences that are both beautiful and functional."}
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex gap-4 justify-center"
          >
            <Button 
              onClick={() => activateSection('projects')}
              className="interactive"
            >
              <motion.span
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                View Portfolio
              </motion.span>
            </Button>
            
            <Button 
              onClick={() => activateSection('contact')}
              className="bg-transparent border border-purple-500 text-white hover:bg-purple-500/20 interactive"
            >
              <motion.span
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                Contact Me
              </motion.span>
            </Button>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="mt-16"
          >
            <motion.a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                activateSection('about');
              }}
              className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300 interactive"
              whileHover={{ y: -2 }}
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <polyline points="7 13 12 18 17 13"></polyline>
                <polyline points="7 6 12 11 17 6"></polyline>
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 to-transparent z-0" />
    </section>
  );
};

export default HeroSection;
