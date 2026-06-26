"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import HomePage from "@/components/HomePage";
import IntroPage from "@/components/IntroPage";
import QuizPage from "@/components/QuizPage";
import ResultPage from "@/components/ResultPage";
import ShareCard from "@/components/ShareCard";
import Dashboard from "@/components/Dashboard";
import type { PersonalityType } from "@/data/personalities";
import type { ScoreVector } from "@/lib/utils";
import {
  calculateScores,
  matchPersonality,
  normalizeScores,
  clearProgress,
  saveResult,
  updateStatsOnComplete,
  loadResult,
} from "@/lib/utils";

type Page = "home" | "intro" | "quiz" | "result" | "share";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [answers, setAnswers] = useState<number[]>([]);
  const [personality, setPersonality] = useState<PersonalityType | null>(null);
  const [scores, setScores] = useState<ScoreVector | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleStart = useCallback(() => {
    setPage("intro");
  }, []);

  const handleBeginQuiz = useCallback(() => {
    setPage("quiz");
  }, []);

  const handleComplete = useCallback((finalAnswers: number[]) => {
    setAnswers(finalAnswers);
    const rawScores = calculateScores(finalAnswers);
    const matched = matchPersonality(rawScores);
    const normalized = normalizeScores(rawScores);

    setPersonality(matched);
    setScores(normalized);
    saveResult(matched, normalized);
    updateStatsOnComplete(finalAnswers, matched.id);
    setPage("result");
  }, []);

  const handleRestart = useCallback(() => {
    clearProgress();
    setAnswers([]);
    setPersonality(null);
    setScores(null);
    setPage("home");
  }, []);

  const handleShare = useCallback(() => {
    setPage("share");
  }, []);

  const handleCloseShare = useCallback(() => {
    setPage("result");
  }, []);

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {page === "home" && <HomePage key="home" onStart={handleStart} />}
        {page === "intro" && <IntroPage key="intro" onStart={handleBeginQuiz} />}
        {page === "quiz" && (
          <QuizPage key="quiz" onComplete={handleComplete} />
        )}
        {page === "result" && personality && scores && (
          <ResultPage
            key="result"
            personality={personality}
            scores={scores}
            onRestart={handleRestart}
            onShare={handleShare}
          />
        )}
      </AnimatePresence>

      {page === "share" && personality && scores && (
        <ShareCard
          personality={personality}
          scores={scores}
          onClose={handleCloseShare}
        />
      )}

      {showDashboard && <Dashboard onClose={() => setShowDashboard(false)} />}

      {page !== "home" && page !== "intro" && (
        <div className="text-center pb-8">
          <button
            onClick={() => setShowDashboard(true)}
            className="text-xs text-gray-300 hover:text-gray-400 transition"
          >
            数据统计
          </button>
        </div>
      )}
    </main>
  );
}
