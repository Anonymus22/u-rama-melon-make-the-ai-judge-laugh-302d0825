// Make the AI Judge Laugh — entry contract:
//   * The program writes exactly one joke to /output/entry.txt
//     (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
//   * The joke must be a single line, 1–200 characters (and bytes),
//     non-blank after trimming, with no embedded newline characters.
//   * Output is the joke followed by a single trailing newline.
// The joke itself is fixed: it is the entry, not a parameter, so the
// program is deterministic — the same output on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The office printer only jams on deadline day, which is how I learned it reads the calendar better than my boss.";

if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`Joke must be 1-200 characters, got ${JOKE.length}`);
}
// Byte length is the stricter limit for non-ASCII text: a joke that
// fits the character limit could still overflow a byte-based limit,
// so enforce both.
const JOKE_BYTES = Buffer.byteLength(JOKE, "utf8");
if (JOKE_BYTES < 1 || JOKE_BYTES > 200) {
  throw new Error(`Joke must be 1-200 bytes, got ${JOKE_BYTES}`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("Joke must be a single line");
}
if (JOKE.trim().length === 0) {
  throw new Error("Joke must not be blank");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), JOKE + "\n");
