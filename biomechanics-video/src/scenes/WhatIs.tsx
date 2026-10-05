import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Reveal, SceneFrame } from "../components";
import { theme } from "../theme";

const Pill: React.FC<{ label: string; color: string; delay: number }> = ({ label, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12 } });
  return (
    <div
      style={{
        transform: `scale(${s})`,
        background: color,
        borderRadius: 999,
        padding: "28px 56px",
        fontSize: 56,
        fontWeight: 800,
      }}
    >
      {label}
    </div>
  );
};

const Op: React.FC<{ c: string; delay: number }> = ({ c, delay }) => (
  <Reveal delay={delay}>
    <div style={{ fontSize: 80, fontWeight: 800, color: theme.muted }}>{c}</div>
  </Reveal>
);

export const WhatIs: React.FC = () => (
  <SceneFrame kicker="01 · Definition" title="What is biomechanics?">
    <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 30 }}>
      <Pill label="Biology" color={theme.success} delay={20} />
      <Op c="+" delay={35} />
      <Pill label="Mechanics" color={theme.primary} delay={45} />
      <Op c="=" delay={65} />
      <Pill label="Biomechanics" color={theme.secondary} delay={75} />
    </div>
    <Reveal delay={110} style={{ marginTop: 90 }}>
      <div style={{ fontSize: 48, lineHeight: 1.4, maxWidth: 1500 }}>
        The study of <b style={{ color: theme.secondary }}>forces</b> and the{" "}
        <b style={{ color: theme.secondary }}>motion</b> they produce in living
        systems — from a single cell to a sprinting athlete.
      </div>
    </Reveal>
    <Reveal delay={170} style={{ marginTop: 40 }}>
      <div style={{ fontSize: 36, color: theme.muted }}>
        Bones act as levers · Joints act as pivots · Muscles supply the force
      </div>
    </Reveal>
  </SceneFrame>
);
