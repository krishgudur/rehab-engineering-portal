import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(79,70,229,0.35), transparent 60%)",
        fontFamily: theme.fontFamily,
        color: theme.text,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 100, fontWeight: 800, opacity: s, transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})` }}>
        Every movement is <span style={{ color: theme.secondary }}>mechanics</span>.
      </div>
      <div style={{ fontSize: 34, color: theme.muted, marginTop: 30, letterSpacing: 6, opacity: s }}>
        BMA1201 · REHABILITATION ENGINEERING
      </div>
    </AbsoluteFill>
  );
};
