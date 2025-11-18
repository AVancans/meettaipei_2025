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
    { id: 'root', top: 50, left: 50, scale: 1 }
  ]);

  const handleClick = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onCheat?.();

    setInstances(prev => {
      const target = prev.find(b => b.id === id);
      if (!target) return prev;

      const others = prev.filter(b => b.id !== id);

      if (prev.length > 8 || target.scale < 0.35) {
        return [
          ...others,
          {
            ...target,
            id: crypto.randomUUID(),
            top: randomBetween(20, 70),
            left: randomBetween(20, 80)
          }
        ];
      }

      const newScale = target.scale * 0.55;
      const children: DodgingButtonInstance[] = [0, 1].map(() => ({
        id: crypto.randomUUID(),
        top: randomBetween(20, 70),
        left: randomBetween(20, 80),
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
          className="absolute z-50 px-8 py-6 font-black uppercase tracking-tight cursor-pointer select-none"
          style={{
            top: `${instance.top}%`,
            left: `${instance.left}%`,
            fontSize: `${instance.scale * 2}rem`,
            backgroundColor: '#FF006E',
            border: `${Math.max(4, instance.scale * 8)}px solid #000000`,
            boxShadow: `${instance.scale * 12}px ${instance.scale * 12}px 0px 0px #000000`,
            transform: `translate(-50%, -50%) scale(${instance.scale}) rotate(${Math.random() * 10 - 5}deg)`
          }}
          onClick={(e) => handleClick(instance.id, e)}
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: instance.scale,
            rotate: 0,
          }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          whileHover={{
            scale: instance.scale * 1.1,
            rotate: Math.random() > 0.5 ? 5 : -5,
            y: -8,
            boxShadow: `${instance.scale * 16}px ${instance.scale * 16}px 0px 0px #000000`,
          }}
          whileTap={{
            scale: instance.scale * 0.95,
            y: 0,
            boxShadow: `${instance.scale * 4}px ${instance.scale * 4}px 0px 0px #000000`,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
        >
          <span className="text-brutal-white flex items-center gap-2">
            <span style={{ fontSize: `${instance.scale * 2.5}rem` }}>🤖</span>
            AI
          </span>
        </motion.button>
      ))}
    </AnimatePresence>
  );
}
