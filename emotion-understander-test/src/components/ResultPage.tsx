"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { PersonalityType } from "@/data/personalities";
import type { ScoreVector } from "@/lib/utils";
import ScoreRadar from "./ScoreRadar";
import ParticleEffect from "./ParticleEffect";

interface ResultPageProps {
  personality: PersonalityType;
  scores: ScoreVector;
  onRestart: () => void;
  onShare: () => void;
}

function AnimatedNumber({ target, suffix = "%" }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      setDisplay(value);

      if (current >= steps) {
        clearInterval(timer);
        setDisplay(target);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function ResultPage({ personality, scores, onRestart, onShare }: ResultPageProps) {
  const [showContent, setShowContent] = useState(false);
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600);
    const particleTimer = setTimeout(() => setShowParticles(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(particleTimer);
    };
  }, []);

  const dimensions = [
    { label: "共情指数", value: scores.empathy, color: "#FF7B54" },
    { label: "倾听指数", value: scores.listening, color: "#FF6B8A" },
    { label: "支持指数", value: scores.support, color: "#9B59B6" },
    { label: "判断倾向", value: scores.judgement, color: "#94A3B8" },
  ];

  return (
    <div className="min-h-screen pb-12">
      {showParticles && <ParticleEffect />}

      <div className="max-w-lg mx-auto px-4 pt-8">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="text-7xl text-center mb-4"
        >
          {personality.emoji}
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-2"
        >
          <h1
            className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent inline-block"
            style={{
              backgroundImage: "linear-gradient(135deg, #FF7B54, #FF6B8A, #9B59B6)",
            }}
          >
            {personality.name}
          </h1>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 italic mb-6"
        >
          &ldquo;{personality.tagline}&rdquo;
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 p-6 mb-6"
        >
          <p className="text-gray-700 text-center leading-relaxed">{personality.description}</p>
        </motion.div>

        {showContent && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 p-6 mb-6"
            >
              <h3 className="text-center font-bold text-gray-800 mb-4">能力维度</h3>
              <ScoreRadar scores={scores} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 mb-8"
            >
              {dimensions.map((dim, idx) => (
                <motion.div
                  key={dim.label}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">{dim.label}</span>
                    <span className="text-lg font-bold" style={{ color: dim.color }}>
                      <AnimatedNumber target={dim.value} />
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dim.value}%` }}
                      transition={{ delay: 0.7 + idx * 0.1, duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: dim.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        <div className="flex gap-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            重新测试
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onShare}
            className="flex-1 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition"
            style={{
              background: "linear-gradient(135deg, #FF7B54, #FF6B8A, #9B59B6)",
            }}
          >
            分享给朋友
          </motion.button>
        </div>
      </div>
    </div>
  );
}
