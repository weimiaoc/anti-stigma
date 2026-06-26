"use client";

import { motion } from "framer-motion";

interface HomePageProps {
  onStart: () => void;
}

export default function HomePage({ onStart }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="text-7xl mb-6"
      >
        💭
      </motion.div>

      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl sm:text-4xl font-black text-gray-800 mb-3 leading-tight"
      >
        你属于哪种
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #FF7B54, #FF6B8A, #9B59B6)",
          }}
        >
          情绪理解者？
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-500 max-w-sm leading-relaxed mb-10 text-sm sm:text-base"
      >
        有人习惯倾听，有人习惯分析，有人习惯解决问题。
        <br />
        你的理解方式，可能比你想象中更影响别人。
      </motion.p>

      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="px-10 py-4 rounded-2xl text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
        style={{
          background: "linear-gradient(135deg, #FF7B54, #FF6B8A, #9B59B6)",
        }}
      >
        开始测试
      </motion.button>

      <p className="mt-8 text-xs text-gray-400">约 3 分钟 · 16 道题</p>
    </motion.div>
  );
}
