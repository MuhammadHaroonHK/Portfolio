import React, { Suspense, useRef, useEffect, useMemo } from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

import * as THREE from "three";

/* =========================================================
   TERMINAL CONTENT
   ========================================================= */

const TERMINAL_LINES = [
  {
    type: "command",
    text: "whoami",
  },
  {
    type: "output",
    text: "Muhammad Haroon",
    color: "#f8fafc",
  },

  {
    type: "command",
    text: "cat role.txt",
  },
  {
    type: "output",
    text: "Software Engineer (MERN Stack)",
    color: "#38bdf8",
  },

  {
    type: "command",
    text: "cat about.json",
  },
  {
    type: "json",
    text: "{",
  },
  {
    type: "json",
    text: '  "name": "Muhammad Haroon",',
  },
  {
    type: "json",
    text: '  "stack": "MERN",',
  },
  {
    type: "json",
    text: '  "available": true',
  },
  {
    type: "json",
    text: "}",
  },

  {
    type: "command",
    text: "education --current",
  },
  {
    type: "output",
    text: "BS Software Engineering",
    color: "#a855f7",
  },
  {
    type: "output",
    text: "City University of Science & IT",
    color: "#cbd5e1",
  },

  {
    type: "command",
    text: "experience --latest",
  },
  {
    type: "output",
    text: "MERN Stack Intern @ Logic Gigs",
    color: "#34d399",
  },
  {
    type: "output",
    text: "Jun 2025 - Aug 2025",
    color: "#94a3b8",
  },

  {
    type: "command",
    text: "skills --list",
  },
  {
    type: "skills",
    text: "React.js | Node.js | Express.js | MongoDB",
  },
  {
    type: "skills",
    text: "JavaScript | TypeScript | Next.js | Tailwind CSS",
  },
  {
    type: "skills",
    text: "PostgreSQL | Prisma | Git | Docker",
  },

  {
    type: "command",
    text: "projects --featured",
  },
  {
    type: "success",
    text: "✓ AdEverywhere (AdVision)",
  },
  {
    type: "success",
    text: "✓ Box Surprise",
  },

  {
    type: "command",
    text: "status",
  },
  {
    type: "success",
    text: "✓ Available for opportunities",
  },

  {
    type: "command",
    text: "portfolio --end",
  },
  {
    type: "output",
    text: "Thanks for visiting!",
    color: "#38bdf8",
  },
];

/* =========================================================
   TERMINAL DRAWING
   ========================================================= */

function drawTerminalLine(ctx, line, x, y) {
  const text = line.text || "";

  /* ---------------- COMMAND ---------------- */

  if (line.type === "command") {
    const prompt = "haroon@portfolio:~$";

    ctx.font = 'bold 27px "Fira Code", "Cascadia Code", Consolas, monospace';

    ctx.fillStyle = "#22c55e";

    ctx.fillText(prompt, x, y);

    const promptWidth = ctx.measureText(prompt).width;

    ctx.fillStyle = "#e2e8f0";

    ctx.fillText(` ${text}`, x + promptWidth, y);

    return;
  }

  /* ---------------- JSON ---------------- */

  if (line.type === "json") {
    ctx.font = '26px "Fira Code", "Cascadia Code", Consolas, monospace';

    const parts = text.split(/(".*?")/g);

    let currentX = x;

    parts.forEach((part) => {
      if (!part) return;

      if (part.startsWith('"')) {
        ctx.fillStyle = "#34d399";
      } else if (part.includes("true") || part.includes("false")) {
        ctx.fillStyle = "#a855f7";
      } else {
        ctx.fillStyle = "#f8fafc";
      }

      ctx.fillText(part, currentX, y);

      currentX += ctx.measureText(part).width;
    });

    return;
  }

  /* ---------------- SKILLS ---------------- */

  if (line.type === "skills") {
    ctx.font = '23px "Fira Code", "Cascadia Code", Consolas, monospace';

    const skills = text.split(" | ");

    let currentX = x;

    skills.forEach((skill, index) => {
      ctx.fillStyle = index % 2 === 0 ? "#38bdf8" : "#cbd5e1";

      ctx.fillText(skill, currentX, y);

      currentX += ctx.measureText(skill).width;

      if (index < skills.length - 1) {
        ctx.fillStyle = "#64748b";

        ctx.fillText("  |  ", currentX, y);

        currentX += ctx.measureText("  |  ").width;
      }
    });

    return;
  }

  /* ---------------- SUCCESS ---------------- */

  if (line.type === "success") {
    ctx.font = 'bold 25px "Fira Code", "Cascadia Code", Consolas, monospace';

    ctx.fillStyle = "#22c55e";

    ctx.fillText(text, x, y);

    return;
  }

  /* ---------------- DEFAULT OUTPUT ---------------- */

  ctx.font = '25px "Fira Code", "Cascadia Code", Consolas, monospace';

  ctx.fillStyle = line.color || "#f8fafc";

  ctx.fillText(text, x, y);
}

