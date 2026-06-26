"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import html2canvas from "html2canvas";
import type { PersonalityType } from "@/data/personalities";

interface ShareCardProps {
  personality: PersonalityType;
  scores: { empathy: number; listening: number; support: number; judgement: number };
  onClose: () => void;
}

export default function ShareCard({ personality, scores, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);

  const capture = useCallback(async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });
    setCaptured(canvas.toDataURL("image/png"));
  }, []);

  useEffect(() => {
    const timer = setTimeout(capture, 500);
    return () => clearTimeout(timer);
  }, [capture]);

  const handleDownload = () => {
    if (!captured) return;
    const link = document.createElement("a");
    link.download = `情绪理解者-${personality.name}.png`;
    link.href = captured;
    link.click();
  };

  const handleCopy = async () => {
    if (!captured) return;
    try {
      const blob = await (await fetch(captured)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      alert("图片已复制到剪贴板！");
    } catch {
      alert("复制失败，请长按保存图片");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center justify-center p-4">
      <div className="relative max-w-sm w-full">
        <div
          ref={cardRef}
          className="bg-white rounded-3xl p-6 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #FFF5EE 0%, #FFE0D3 50%, #FFD4E0 100%)",
          }}
        >
          <div className="text-center">
            <div className="text-6xl mb-3">{personality.emoji}</div>
            <h2 className="text-2xl font-black text-gray-800 mb-1">{personality.name}</h2>
            <p className="text-sm text-gray-500 italic mb-5">&ldquo;{personality.tagline}&rdquo;</p>

            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-600">共情指数</span>
                <span className="text-lg font-bold text-orange-500">{scores.empathy}%</span>
              </div>
              <div className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-600">倾听指数</span>
                <span className="text-lg font-bold text-pink-500">{scores.listening}%</span>
              </div>
              <div className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-600">支持指数</span>
                <span className="text-lg font-bold text-purple-500">{scores.support}%</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-4">你是哪一种情绪理解者？</p>

            <div className="w-20 h-20 mx-auto bg-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
              二维码
            </div>
          </div>
        </div>

        {captured && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleDownload}
              className="flex-1 bg-white text-gray-800 rounded-xl py-3 font-medium hover:bg-gray-100 transition"
            >
              保存图片
            </button>
            <button
              onClick={handleCopy}
              className="flex-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-xl py-3 font-medium hover:opacity-90 transition"
            >
              复制图片
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-3 w-full text-center text-white/70 text-sm py-2 hover:text-white transition"
        >
          关闭
        </button>
      </div>
    </div>
  );
}
