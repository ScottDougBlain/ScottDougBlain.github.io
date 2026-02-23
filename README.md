# Scott Blain - AI Safety & Cognitive Science Research

Personal research website bridging cognitive neuroscience and AI safety. Hosted on GitHub Pages.

**Live site:** [scottdougblain.github.io](https://scottdougblain.github.io/)

## Site Structure

```
index.html                  Landing page — research overview and navigation
about.html                  Background, approach, and contact
styles.css                  Global styles (CSS custom properties, responsive)

research/
  pattern-recognition.html              Pattern Recognition & AI Hallucinations
  social-intelligence.html              Social Intelligence & AI Alignment
  social-intelligence-gaze-experimental.html   Gaze Perception deep-dive (interactive demos)
  personality-modeling.html             Cybernetic Personality Modeling
  consciousness-indicator-gaming.html   Consciousness Indicator Gaming (FIG — preliminary)
  social-reasoning-warden.html          Social Reasoning Warden (ERA — preliminary)

assets/
  images/                   Research figures, background images, videos
  images/fig/               Data visualizations for FIG and ERA projects
  js/                       Interactive demos (apophenia, ToM, personality, publications)
  *.pdf                     Downloadable research papers

scripts_landing.js          Landing page interactions
scripts_simple.js           Research page interactions
neural-network.js           Animated particle canvas (landing hero)
```

## Technologies

Static HTML/CSS/JS — no build step, no frameworks. Vanilla Canvas API for interactive demos (gaze perception, drift-diffusion model, neural network connectivity, apophenia noise detection). CSS custom properties for theming, CSS Grid + Flexbox for layout, Intersection Observer for scroll animations. Google Fonts (Inter, Space Mono).

## Deployment

Hosted via GitHub Pages from the `Live_May2025` branch. Push to that branch to deploy.