/* =========================================================
   PROCEDURAL TERMINAL TEXTURE
   ========================================================= */

function useProceduralCodeTexture() {
  const canvas = useMemo(() => {
    const c = document.createElement("canvas");

    c.width = 1000;
c.height = 1600;

    return c;
  }, []);

  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(canvas);

    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;

    tex.colorSpace = THREE.SRGBColorSpace;

    /*
     * The GLB screen UVs are rotated.
     */
    tex.center.set(0.5, 0.5);
tex.rotation = 0;
tex.repeat.set(1, 1);

    return tex;
  }, [canvas]);

  const stateRef = useRef({
    lineIndex: 0,
    charIndex: 0,

    cursorVisible: true,

    lastBlink: 0,

    nextAction: 0,

    finishedAt: null,

    initialized: false,
  });

  useFrame((state) => {
    const now = state.clock.getElapsedTime() * 1000;

    const ctx = canvas.getContext("2d");

    const s = stateRef.current;

    let update = false;

    /* =====================================================
       CURSOR
       ===================================================== */

    if (now - s.lastBlink >= 500) {
      s.cursorVisible = !s.cursorVisible;

      s.lastBlink = now;

      update = true;
    }

    /* =====================================================
       TYPING ENGINE
       ===================================================== */

    if (now >= s.nextAction) {
      const current = TERMINAL_LINES[s.lineIndex];

      if (current) {
        const text = current.text || "";

        /* ---------------- TYPING ---------------- */

        if (s.charIndex < text.length) {
          s.charIndex++;

          /*
           * Slightly randomized typing speed
           * makes it look less robotic.
           */
          const typingDelay =
            current.type === "command"
              ? 45 + Math.random() * 35
              : 22 + Math.random() * 20;

          s.nextAction = now + typingDelay;

          update = true;
        } else {

        /* ---------------- LINE COMPLETE ---------------- */
          s.lineIndex++;
          s.charIndex = 0;

          /*
           * Commands get a realistic
           * terminal processing delay.
           */
          if (current.type === "command") {
            s.nextAction = now + 550;
          } else {
            s.nextAction = now + 100;
          }

          update = true;
        }
      } else {

      /* ===================================================
         TERMINAL COMPLETE
         =================================================== */
        if (!s.finishedAt) {
          s.finishedAt = now;
        }

        /*
         * Keep the completed terminal visible
         * for a while.
         */
        if (now - s.finishedAt > 5000) {
          s.lineIndex = 0;
          s.charIndex = 0;

          s.finishedAt = null;

          s.nextAction = now + 700;

          update = true;
        }
      }
    }

    if (!update) return;

/* =====================================================
   PREPARE LANDSCAPE TERMINAL DRAWING
   ===================================================== */

ctx.save();

/*
 * The GLB screen expects the texture in a rotated
 * orientation. The canvas itself is portrait (1000x1600),
 * so rotate the drawing context to create a
 * 1600x1000 logical terminal.
 */
ctx.translate(canvas.width, 0);
ctx.rotate(Math.PI / 2);

/* =====================================================
   BACKGROUND
   ===================================================== */

ctx.fillStyle = "#020617";

ctx.fillRect(0, 0, 1600, 1000);

    /* =====================================================
       TERMINAL HEADER
       ===================================================== */

    const headerHeight = 68;

    ctx.fillStyle = "#111827";

    ctx.fillRect(0, 0, 1600, headerHeight);

    /* Window buttons */

    const buttons = [
      {
        x: 35,
        color: "#ef4444",
      },
      {
        x: 67,
        color: "#f59e0b",
      },
      {
        x: 99,
        color: "#22c55e",
      },
    ];

    buttons.forEach((button) => {
      ctx.fillStyle = button.color;

      ctx.beginPath();

      ctx.arc(button.x, 34, 10, 0, Math.PI * 2);

      ctx.fill();
    });

    /* Header title */

    ctx.font = '21px "Fira Code", Consolas, monospace';

    ctx.fillStyle = "#64748b";

    ctx.textAlign = "center";

    ctx.fillText("haroon@portfolio: ~", 1600 / 2, 41);

    ctx.textAlign = "left";

    /* =====================================================
       TERMINAL CONTENT
       ===================================================== */

    const startX = 55;
    const startY = 115;

    const lineHeight = 43;

    /*
     * Completed lines.
     */
    for (let i = 0; i < s.lineIndex; i++) {
      drawTerminalLine(ctx, TERMINAL_LINES[i], startX, startY + i * lineHeight);
    }

    /*
     * Current line.
     */
    if (s.lineIndex < TERMINAL_LINES.length) {
      const current = TERMINAL_LINES[s.lineIndex];

      const visibleText = (current.text || "").substring(0, s.charIndex);

      const visibleLine = {
        ...current,
        text: visibleText,
      };

      const y = startY + s.lineIndex * lineHeight;

      drawTerminalLine(ctx, visibleLine, startX, y);

      /* =================================================
         CURSOR
         ================================================= */

      if (s.cursorVisible) {
        ctx.font =
          current.type === "command"
            ? 'bold 27px "Fira Code", Consolas, monospace'
            : '25px "Fira Code", Consolas, monospace';

        let cursorX = startX;

        if (current.type === "command") {
          const prompt = "haroon@portfolio:~$";

          cursorX += ctx.measureText(prompt).width;

          cursorX += ctx.measureText(
            visibleText ? ` ${visibleText}` : " ",
          ).width;
        } else {
          cursorX += ctx.measureText(visibleText).width;
        }

        ctx.fillStyle = "#38bdf8";

        ctx.fillRect(cursorX + 4, y - 3, 12, 31);
      }
    }
    ctx.restore();

    texture.needsUpdate = true;
  });

  return texture;
}

