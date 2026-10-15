import fs from "fs";
import path from "path";

const langFile = fs.readFileSync("src/context/LanguageContext.tsx", "utf-8");

// Extract en and hi keys
const enMatch = langFile.match(/en:\s*\{([\s\S]*?)\},\s*hi:/);
const hiMatch = langFile.match(/hi:\s*\{([\s\S]*?)\},\s*\};/);

function extractKeys(block) {
  const keys = new Set();
  const re = /"([^"]+)":/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    keys.add(m[1]);
  }
  return keys;
}

const enKeys = extractKeys(enMatch ? enMatch[1] : "");
const hiKeys = extractKeys(hiMatch ? hiMatch[1] : "");

console.log(`EN keys count: ${enKeys.size}`);
console.log(`HI keys count: ${hiKeys.size}`);

// Scan all ts/tsx files in src
function walkDir(dir, cb) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walkDir(full, cb);
    } else if (full.endsWith(".tsx") || full.endsWith(".ts")) {
      cb(full);
    }
  }
}

const usedKeys = new Map();
const tRegex = /\bt\(\s*["']([^"']+)["']\s*(?:,\s*["']([^"']*)["'])?/g;

walkDir("src", (file) => {
  if (file.includes("LanguageContext.tsx")) return;
  const content = fs.readFileSync(file, "utf-8");
  let m;
  while ((m = tRegex.exec(content)) !== null) {
    const key = m[1];
    const defaultVal = m[2] || "";
    if (!usedKeys.has(key)) {
      usedKeys.set(key, { defaultVal, files: [] });
    }
    usedKeys.get(key).files.push(file);
  }
});

console.log(`Total unique t() keys used in codebase: ${usedKeys.size}`);

const missingInEn = [];
const missingInHi = [];

for (const [key, data] of usedKeys.entries()) {
  if (!enKeys.has(key)) {
    missingInEn.push({ key, defaultVal: data.defaultVal, file: data.files[0] });
  }
  if (!hiKeys.has(key)) {
    missingInHi.push({ key, defaultVal: data.defaultVal, file: data.files[0] });
  }
}

console.log("\n--- MISSING IN EN ---");
console.log(JSON.stringify(missingInEn, null, 2));

console.log("\n--- MISSING IN HI ---");
console.log(JSON.stringify(missingInHi, null, 2));
