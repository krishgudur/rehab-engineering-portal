import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

export const SceneFrame: React.FC<{
  children: React.ReactNode;
  kicker?: string;
  title?: string;
}> = ({ children, kicker, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        backgroundImage:
          "radial-gradient(circle at 15% 10%, rgba(79,70,229,0.25), transparent 45%), radial-gradient(circle at 90% 90%, rgba(14,165,233,0.18), transparent 40%)",
        fontFamily: theme.fontFamily,
        color: theme.text,
        padding: "90px 120px",
      }}
    >
      {kicker ? (
        <div
          style={{
            color: theme.secondary,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: enter,
          }}
        >
          {kicker}
        </div>
      ) : null}
      {title ? (
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            marginTop: 12,
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ flex: 1, position: "relative", marginTop: 40 }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Fades/slides children in starting at `delay` frames.
export const Reveal: React.FC<{
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  from?: "bottom" | "left" | "right";
}> = ({ delay, children, style, from = "bottom" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const d = interpolate(p, [0, 1], [40, 0]);
  const transform =
    from === "bottom"
      ? `translateY(${d}px)`
      : from === "left"
        ? `translateX(${-d}px)`
        : `translateX(${d}px)`;
  return <div style={{ opacity: p, transform, ...style }}>{children}</div>;
};

export const Card: React.FC<{
  accent: string;
  title: string;
  body: string;
  icon?: string;
  style?: React.CSSProperties;
}> = ({ accent, title, body, icon, style }) => (
  <div
    style={{
      background: theme.surface,
      borderRadius: 24,
      borderTop: `8px solid ${accent}`,
      padding: "36px 40px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
      height: "100%",
      boxSizing: "border-box",
      ...style,
    }}
  >
    {icon ? <div style={{ fontSize: 56, marginBottom: 12 }}>{icon}</div> : null}
    <div style={{ fontSize: 40, fontWeight: 800, color: accent }}>{title}</div>
    <div
      style={{ fontSize: 30, color: theme.muted, marginTop: 14, lineHeight: 1.35 }}
    >
      {body}
    </div>
  </div>
);
