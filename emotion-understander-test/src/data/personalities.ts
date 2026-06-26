export interface PersonalityType {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  empathy: number;
  listening: number;
  support: number;
  judgement: number;
  stigmaRisk: number;
  description: string;
}

export const personalityTypes: PersonalityType[] = [
  {
    id: "gardener",
    name: "共情园丁",
    emoji: "🌿",
    tagline: "每个人的表现背后，可能都有原因。",
    empathy: 95,
    listening: 92,
    support: 85,
    judgement: 8,
    stigmaRisk: 8,
    description: "你像园丁一样，细心照料他人的情绪，总能发现别人没说出口的感受。",
  },
  {
    id: "treehole",
    name: "深夜树洞",
    emoji: "☕",
    tagline: "你说，我在听。",
    empathy: 90,
    listening: 98,
    support: 80,
    judgement: 10,
    stigmaRisk: 10,
    description: "你是别人愿意敞开心扉的对象，安静、可靠、擅长倾听。",
  },
  {
    id: "detective",
    name: "线索侦探",
    emoji: "🔍",
    tagline: "先理解发生了什么。",
    empathy: 76,
    listening: 82,
    support: 72,
    judgement: 22,
    stigmaRisk: 22,
    description: "你习惯观察和分析行为背后的逻辑。",
  },
  {
    id: "navigator",
    name: "问题导航员",
    emoji: "🧭",
    tagline: "下一步怎么办更重要。",
    empathy: 68,
    listening: 60,
    support: 78,
    judgement: 28,
    stigmaRisk: 28,
    description: "你擅长找到方向和解决方案。",
  },
  {
    id: "optimist",
    name: "乐观推进器",
    emoji: "🎈",
    tagline: "事情总会慢慢变好。",
    empathy: 65,
    listening: 58,
    support: 70,
    judgement: 35,
    stigmaRisk: 35,
    description: "你擅长给人希望和力量。",
  },
  {
    id: "guardian",
    name: "边界守卫",
    emoji: "🛡️",
    tagline: "尊重别人，也尊重距离。",
    empathy: 60,
    listening: 55,
    support: 65,
    judgement: 38,
    stigmaRisk: 38,
    description: "你懂得保持适当边界。",
  },
  {
    id: "executor",
    name: "现实执行派",
    emoji: "⚙️",
    tagline: "先把事情做好再说。",
    empathy: 45,
    listening: 42,
    support: 55,
    judgement: 63,
    stigmaRisk: 63,
    description: "你重视行动与效率。",
  },
  {
    id: "survivor",
    name: "硬核生存家",
    emoji: "🦖",
    tagline: "办法总比困难多。",
    empathy: 28,
    listening: 20,
    support: 40,
    judgement: 82,
    stigmaRisk: 82,
    description: "你崇尚坚强和独立。",
  },
];
