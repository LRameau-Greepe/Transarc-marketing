const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
const [,, html, out, only] = process.argv;
const ASSETS = 'file://' + path.resolve(__dirname, '../brand');
(async () => {
  const src = fs.readFileSync(html, 'utf8').replaceAll('ASSETS', ASSETS);
  const tmp = path.resolve(path.dirname(html), '_built.html'); fs.writeFileSync(tmp, src);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  if (only) { for (const t of only.split(',')) { await p.evaluate(t => render(t), +t); await p.screenshot({ path: `${out}-${t}.png` }); } await b.close(); return; }
  const FPS = 30, N = Math.round((+process.env.DUR||20) * FPS);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-shortest',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-c:a', 'aac', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < N; i++) { await p.evaluate(t => render(t), i / FPS); ff.stdin.write(await p.screenshot({ type: 'jpeg', quality: 95 })); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
})();
