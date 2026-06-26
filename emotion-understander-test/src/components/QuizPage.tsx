"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import { saveProgress, loadProgress, updateStatsOnStart } from "@/lib/utils";

interface QuizPageProps {
  onComplete: (answers: number[]) => void;
  savedAnswers?: number[];
}

export default function QuizPage({ onComplete, savedAnswers }: QuizPageProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => {
    if (savedAnswers && savedAnswers.length > 0) return savedAnswers;
    return new Array(questions.length).fill(-1);
  });

  useEffect(() => {
    updateStatsOnStart();
    const saved = loadProgress();
    if (saved && saved.answers && saved.currentStep > 0 && !savedAnswers) {
      setCurrentIdx(saved.currentStep);
      setAnswers(saved.answers);
    }
  }, [savedAnswers]);

  useEffect(() => {
    saveProgress(currentIdx, answers);
  }, [currentIdx, answers]);

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const currentQuestion = questions[currentIdx];
  const canGoNext = answers[currentIdx] !== -1;
  const allAnswered = answers.every((a) => a !== -1);

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      <div className="max-w-lg w-full mx-auto flex-1 flex flex-col">
        <div className="mb-6">
          <ProgressBar current={currentIdx + 1} total={questions.length} />
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              selected={answers[currentIdx]}
              onSelect={handleSelect}
            />
          </AnimatePresence>
        </div>

        <div className="flex gap-3 mt-6">
          {currentIdx > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
            >
              上一题
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              canGoNext
                ? "text-white shadow-lg hover:shadow-xl hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            style={
              canGoNext
                ? { background: "linear-gradient(135deg, #FF7B54, #FF6B8A)" }
                : undefined
            }
          >
            {currentIdx === questions.length - 1
              ? allAnswered
                ? "查看结果"
                : "最后一题"
              : "下一题"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-gray-400">
            {answers.filter((a) => a !== -1).length}/{questions.length} 已完成
          </span>
        </div>
      </div>
    </div>
  );
}
