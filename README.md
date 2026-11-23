# Groupe Transarc — marketing

Marketing material for Groupe Transarc (videos, visuals). Separate from the website repository (`LRameau-Greepe/Transarc`).

## Contents

| Path | What it is |
|---|---|
| `brand/` | Brand assets copied from the website repo: Montserrat and Inter fonts (SIL Open Font License, see `brand/fonts/LICENSE-*.txt`), the Transarc logos and photos |
| `videos/render.js` | Renders an animated HTML video source to MP4 |
| `videos/climaxion-retrofit-2026/` | Climaxion retrofit video, 1080×1080, French, silent. **v2** (`reel-v2.html` → `climaxion-retrofit-1x1-v2.mp4`, 24 s) follows the website's design system; v1 (`reel.html`, 23.5 s) follows the original Facebook reel |

## Brand colours

From the website's `public/assets/css/site.css`:

| Name | Hex |
|---|---|
| Navy | `#072549` |
| Blue | `#164280`, `#1f5aa8` |
| Gold | `#e1b469` |
| Orange | `#e35321` |
| Green | `#739c2d`, `#99ac22` |
| Stripe | `#e33b1c` `#e87e08` `#ffeb00` `#6baf2e` `#62c4e6` |

## Re-rendering a video

Requires Node.js, [Playwright](https://playwright.dev) with Chromium, and ffmpeg.

```bash
DUR=24 node videos/render.js videos/climaxion-retrofit-2026/reel-v2.html videos/climaxion-retrofit-2026/climaxion-retrofit-1x1-v2.mp4
```

`DUR` is the length in seconds. To check single frames, pass a list of times instead of rendering the whole video. This writes `preview-2.png` and `preview-12.png`:

```bash
node videos/render.js videos/climaxion-retrofit-2026/reel.html preview 2,12
```

Edit text, timings and scenes in `reel.html` (the scene start times are in the `T` array at the bottom).

## Climaxion video — to check before publishing

- The Climaxion, ADEME and Région Grand Est logos are shown as plain text; replace them with the official files, if the funding agreement allows using them.
- The workshop scene uses a depot fleet photo (`cm-flotte`) because no photo of the retrofit workshop was available.
- There is no music; only add a track you have the rights to.
