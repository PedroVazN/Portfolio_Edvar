import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedElementProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scale' | 'none';
  once?: boolean;
  threshold?: number;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  },
  none: {
    hidden: {},
    visible: {}
  }
};

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  animation = 'fadeInUp',
  once = true,
  threshold = 0.15,
  ...props
}) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={animations[animation]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;