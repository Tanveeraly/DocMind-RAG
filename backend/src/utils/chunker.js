export function chunkText(text, { size = 800, overlap = 150 } = {}) {
  const clean = text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const chunks = [];
  let start = 0;

  while (start < clean.length) {
    let end = Math.min(start + size, clean.length);

    // Prefer to cut at a paragraph, sentence, or word boundary
    if (end < clean.length) {
      const win = clean.slice(start, end);
      const breakAt = Math.max(
        win.lastIndexOf("\n\n"),
        win.lastIndexOf(". "),
        win.lastIndexOf("\n"),
        win.lastIndexOf(" ")
      );
      if (breakAt > size * 0.5) end = start + breakAt + 1;
    }

    const piece = clean.slice(start, end).trim();
    if (piece) chunks.push(piece);

    if (end >= clean.length) break;
    start = end - overlap; // step back so neighbouring chunks share context
    const rel = clean.slice(start, end).search(/\s/);
    if (rel !== -1) start += rel + 1;
  }

  return chunks;
}