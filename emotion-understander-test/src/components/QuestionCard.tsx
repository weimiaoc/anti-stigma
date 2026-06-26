"use client";

import { motion } from "framer-motion";
import type { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  selected: number | null;
  onSelect: (optionIndex: number) => void;
}

const gradients = [
  "from-orange-400 to-pink-400",
  "from-pink-400 to-purple-400",
  "from-purple-400 to-pink-400",
  "from-orange-400 to-purple-400",
];

export default function QuestionCard({ question, selected, onSelect }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl shadow-lg shadow-orange-100/50 p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 leading-relaxed">
          {question.title}
        </h2>
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selected === idx;
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-r ${gradients[idx]} border-transparent text-white shadow-lg`
                    : "border-gray-100 bg-gray-50 text-gray-700 hover:border-orange-200 hover:bg-orange-50"
                }`}
              >
                <span className="font-medium">{option}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
