"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalityTypes } from "@/data/personalities";
import { questions } from "@/data/questions";
import { loadStats, QuizStats } from "@/lib/utils";

interface DashboardProps {
  onClose: () => void;
}

export default function Dashboard({ onClose }: DashboardProps) {
  const [stats, setStats] = useState<QuizStats | null>(null);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  if (!stats) return null;

  const completionRate =
    stats.totalStarts > 0
      ? Math.round((stats.totalCompletions / stats.totalStarts) * 100)
      : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-t-3xl sm:rounded-3xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6 sm:hidden" />

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">数据统计</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              关闭
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{stats.totalStarts}</div>
              <div className="text-xs text-gray-500 mt-1">参与人次</div>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-pink-500">{completionRate}%</div>
              <div className="text-xs text-gray-500 mt-1">完成率</div>
            </div>
          </div>

          <h3 className="font-bold text-gray-700 mb-3">人格分布</h3>
          <div className="space-y-2 mb-6">
            {personalityTypes.map((pt) => {
              const count = stats.personalityDistribution[pt.id] || 0;
              const maxCount = Math.max(...Object.values(stats.personalityDistribution), 1);
              const barWidth = (count / maxCount) * 100;
              return (
                <div key={pt.id} className="flex items-center gap-2">
                  <span className="text-sm w-6">{pt.emoji}</span>
                  <span className="text-sm text-gray-600 w-20 truncate">{pt.name}</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${barWidth}%`,
                        background: "linear-gradient(90deg, #FF7B54, #FF6B8A)",
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>

          <h3 className="font-bold text-gray-700 mb-3">每题选择分布</h3>
          <div className="space-y-3">
            {questions.slice(0, 8).map((q) => (
              <div key={q.id} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-2 truncate">
                  Q{q.id}: {q.title}
                </p>
                <div className="flex gap-1">
                  {q.options.map((opt, idx) => {
                    const dist = stats.answerDistribution[q.id] || {};
                    const count = dist[idx] || 0;
                    const total = Object.values(dist).reduce((a, b) => a + b, 0) || 1;
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={idx} className="flex-1 text-center">
                        <div className="text-xs font-bold text-gray-700">{pct}%</div>
                        <div className="h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: ["#FF7B54", "#FF6B8A", "#9B59B6", "#94A3B8"][idx],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
