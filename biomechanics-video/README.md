# Introduction to Biomechanics — 1-minute video

Remotion project (scaffolded with `npx create-video@latest --blank`) for the BMA1201
Rehabilitation Engineering portal. Output: 60 s, 1920×1080, 30 fps.

Scenes: Title → What is biomechanics? → Branches of mechanics → Newton's laws →
Levers in the body → Applications in rehab engineering → Outro.

```console
npm i
npm run dev      # preview in Remotion Studio
npm run render   # writes out/intro-to-biomechanics.mp4
```

If Remotion can't download its own Chrome (restricted network), pass an existing one:
`npm run render -- --browser-executable=/path/to/chrome-headless-shell`.

A rendered copy is committed at `../videos/intro-to-biomechanics.mp4`.
