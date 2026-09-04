import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;

    // Mobile / Touch Detection & Cap
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    const maxParticles = isMobile ? 35 : 70;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 150);
    };
    window.addEventListener("resize", handleResize);

    const mouse = {
      x: null,
      y: null,
      radiusSq: 140 * 140, // Pre-squared proximity distance
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    const particleCount = Math.min(
      Math.floor((window.innerWidth * window.innerHeight) / 18000),
      maxParticles,
    );
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 1;
      }

      update() {
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.x += this.vx;
        this.y += this.vy;

        // Mouse force interaction using squared distance (no Math.sqrt)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (140 - dist) / 140;
            this.x += (dx / dist) * force * 1.2;
            this.y += (dy / dist) * force * 1.2;
          }
        }
      }

      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? "rgba(129, 140, 248, 0.6)"
          : "rgba(79, 70, 229, 0.5)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const maxDistance = 110;
    const maxDistanceSq = maxDistance * maxDistance;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(isDark);
      }

      // $O(N^2)$ Optimized connection loop using squared distance comparisons
      const strokeStyleDark = "rgba(129, 140, 248,";
      const strokeStyleLight = "rgba(99, 102, 241,";

      for (let a = 0; a < particles.length; a++) {
        const pA = particles[a];
        for (let b = a + 1; b < particles.length; b++) {
          const pB = particles[b];
          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const opacity = (1 - distSq / maxDistanceSq) * 0.22;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.strokeStyle =
              (isDark ? strokeStyleDark : strokeStyleLight) + `${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Cursor lines loop
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radiusSq) {
            const opacity = (1 - distSq / mouse.radiusSq) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle =
              (isDark ? strokeStyleDark : strokeStyleLight) + `${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
}
