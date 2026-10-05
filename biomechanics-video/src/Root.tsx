import React from "react";
import { Composition } from "remotion";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { FPS } from "./theme";
import { Title } from "./scenes/Title";
import { WhatIs } from "./scenes/WhatIs";
import { Branches } from "./scenes/Branches";
import { Newton } from "./scenes/Newton";
import { Levers } from "./scenes/Levers";
import { Applications } from "./scenes/Applications";
import { Outro } from "./scenes/Outro";

const T = 15; // transition length in frames
const scenes = [
  { C: Title, d: 210 },
  { C: WhatIs, d: 300 },
  { C: Branches, d: 300 },
  { C: Newton, d: 330 },
  { C: Levers, d: 360 },
  { C: Applications, d: 300 },
  { C: Outro, d: 90 },
];
// Transitions overlap adjacent scenes, so subtract them: 1890 - 6·15 = 1800 frames = 60 s.
const DURATION = scenes.reduce((a, s) => a + s.d, 0) - T * (scenes.length - 1);

const Biomechanics: React.FC = () => (
  <TransitionSeries>
    {scenes.map(({ C, d }, i) => (
      <React.Fragment key={i}>
        {i > 0 ? (
          <TransitionSeries.Transition
            presentation={i % 2 ? fade() : slide({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: T })}
          />
        ) : null}
        <TransitionSeries.Sequence durationInFrames={d}>
          <C />
        </TransitionSeries.Sequence>
      </React.Fragment>
    ))}
  </TransitionSeries>
);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="IntroToBiomechanics"
    component={Biomechanics}
    durationInFrames={DURATION}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
