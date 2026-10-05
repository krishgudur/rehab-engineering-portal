import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Reveal, SceneFrame } from "../components";
import { theme } from "../theme";

const rad = (d: number) => (d * Math.PI) / 180;

const Arm: React.FC = () => {
  const frame = useCurrentFrame();
  // Biceps curl: forearm angle above horizontal oscillates 0° → 70°.
  const angle = interpolate(Math.sin(frame / 22 - Math.PI / 2), [-1, 1], [0, 70]);
  const elbow = { x: 220, y: 420 };
  const shoulder = { x: 220, y: 90 };
  const dir = { x: Math.cos(rad(angle)), y: -Math.sin(rad(angle)) };
  const at = (d: number) => ({ x: elbow.x + dir.x * d, y: elbow.y + dir.y * d });
  const insertion = at(60);
  const hand = at(330);
  const bulge = interpolate(angle, [0, 70], [10, 34]);
  const mid = { x: (shoulder.x + 30 + insertion.x) / 2 + bulge, y: (shoulder.y + 40 + insertion.y) / 2 };
  return (
    <svg width={640} height={600} viewBox="0 0 640 600">
      <line x1={shoulder.x} y1={shoulder.y} x2={elbow.x} y2={elbow.y} stroke={theme.text} strokeWidth={30} strokeLinecap="round" />
      <path
        d={`M ${shoulder.x + 22} ${shoulder.y + 40} Q ${mid.x + 20} ${mid.y} ${insertion.x} ${insertion.y}`}
        stroke={theme.danger}
        strokeWidth={22}
        fill="none"
        strokeLinecap="round"
      />
      <line x1={elbow.x} y1={elbow.y} x2={hand.x} y2={hand.y} stroke={theme.text} strokeWidth={26} strokeLinecap="round" />
      <polygon points={`${elbow.x - 30},${elbow.y + 60} ${elbow.x + 30},${elbow.y + 60} ${elbow.x},${elbow.y + 12}`} fill={theme.amber} />
      <circle cx={elbow.x} cy={elbow.y} r={14} fill={theme.amber} />
      <rect x={hand.x - 18} y={hand.y - 50} width={36} height={100} rx={8} fill={theme.secondary} />
      <line x1={hand.x} y1={hand.y + 60} x2={hand.x} y2={hand.y + 140} stroke={theme.secondary} strokeWidth={8} />
      <polygon points={`${hand.x - 14},${hand.y + 140} ${hand.x + 14},${hand.y + 140} ${hand.x},${hand.y + 162}`} fill={theme.secondary} />
      <text x={elbow.x - 150} y={elbow.y + 100} fill={theme.amber} fontSize={30} fontWeight={600} fontFamily={theme.fontFamily}>Fulcrum (elbow)</text>
      <text x={shoulder.x + 40} y={shoulder.y + 10} fill={theme.danger} fontSize={30} fontWeight={600} fontFamily={theme.fontFamily}>Effort (biceps)</text>
      <text x={Math.min(hand.x - 40, 520)} y={Math.max(hand.y - 70, 30)} fill={theme.secondary} fontSize={30} fontWeight={600} fontFamily={theme.fontFamily}>Load</text>
    </svg>
  );
};

const classes = [
  { n: "1st class", order: "Effort · Fulcrum · Load", ex: "Nodding the head", c: theme.amber },
  { n: "2nd class", order: "Fulcrum · Load · Effort", ex: "Rising onto tiptoes", c: theme.success },
  { n: "3rd class", order: "Fulcrum · Effort · Load", ex: "Biceps curl — most common", c: theme.danger },
];

export const Levers: React.FC = () => (
  <SceneFrame kicker="04 · Musculoskeletal mechanics" title="The body is a system of levers">
    <div style={{ display: "flex", gap: 60 }}>
      <Reveal delay={10} from="left">
        <Arm />
      </Reveal>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24, paddingTop: 10 }}>
        {classes.map((k, i) => (
          <Reveal key={k.n} delay={40 + i * 40} from="right">
            <div style={{ background: "#1e293b", borderLeft: `10px solid ${k.c}`, borderRadius: 18, padding: "22px 32px" }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: k.c }}>{k.n}</div>
              <div style={{ fontSize: 28, color: theme.muted, marginTop: 6 }}>
                {k.order} — <span style={{ color: theme.text }}>{k.ex}</span>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={190}>
          <div style={{ fontSize: 40, fontWeight: 600, marginTop: 10 }}>
            Torque <span style={{ color: theme.secondary }}>τ = F × d</span>
            <span style={{ color: theme.muted, fontSize: 30 }}> — force times moment arm</span>
          </div>
        </Reveal>
      </div>
    </div>
  </SceneFrame>
);
