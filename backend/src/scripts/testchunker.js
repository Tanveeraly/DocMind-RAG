import { chunkText } from "../utils/chunker.js";

const text = "RAG combines search with generation. ".repeat(100);
const chunks = chunkText(text);

console.log("Chunks:", chunks.length);
console.log("First chunk length:", chunks[0].length);
console.log("Overlap check:");
console.log("  end of chunk 0:  ...", chunks[0].slice(-40));
console.log("  start of chunk 1:", chunks[1].slice(0, 40), "...");