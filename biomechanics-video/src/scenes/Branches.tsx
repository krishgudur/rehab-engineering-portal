import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Card, Reveal, SceneFrame } from "../components";
import { theme } from "../theme";

const Connector: React.FC<{ delay: number; d: string }> = ({ delay, d }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <path d={d} stroke={theme.muted} strokeWidth={4} fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={p} />
  );
};

export const Branches: React.FC = () => (
  <SceneFrame kicker="02 · The big picture" title="Branches of mechanics">
    <svg width={1680} height={640} style={{ position: "absolute", top: 0, left: 0 }}>
      <Connector delay={15} d="M 840 90 L 840 130 L 300 130 L 300 170" />
      <Connector delay={15} d="M 840 130 L 1100 130 L 1100 170" />
      <Connector delay={70} d="M 1100 300 L 1100 340 L 840 340 L 840 380" />
      <Connector delay={70} d="M 1100 340 L 1400 340 L 1400 380" />
    </svg>
    <Reveal delay={0} style={{ position: "absolute", left: 690, top: 0, width: 300 }}>
      <div style={{ background: theme.primary, borderRadius: 20, padding: "22px 0", textAlign: "center", fontSize: 40, fontWeight: 800 }}>
        Mechanics
      </div>
    </Reveal>
    <Reveal delay={30} style={{ position: "absolute", left: 60, top: 170, width: 480, height: 260 }}>
      <Card accent={theme.amber} title="Statics" body="Systems at rest or constant velocity — posture, standing balance." />
    </Reveal>
    <Reveal delay={45} style={{ position: "absolute", left: 900, top: 170, width: 400 }}>
      <div style={{ background: theme.surface, borderTop: `8px solid ${theme.secondary}`, borderRadius: 20, padding: "28px 0", textAlign: "center", fontSize: 40, fontWeight: 800, color: theme.secondary }}>
        Dynamics
      </div>
    </Reveal>
    <Reveal delay={90} style={{ position: "absolute", left: 620, top: 380, width: 440, height: 240 }}>
      <Card accent={theme.success} title="Kinematics" body="Describes motion: position, velocity, joint angles." />
    </Reveal>
    <Reveal delay={110} style={{ position: "absolute", left: 1180, top: 380, width: 440, height: 240 }}>
      <Card accent={theme.danger} title="Kinetics" body="Explains motion: the forces and torques that cause it." />
    </Reveal>
  </SceneFrame>
);
