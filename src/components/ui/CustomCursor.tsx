import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  // Tùy kích thước màn hình
  const size = typeof window !== 'undefined' ? Math.min(window.innerWidth, 500) : 400;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      style={{
        width: size,
        height: size,
        x: springX,
        y: springY,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background:
          'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0) 70%)',
      }}
    />
  );
};

export default CustomCursor;
