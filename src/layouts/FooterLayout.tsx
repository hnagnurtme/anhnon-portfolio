import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Footer: React.FC = () => {
  const navItems = [
    { name: "Home", target: "hero" },
    { name: "About", target: "about" },
    { name: "Skills", target: "skills" },
    { name: "Projects", target: "projects" },
    { name: "Experience", target: "experience" },
    { name: "Contact", target: "contact" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", url: "https://github.com/hnagnurtme" },
    { name: "LinkedIn", icon: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z", url: "https://linkedin.com/in/hnagnurtme" },
    { name: "Email", icon: "M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12zm.5-9.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5zM7 10h-1V6h1v4z", url: "mailto:anhnon0106@gmail.com" },
  ];

  return (
    <motion.footer 
      className="w-full py-10 bg-black border-t border-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <motion.div 
              className="text-2xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-purple-500">Anh</span>
              <span className="text-white">Non</span>
            </motion.div>
            <p className="text-gray-400 text-sm">
              Building digital experiences with code and creativity.
              Specializing in modern web development and software engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.target}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={item.target}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm cursor-pointer"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={1000}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <svg 
                    fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 16 16"
                    className="w-5 h-5"
                  >
                    <path d={social.icon} />
                  </svg>
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Nguyen Van Trung Anh. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
