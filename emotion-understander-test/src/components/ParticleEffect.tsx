"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  shape: "circle" | "star" | "heart";
}

const COLORS = ["#FF7B54", "#FF6B8A", "#9B59B6", "#FFD93D", "#FF8C42", "#FF477E"];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 10,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    shape: (["circle", "star", "heart"] as const)[Math.floor(Math.random() * 3)],
  }));
}

function renderShape(shape: "circle" | "star" | "heart", size: number) {
  if (shape === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (shape === "heart") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return null;
}

export default function ParticleEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(40));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-particle-fall text-current"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            color: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.shape === "circle" ? (
            <div
              className="rounded-full"
              style={{ width: p.size, height: p.size, backgroundColor: p.color }}
            />
          ) : (
            renderShape(p.shape, p.size)
          )}
        </div>
      ))}
      <style jsx>{`
        @keyframes particleFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-particle-fall {
          animation: particleFall linear forwards;
        }
      `}</style>
    </div>
  );
}
