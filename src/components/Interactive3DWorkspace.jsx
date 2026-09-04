import React, { Suspense, useRef, useEffect, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TERMINAL_LINES = [
  { type: "command", text: "whoami" },
  { type: "output", text: "Muhammad Haroon", color: "#f8fafc" },
  { type: "command", text: "cat role.txt" },
  { type: "output", text: "Software Engineer (MERN Stack)", color: "#38bdf8" },
  { type: "command", text: "cat about.json" },
  { type: "json", text: "{" },
  { type: "json", text: '  "name": "Muhammad Haroon",' },
  { type: "json", text: '  "stack": "MERN",' },
  { type: "json", text: '  "available": true' },
];

const MONO_FONT = '22px "Fira Code", Consolas, monospace';
const MONO_BOLD = 'bold 22px "Fira Code", Consolas, monospace';

function drawTerminalLine(ctx, line, x, y) {
  const text = line.text || "";

  if (line.type === "command") {
    ctx.font = MONO_BOLD;
    ctx.fillStyle = "#22c55e";
    ctx.fillText("haroon@portfolio:~$", x, y);
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(` ${text}`, x + 240, y);
    return;
  }

  if (line.type === "json") {
    ctx.font = MONO_FONT;
    const parts = text.split(/(".*?")/g);
    let currentX = x;

    parts.forEach((part) => {
      if (!part) return;
      if (part.startsWith('"')) ctx.fillStyle = "#34d399";
      else if (part.includes("true") || part.includes("false"))
        ctx.fillStyle = "#a855f7";
      else ctx.fillStyle = "#f8fafc";

      ctx.fillText(part, currentX, y);
      currentX += ctx.measureText(part).width;
    });
    return;
  }

  ctx.font = MONO_FONT;
  ctx.fillStyle = line.color || "#f8fafc";
  ctx.fillText(text, x, y);
}

function useProceduralCodeTexture() {
  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 800;
    c.height = 1280;
    return c;
  }, []);

  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [canvas]);

  const stateRef = useRef({
    lineIndex: 0,
    charIndex: 0,
    cursorVisible: true,
    lastBlink: 0,
    nextAction: 0,
    finishedAt: null,
  });

  useFrame((state) => {
    const now = state.clock.getElapsedTime() * 1000;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    let needsRedraw = false;

    if (now - s.lastBlink >= 600) {
      s.cursorVisible = !s.cursorVisible;
      s.lastBlink = now;
      needsRedraw = true;
    }

    if (now >= s.nextAction) {
      const current = TERMINAL_LINES[s.lineIndex];
      if (current) {
        const text = current.text || "";
        if (s.charIndex < text.length) {
          s.charIndex++;
          s.nextAction = now + (current.type === "command" ? 60 : 35);
          needsRedraw = true;
        } else {
          s.lineIndex++;
          s.charIndex = 0;
          s.nextAction = now + (current.type === "command" ? 400 : 120);
          needsRedraw = true;
        }
      } else {
        if (!s.finishedAt) s.finishedAt = now;
        if (now - s.finishedAt > 5000) {
          s.lineIndex = 0;
          s.charIndex = 0;
          s.finishedAt = null;
          s.nextAction = now + 800;
          needsRedraw = true;
        }
      }
    }

    if (!needsRedraw) return;

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.rotate(Math.PI / 2);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 1024, 640);

    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, 1024, 50);

    const buttons = [
      { x: 25, color: "#ef4444" },
      { x: 45, color: "#f59e0b" },
      { x: 65, color: "#22c55e" },
    ];
    buttons.forEach((b) => {
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, 25, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    const startX = 35;
    const startY = 85;
    const lineHeight = 32;

    for (let i = 0; i < s.lineIndex; i++) {
      drawTerminalLine(ctx, TERMINAL_LINES[i], startX, startY + i * lineHeight);
    }

    if (s.lineIndex < TERMINAL_LINES.length) {
      const current = TERMINAL_LINES[s.lineIndex];
      const visibleText = (current.text || "").substring(0, s.charIndex);
      const visibleLine = { ...current, text: visibleText };
      const y = startY + s.lineIndex * lineHeight;

      drawTerminalLine(ctx, visibleLine, startX, y);

      if (s.cursorVisible) {
        ctx.font = MONO_FONT;
        let cursorX =
          startX +
          (current.type === "command"
            ? 240 + ctx.measureText(` ${visibleText}`).width
            : ctx.measureText(visibleText).width);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(cursorX + 2, y - 20, 8, 22);
      }
    }

    ctx.restore();
    texture.needsUpdate = true;
  });

  return texture;
}

function LaptopModel(props) {
  const groupRef = useRef();
  const { scene } = useGLTF("/models/laptop.glb");
  const terminalTexture = useProceduralCodeTexture();

  useEffect(() => {
    if (!scene) return;

    let screenMesh = null;
    scene.traverse((child) => {
      if (!child.isMesh) return;
      if (
        child.name === "Screen_ComputerScreen_0" ||
        child.name.toLowerCase().includes("screen") ||
        child.material?.name === "ComputerScreen"
      ) {
        screenMesh = child;
      }
    });

    if (!screenMesh) return;

    const material = new THREE.MeshBasicMaterial({
      map: terminalTexture,
      toneMapped: false,
    });

    screenMesh.material = material;

    return () => material.dispose();
  }, [scene, terminalTexture]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = -0.2 + Math.sin(t * 0.8) * 0.02;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={0.12} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/laptop.glb");

export default memo(function Interactive3DWorkspace() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.8, 9.5], fov: 38, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          preserveDrawingBuffer: false,
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 5]} intensity={1.5} />
        <directionalLight position={[-4, -3, -2]} intensity={0.4} />

        <Suspense fallback={null}>
          <LaptopModel />
        </Suspense>

        <OrbitControls
          enableRotate
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 2.1}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
});
