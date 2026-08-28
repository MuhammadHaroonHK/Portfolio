import { useState, useEffect } from "react";

const codeSnippets = [
  "const developer = {",
  '  name: "Muhammad Haroon",',
  '  role: "Full-Stack Developer",',
  '  skills: ["React", "Node.js", "MongoDB"],',
  '  status: "Building Scalable Apps..."',
  "};",
  "",
  "async function initWorkspace() {",
  "  await load3DScene();",
  '  console.log("System Ready 🚀");',
  "}",
  "initWorkspace();",
];

export const CodeTerminal = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (lineIndex >= codeSnippets.length) {
      const resetTimer = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
        setDisplayedText("");
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const currentLine = codeSnippets[lineIndex];

    if (charIndex < currentLine.length) {
      const charTimer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(charTimer);
    } else {
      const lineTimer = setTimeout(() => {
        setDisplayedText((prev) => prev + "\n");
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 300);
      return () => clearTimeout(lineTimer);
    }
  }, [lineIndex, charIndex]);

  return (
    <div className="w-[480px] h-[300px] bg-slate-950/95 text-emerald-400 font-mono text-xs p-4 rounded-lg shadow-2xl border border-slate-800 flex flex-col justify-between overflow-hidden select-none pointer-events-none">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-slate-400">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
        </div>
        <span className="text-[10px] text-slate-400 font-sans tracking-wide">
          App.jsx — VS Code
        </span>
      </div>

      <pre className="whitespace-pre-wrap leading-relaxed flex-1 overflow-hidden font-mono text-[11px] text-emerald-400/90">
        <code>{displayedText}</code>
        <span className="inline-block w-2 h-3.5 bg-emerald-400 align-middle animate-pulse ml-0.5" />
      </pre>

      <div className="pt-2 border-t border-slate-800/60 flex justify-between text-[9px] text-slate-500 font-sans">
        <span>UTF-8</span>
        <span>JavaScript (JSX)</span>
      </div>
    </div>
  );
};

export default CodeTerminal;