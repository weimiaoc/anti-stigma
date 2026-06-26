"use client";

import { motion } from "framer-motion";

interface IntroPageProps {
  onStart: () => void;
}

export default function IntroPage({ onStart }: IntroPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-5 py-2 text-orange-500 font-medium text-sm mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          16 道题 · 约 3 分钟
        </div>
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-gray-800 mb-4"
      >
        开始之前
      </motion.h2>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 p-6 max-w-sm w-full mb-8"
      >
        <ul className="text-left space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-0.5">•</span>
            根据你的第一反应选择，没有对错之分
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-0.5">•</span>
            每道题有 4 个选项，请选择最接近你想法的那个
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-0.5">•</span>
            完成后你会得到一份专属的情绪理解者报告
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-400 mt-0.5">•</span>
            进度会自动保存，随时可以回来继续
          </li>
        </ul>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
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
        准备好了，开始吧
      </motion.button>
    </motion.div>
  );
}
