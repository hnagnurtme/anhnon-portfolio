import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  className?: string;
  center?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = "", center = true }) => {
  return (
    <motion.h2
      className={`text-3xl md:text-4xl font-bold ${center ? "text-center" : ""} mb-4 md:mb-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {title}
    </motion.h2>
  );
};

export default SectionTitle;
