import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  delay = 0,
  className = '',
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
