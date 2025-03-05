import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  highlight?: string[];
  highlightClassName?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  once = true,
  highlight = [],
  highlightClassName = 'text-blue-500',
}) => {
  // Split text into words
  const words = text.split(' ');

  // Animation configuration
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={child}
        >
          <span 
            className={highlight.includes(word) ? highlightClassName : ''}
          >
            {word}{index < words.length - 1 ? ' ' : ''}
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;