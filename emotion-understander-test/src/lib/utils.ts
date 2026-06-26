import { PersonalityType, personalityTypes } from "@/data/personalities";

export interface ScoreVector {
  empathy: number;
  listening: number;
  support: number;
  judgement: number;
}

export interface QuizStats {
  totalStarts: number;
  totalCompletions: number;
  answerDistribution: Record<number, Record<number, number>>;
  personalityDistribution: Record<string, number>;
}

export function calculateScores(answers: number[]): ScoreVector {
  const scores: ScoreVector = { empathy: 0, listening: 0, support: 0, judgement: 0 };
  const dims: (keyof ScoreVector)[] = ["empathy", "listening", "support", "judgement"];

  answers.forEach((answer) => {
    if (answer >= 0 && answer < 4) {
      scores[dims[answer]] += 1;
    }
  });

  return scores;
}

export function matchPersonality(scores: ScoreVector): PersonalityType {
  let minDist = Infinity;
  let bestMatch = personalityTypes[0];

  for (const pt of personalityTypes) {
    const dist = Math.sqrt(
      Math.pow(scores.empathy - (pt.empathy / 100) * 16, 2) +
      Math.pow(scores.listening - (pt.listening / 100) * 16, 2) +
      Math.pow(scores.support - (pt.support / 100) * 16, 2) +
      Math.pow(scores.judgement - (pt.judgement / 100) * 16, 2)
    );
    if (dist < minDist) {
      minDist = dist;
      bestMatch = pt;
    }
  }

  return bestMatch;
}

export function normalizeScores(scores: ScoreVector): ScoreVector {
  const max = 16;
  return {
    empathy: Math.round((scores.empathy / max) * 100),
    listening: Math.round((scores.listening / max) * 100),
    support: Math.round((scores.support / max) * 100),
    judgement: Math.round((scores.judgement / max) * 100),
  };
}

export const STORAGE_KEYS = {
  PROGRESS: "eut_progress",
  ANSWERS: "eut_answers",
  RESULT: "eut_result",
  STATS: "eut_stats",
};

export function loadProgress(): { currentStep: number; answers: number[] } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveProgress(currentStep: number, answers: number[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify({ currentStep, answers }));
}

export function loadResult(): { personality: PersonalityType; scores: ScoreVector } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.RESULT);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveResult(personality: PersonalityType, scores: ScoreVector): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify({ personality, scores }));
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.RESULT);
}

export function loadStats(): QuizStats {
  if (typeof window === "undefined") {
    return { totalStarts: 0, totalCompletions: 0, answerDistribution: {}, personalityDistribution: {} };
  }
  const raw = localStorage.getItem(STORAGE_KEYS.STATS);
  if (!raw) {
    return { totalStarts: 0, totalCompletions: 0, answerDistribution: {}, personalityDistribution: {} };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { totalStarts: 0, totalCompletions: 0, answerDistribution: {}, personalityDistribution: {} };
  }
}

export function saveStats(stats: QuizStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
}

export function updateStatsOnStart(): void {
  const stats = loadStats();
  stats.totalStarts += 1;
  saveStats(stats);
}

export function updateStatsOnComplete(answers: number[], personalityId: string): void {
  const stats = loadStats();
  stats.totalCompletions += 1;

  answers.forEach((answer, idx) => {
    if (!stats.answerDistribution[idx + 1]) stats.answerDistribution[idx + 1] = {};
    stats.answerDistribution[idx + 1][answer] = (stats.answerDistribution[idx + 1][answer] || 0) + 1;
  });

  stats.personalityDistribution[personalityId] = (stats.personalityDistribution[personalityId] || 0) + 1;
  saveStats(stats);
}
