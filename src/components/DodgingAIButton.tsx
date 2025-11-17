import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DodgingButtonInstance } from '../types';

interface DodgingAIButtonProps {
  onCheat?: () => void;
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function DodgingAIButton({ onCheat }: DodgingAIButtonProps) {
  const [instances, setInstances] = useState<DodgingButtonInstance[]>([
    { id: 'root', top: 50, left: 70, scale: 1 }
  ]);

  const handleClick = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onCheat?.();

    setInstances(prev => {
      const target = prev.find(b => b.id === id);
      if (!target) return prev;

      const others = prev.filter(b => b.id !== id);

      // If too many instances or too small, just teleport
      if (prev.length > 8 || target.scale < 0.35) {
        return [
          ...others,
          {
            ...target,
            id: crypto.randomUUID(),
            top: randomBetween(15, 75),
            left: randomBetween(15, 85)
          }
        ];
      }

      // Split into two smaller buttons
      const newScale = target.scale * 0.5;
      const children: DodgingButtonInstance[] = [0, 1].map(() => ({
        id: crypto.randomUUID(),
        top: randomBetween(15, 75),
        left: randomBetween(15, 85),
        scale: newScale
      }));

      return [...others, ...children];
    });
  };

  return (
    <AnimatePresence>
      {instances.map(instance => (
        <motion.button
          key={instance.id}
          className="fixed z-50 px-8 py-4 rounded-2xl bg-neon-purple text-white font-bold shadow-brutal brutal-border cursor-pointer select-none"
          style={{
            top: `${instance.top}%`,
            left: `${instance.left}%`,
            fontSize: `${instance.scale * 1.5}rem`,
            transform: `translate(-50%, -50%) scale(${instance.scale})`
          }}
          onClick={(e) => handleClick(instance.id, e)}
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: instance.scale,
            rotate: 0,
          }}
          exit={{ scale: 0, rotate: 180 }}
          whileHover={{
            scale: instance.scale * 1.1,
            rotate: Math.random() > 0.5 ? 5 : -5
          }}
          whileTap={{ scale: instance.scale * 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
        >
          🤖 AI
        </motion.button>
      ))}
    </AnimatePresence>
  );
}
