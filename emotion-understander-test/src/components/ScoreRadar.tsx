"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { ScoreVector } from "@/lib/utils";

interface ScoreRadarProps {
  scores: ScoreVector;
}

export default function ScoreRadar({ scores }: ScoreRadarProps) {
  const data = [
    { subject: "共情指数", value: scores.empathy, fullMark: 100 },
    { subject: "倾听指数", value: scores.listening, fullMark: 100 },
    { subject: "支持指数", value: scores.support, fullMark: 100 },
  ];

  return (
    <div className="w-full h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#f0e0d6" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#666", fontSize: 13, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#999", fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="你"
            dataKey="value"
            stroke="#FF6B8A"
            fill="#FF6B8A"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
