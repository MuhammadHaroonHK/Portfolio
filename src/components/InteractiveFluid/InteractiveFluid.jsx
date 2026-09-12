import { useEffect, useRef } from "react";
import { createRenderer } from "./renderer";

export default function InteractiveFluid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const darkMode = document.documentElement.classList.contains("dark");

    const renderer = createRenderer({
      canvas,
      darkMode,
    });

    const root = document.documentElement;

    const observer = new MutationObserver(() => {
      const nextDarkMode = root.classList.contains("dark");
      renderer.setTheme(nextDarkMode);
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    void renderer.ready;

    return () => {
      observer.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="block w-full h-full touch-none pointer-events-auto"
      />
    </div>
  );
}