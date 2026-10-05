import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// Simple sagittal-plane leg (hip-knee-ankle) swinging through a gait cycle.
const GaitLeg: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame / 45) * Math.PI * 2;
  const hip = { x: 200, y: 80 };
  const hipAngle = Math.sin(t) * 25;
  const kneeAngle = hipAngle + Math.max(0, Math.sin(t + 1.2)) * 45;
  const rad = (d: number) => (d * Math.PI) / 180;
  const knee = {
    x: hip.x + Math.sin(rad(hipAngle)) * 160,
    y: hip.y + Math.cos(rad(hipAngle)) * 160,
  };
  const ankle = {
    x: knee.x + Math.sin(rad(hipAngle - (kneeAngle - hipAngle))) * 150,
    y: knee.y + Math.cos(rad(hipAngle - (kneeAngle - hipAngle))) * 150,
  };
  return (
    <svg width={400} height={460} viewBox="0 0 400 460">
      <line x1={hip.x} y1={hip.y} x2={knee.x} y2={knee.y} stroke={theme.text} strokeWidth={18} strokeLinecap="round" />
      <line x1={knee.x} y1={knee.y} x2={ankle.x} y2={ankle.y} stroke={theme.text} strokeWidth={16} strokeLinecap="round" />
      <line x1={ankle.x} y1={ankle.y} x2={ankle.x + 55} y2={ankle.y + 6} stroke={theme.text} strokeWidth={14} strokeLinecap="round" />
      {[hip, knee, ankle].map((j, i) => (
        <circle key={i} cx={j.x} cy={j.y} r={16} fill={[theme.primary, theme.secondary, theme.success][i]} />
      ))}
    </svg>
  );
};

export const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 200 } });
  const b = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const c = spring({ frame: frame - 35, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(79,70,229,0.35), transparent 50%), radial-gradient(circle at 85% 80%, rgba(14,165,233,0.25), transparent 45%)",
        fontFamily: theme.fontFamily,
        color: theme.text,
        flexDirection: "row",
        alignItems: "center",
        padding: "0 140px",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ color: theme.secondary, fontSize: 32, fontWeight: 600, letterSpacing: 8, opacity: a }}>
          BMA1201 · REHABILITATION ENGINEERING
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1.02,
            marginTop: 24,
            opacity: b,
            transform: `translateY(${interpolate(b, [0, 1], [50, 0])}px)`,
          }}
        >
          Introduction to
          <br />
          <span style={{ color: theme.primary }}>Biomechanics</span>
        </div>
        <div
          style={{
            height: 8,
            width: interpolate(c, [0, 1], [0, 420]),
            background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
            borderRadius: 4,
            marginTop: 40,
          }}
        />
        <div style={{ fontSize: 40, color: theme.muted, marginTop: 30, opacity: c }}>
          How physics explains the way we move
        </div>
      </div>
      <div style={{ opacity: c, transform: `scale(${interpolate(c, [0, 1], [0.8, 1])})` }}>
        <GaitLeg />
      </div>
    </AbsoluteFill>
  );
};
