// Runs automatically before every build.
// Finds the hero video in the "brand" folder (hero-video.mp4 / .mov / .webm / .m4v),
// makes a silent, web-ready copy under 5 MB, and a still image for slow connections.
import { existsSync, mkdirSync, readdirSync, statSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const MAX_BYTES = 5 * 1024 * 1024;
const brandDir = 'brand';
const outDir = join('public', 'media');
const out = join(outDir, 'hero.mp4');
const poster = join(outDir, 'hero-poster.jpg');

const source = existsSync(brandDir)
  ? readdirSync(brandDir).find((f) => /^hero-video\.(mp4|mov|webm|m4v)$/i.test(f))
  : undefined;

rmSync(outDir, { recursive: true, force: true });
if (!source) {
  console.log('[media] No brand/hero-video file — the home page uses the still hero design.');
  process.exit(0);
}

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  console.warn('[media] ffmpeg is not installed here, so the hero video is skipped in this build.');
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });
const input = join(brandDir, source);
// Try progressively smaller settings until the file is under 5 MB.
const attempts = [
  { height: 720, crf: 28 }, { height: 720, crf: 32 },
  { height: 540, crf: 32 }, { height: 540, crf: 36 }, { height: 432, crf: 38 },
];
for (const a of attempts) {
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', input,
    '-t', '20', '-an',
    '-vf', `scale=-2:${a.height}:flags=lanczos,fps=25`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(a.crf),
    '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out,
  ]);
  const size = statSync(out).size;
  console.log(`[media] hero.mp4 at ${a.height}p / crf ${a.crf}: ${(size / 1048576).toFixed(2)} MB`);
  if (size <= MAX_BYTES) break;
}
if (statSync(out).size > MAX_BYTES) {
  console.warn('[media] Could not get the video under 5 MB — please upload a shorter clip. Video skipped.');
  rmSync(out);
}
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '0.5', '-i', input, '-frames:v', '1', '-vf', 'scale=1600:-2', '-q:v', '4', poster]);
console.log('[media] Still image created for slow connections.');
