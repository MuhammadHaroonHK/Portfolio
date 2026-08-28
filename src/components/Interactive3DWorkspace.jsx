import React, { Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 1. Terminal Code Lines to animate
const CODE_LINES = [
  'haroon@portfolio:~$ cat dev.js',
  ' ',
  'const developer = {',
  '  name: "Haroon",',
  '  stack: "MERN",',
  '  available: true',
  '};',
  ' ',
  'haroon@portfolio:~$ _'
];

// 2. Dynamic Canvas Texture Generator Hook
function useProceduralCodeTexture() {
  const canvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 768;
    return c;
  }, []);

  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [canvas]);

  const stateRef = useRef({
    lineIndex: 0,
    charIndex: 0,
    cursorVisible: true,
    lastTypeTime: 0,
    lastBlinkTime: 0,
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 1000;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;
    let needsUpdate = false;

    // Handle Cursor Blink (every 500ms)
    if (time - s.lastBlinkTime > 500) {
      s.cursorVisible = !s.cursorVisible;
      s.lastBlinkTime = time;
      needsUpdate = true;
    }

    // Handle Typing Speed (every 40ms per character)
    if (time - s.lastTypeTime > 40) {
      if (s.lineIndex < CODE_LINES.length) {
        const currentLine = CODE_LINES[s.lineIndex];
        if (s.charIndex < currentLine.length) {
          s.charIndex++;
          s.lastTypeTime = time;
          needsUpdate = true;
        } else {
          // Move to next line after brief pause
          s.lineIndex++;
          s.charIndex = 0;
          s.lastTypeTime = time + 300;
          needsUpdate = true;
        }
      } else {
        // Loop animation: reset after 4 seconds pause at end
        if (time - s.lastTypeTime > 4000) {
          s.lineIndex = 0;
          s.charIndex = 0;
          s.lastTypeTime = time;
          needsUpdate = true;
        }
      }
    }

    if (!needsUpdate) return;

    // --- DRAW TERMINAL TO CANVAS ---
    // Background
    ctx.fillStyle = '#0f172a'; // Slate-900 editor dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header bar simulation
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, 50);

    // Terminal window dots
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(30, 25, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(55, 25, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(80, 25, 8, 0, Math.PI * 2); ctx.fill();

    // Font settings
    ctx.font = 'bold 32px "Fira Code", Monaco, Consolas, monospace';
    ctx.textBaseline = 'top';

    const startX = 50;
    let startY = 90;
    const lineHeight = 50;

    // Render fully typed lines
    for (let i = 0; i < s.lineIndex; i++) {
      drawLineWithSyntaxHighlighting(ctx, CODE_LINES[i], startX, startY + i * lineHeight);
    }

    // Render current active typing line
    if (s.lineIndex < CODE_LINES.length) {
      const activeLineText = CODE_LINES[s.lineIndex].substring(0, s.charIndex);
      drawLineWithSyntaxHighlighting(ctx, activeLineText, startX, startY + s.lineIndex * lineHeight);

      // Render blinking cursor block
      if (s.cursorVisible) {
        const measuredWidth = ctx.measureText(activeLineText).width;
        ctx.fillStyle = '#38bdf8'; // Cyan cursor
        ctx.fillRect(startX + measuredWidth + 4, startY + s.lineIndex * lineHeight, 18, 36);
      }
    } else if (s.cursorVisible) {
      // End of script blinking cursor
      const lastLineIndex = CODE_LINES.length - 1;
      const lastLineText = CODE_LINES[lastLineIndex];
      const measuredWidth = ctx.measureText(lastLineText).width;
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(startX + measuredWidth + 4, startY + lastLineIndex * lineHeight, 18, 36);
    }

    // Signal Three.js to re-upload canvas texture to GPU
    texture.needsUpdate = true;
  });

  return texture;
}

// Helper: Basic Syntax Highlighting for Terminal Text
function drawLineWithSyntaxHighlighting(ctx, text, x, y) {
  if (text.startsWith('haroon@portfolio')) {
    // Terminal prompt
    ctx.fillStyle = '#38bdf8'; // Cyan username
    ctx.fillText('haroon@portfolio', x, y);
    const w1 = ctx.measureText('haroon@portfolio').width;

    ctx.fillStyle = '#f43f5e'; // Pink separator
    ctx.fillText(':$ ', x + w1, y);
    const w2 = ctx.measureText(':$ ').width;

    ctx.fillStyle = '#e2e8f0'; // White command
    ctx.fillText(text.replace('haroon@portfolio:$ ', ''), x + w1 + w2, y);
    return;
  }

  // Code line tokens parsing
  const words = text.split(/(\s+|[{},;:])/);
  let currentX = x;

  words.forEach((token) => {
    if (['const', 'let', 'var'].includes(token)) {
      ctx.fillStyle = '#f43f5e'; // Pink keyword
    } else if (['name', 'stack', 'available', 'developer'].includes(token)) {
      ctx.fillStyle = '#38bdf8'; // Cyan variable/key
    } else if (['true', 'false'].includes(token)) {
      ctx.fillStyle = '#a855f7'; // Purple boolean
    } else if (token.startsWith('"') || token.endsWith('"')) {
      ctx.fillStyle = '#34d399'; // Green string
    } else {
      ctx.fillStyle = '#f8fafc'; // White symbols / standard text
    }

    ctx.fillText(token, currentX, y);
    currentX += ctx.measureText(token).width;
  });
}

// 3. Laptop Model Loader Component
function LaptopModel(props) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/laptop.glb');
  const codeScreenTexture = useProceduralCodeTexture();

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (
          child.isMesh &&
          (child.material.name === 'ComputerScreen' || child.name.includes('Screen'))
        ) {
          child.material = child.material.clone();

          // Apply procedural canvas texture to map & emissive slot
          child.material.map = codeScreenTexture;
          child.material.emissiveMap = codeScreenTexture;
          child.material.emissive = new THREE.Color(0xffffff);
          child.material.emissiveIntensity = 1.2;
          child.material.roughness = 0.2;
          child.material.metalness = 0.1;

          child.material.needsUpdate = true;
        }
      });
    }
  }, [scene, codeScreenTexture]);

  // Subtle floating idle animation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.45) * 0.06;
    groupRef.current.rotation.x = Math.cos(t * 0.35) * 0.015;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={0.12} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/laptop.glb');

// 4. Main Scene Component
export default function Interactive3DWorkspace() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{
          position: [0, 0.8, 9.5],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.2} />

        <directionalLight position={[4, 6, 5]} intensity={1.8} />
        <directionalLight position={[-4, 3, 2]} intensity={0.8} />
        <pointLight position={[0, 3, 3]} intensity={0.8} />

        <Suspense fallback={null}>
          <LaptopModel />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableRotate
          enableZoom
          enablePan={false}
          minDistance={6}
          maxDistance={14}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 2.1}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}