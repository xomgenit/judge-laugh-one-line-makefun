// Entry for make.fun's "Make the Judge Laugh in One Line" bounty.
// The whole deliverable is one short line of text: the program's only job
// is to place that line, byte for byte, into entry.txt in the output dir.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one-liner itself. Kept as a single literal so nothing can reformat it.
const LINE =
  "I named my dog Five Miles so I can say I walk Five Miles every day. He hates the leash. He is a cat.";

// make.fun hands us an output directory through the environment; when the
// program runs standalone it falls back to a local "out" folder.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

// Create the destination if it is missing, then drop the entry in.
// writeFileSync writes exactly the string given — no newline is appended,
// which keeps the file identical to the line above.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Gate guard: the sealed scorer only accepts 1–200 characters of UTF-8
// that is not all whitespace. Check the line once more after writing so a
// careless edit to LINE fails loudly here instead of silently at grading.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim() === "") {
  throw new Error(`entry is ${length} characters; the gate wants 1–200 non-blank`);
}
