import React from "react";
import { Card, Reveal, SceneFrame } from "../components";
import { theme } from "../theme";

const apps = [
  { icon: "🚶", title: "Gait analysis", body: "Motion capture & force plates diagnose walking disorders.", c: theme.secondary },
  { icon: "🦿", title: "Prosthetics & orthotics", body: "Devices designed to restore natural joint loads and motion.", c: theme.primary },
  { icon: "🩹", title: "Injury & rehab", body: "Understand tissue loading to prevent injury and guide recovery.", c: theme.success },
  { icon: "🪑", title: "Ergonomics", body: "Workplaces and tools that reduce strain on the body.", c: theme.amber },
];

export const Applications: React.FC = () => (
  <SceneFrame kicker="05 · Why it matters" title="Biomechanics in rehab engineering">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, height: 600 }}>
      {apps.map((a, i) => (
        <Reveal key={a.title} delay={20 + i * 30}>
          <Card accent={a.c} icon={a.icon} title={a.title} body={a.body} style={{ padding: "28px 40px" }} />
        </Reveal>
      ))}
    </div>
  </SceneFrame>
);
