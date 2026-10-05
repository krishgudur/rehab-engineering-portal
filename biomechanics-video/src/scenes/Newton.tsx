import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Card, Reveal, SceneFrame } from "../components";
import { theme } from "../theme";

const laws = [
  { icon: "🧍", title: "1 · Inertia", body: "A body stays at rest or in motion unless a net force acts — why we must brake to stop running." },
  { icon: "🏋️", title: "2 · F = m·a", body: "Acceleration is proportional to net force — stronger muscle force, faster limb movement." },
  { icon: "👣", title: "3 · Action–Reaction", body: "Push down on the ground and the ground pushes back: the ground reaction force." },
];
const accents = [theme.amber, theme.primary, theme.success];

const GroundReaction: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const pulse = 1 + 0.08 * Math.sin((frame - delay) / 6);
  const len = interpolate(s, [0, 1], [0, 150]) * pulse;
  return (
    <svg width={1680} height={190} style={{ opacity: s }}>
      <line x1={200} y1={150} x2={1480} y2={150} stroke={theme.muted} strokeWidth={4} />
      <text x={200} y={185} fill={theme.muted} fontSize={26} fontFamily={theme.fontFamily}>ground</text>
      <g stroke={theme.danger} strokeWidth={10} fill={theme.danger}>
        <line x1={760} y1={10} x2={760} y2={10 + len * 0.8} />
        <polygon points={`748,${10 + len * 0.8} 772,${10 + len * 0.8} 760,${30 + len * 0.8}`} />
      </g>
      <g stroke={theme.success} strokeWidth={10} fill={theme.success}>
        <line x1={920} y1={150} x2={920} y2={150 - len * 0.9} />
        <polygon points={`908,${150 - len * 0.9} 932,${150 - len * 0.9} 920,${130 - len * 0.9}`} />
      </g>
      <text x={500} y={60} fill={theme.danger} fontSize={30} fontWeight={600} fontFamily={theme.fontFamily}>Foot pushes ↓</text>
      <text x={960} y={60} fill={theme.success} fontSize={30} fontWeight={600} fontFamily={theme.fontFamily}>GRF pushes ↑</text>
    </svg>
  );
};

export const Newton: React.FC = () => (
  <SceneFrame kicker="03 · Foundations" title="Newton's laws in the body">
    <div style={{ display: "flex", gap: 40, height: 380 }}>
      {laws.map((l, i) => (
        <Reveal key={l.title} delay={20 + i * 50} style={{ flex: 1 }}>
          <Card accent={accents[i]} icon={l.icon} title={l.title} body={l.body} />
        </Reveal>
      ))}
    </div>
    <div style={{ marginTop: 30 }}>
      <GroundReaction delay={200} />
    </div>
  </SceneFrame>
);