/* =========================================================
   LAPTOP
   ========================================================= */

function LaptopModel(props) {
  const groupRef = useRef();

  const { scene } = useGLTF("/models/laptop.glb");

  const terminalTexture = useProceduralCodeTexture();

  /* =====================================================
     FIND SCREEN
     ===================================================== */

  useEffect(() => {
    if (!scene) return;

    let screenMesh = null;

    scene.traverse((child) => {
      if (!child.isMesh) return;

      const isScreen =
        child.name === "Screen_ComputerScreen_0" ||
        child.name.toLowerCase().includes("screen") ||
        child.material?.name === "ComputerScreen";

      if (isScreen) {
        screenMesh = child;
      }
    });

    if (!screenMesh) {
      console.warn("Laptop screen mesh not found.");

      return;
    }

    /* ===================================================
       ORIGINAL SCREEN MATERIAL
       =================================================== */

    const material = screenMesh.material.clone();

    material.side = THREE.FrontSide;

    material.map = terminalTexture;

    material.emissiveMap = terminalTexture;

    material.emissive = new THREE.Color(0xffffff);

    material.emissiveIntensity = 1.25;

    material.roughness = 0.2;

    material.metalness = 0.05;

    material.toneMapped = false;

    material.needsUpdate = true;

    screenMesh.material = material;

    /* ===================================================
       PREVENT TEXTURE FROM REPEATING
       =================================================== */

    terminalTexture.wrapS = THREE.ClampToEdgeWrapping;

    terminalTexture.wrapT = THREE.ClampToEdgeWrapping;

    /* ===================================================
       CLEANUP
       =================================================== */

    return () => {
      material.dispose();
    };
  }, [scene, terminalTexture]);

  /* =====================================================
     LAPTOP ANIMATION
     ===================================================== */

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    /*
     * Smooth floating.
     */
    groupRef.current.position.y = -0.2 + Math.sin(t * 0.8) * 0.035;

    /*
     * Very subtle left/right movement.
     */
    groupRef.current.rotation.y = Math.sin(t * 0.45) * 0.055;

    /*
     * Tiny forward/back movement.
     */
    groupRef.current.rotation.x = Math.cos(t * 0.35) * 0.012;

    /*
     * Slight Z rotation gives the laptop
     * a more natural floating feeling.
     */
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.008;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={0.12} {...props}>
      <primitive object={scene} />
    </group>
  );
}

/* =========================================================
   PRELOAD
   ========================================================= */

useGLTF.preload("/models/laptop.glb");

/* =========================================================
   MAIN SCENE
   ========================================================= */

export default function Interactive3DWorkspace() {
  return (
    <div
      className="
        w-full
        h-full
        relative
        overflow-hidden
        flex
        items-center
        justify-center
      "
    >
      <Canvas
        camera={{
          position: [0, 0.8, 9.5],

          fov: 38,

          near: 0.1,

          far: 100,
        }}
        dpr={[1, 1.5]}
      >
        {/* =================================================
            LIGHTING
        ================================================= */}

        <ambientLight intensity={1.2} />

        <directionalLight position={[4, 6, 5]} intensity={1.8} />

        <directionalLight position={[-4, 3, 2]} intensity={0.8} />

        <pointLight position={[0, 3, 3]} intensity={0.8} />

        {/* =================================================
            LAPTOP
        ================================================= */}

        <Suspense fallback={null}>
          <LaptopModel />

          <Environment preset="city" />
        </Suspense>

        {/* =================================================
            CONTROLS
        ================================================= */}

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
