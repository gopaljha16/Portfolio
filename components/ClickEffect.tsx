import React, { useEffect, useState } from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;


const ClickEffect: React.FC = () => {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const handleClick = (e: MouseEvent) => {
      
      const id = idCounter++;
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {bursts.map((b) => (
        <Burst key={b.id} x={b.x} y={b.y} />
      ))}
    </div>
  );
};

const Burst: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const numParticles = 12;
  const particles = Array.from({ length: numParticles }).map((_, i) => {
    const angle = (i * 360) / numParticles;
    const velocity = 50 + Math.random() * 50; 
    const tx = Math.cos((angle * Math.PI) / 180) * velocity;
    const ty = Math.sin((angle * Math.PI) / 180) * velocity;
    return { id: i, tx, ty, size: Math.random() * 4 + 2 };
  });

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
          style={{ width: p.size, height: p.size, marginLeft: -p.size/2, marginTop: -p.size/2 }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{ x: p.tx, y: p.ty, scale: 0, opacity: 0 }}
          transition={{ duration: 0.4 + Math.random() * 0.3, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

export default ClickEffect;
