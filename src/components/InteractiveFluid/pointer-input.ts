export interface StirInput {
  active: boolean;
  from: [number, number];
  to: [number, number];
  velocity: [number, number];
  consumeStep(): void;
  dispose(): void;
}

export function installStirInput(canvas: HTMLCanvasElement): StirInput {
  let activePointer: number | undefined;

  let from: [number, number] = [0.5, 0.5];
  let to: [number, number] = [0.5, 0.5];
  let velocity: [number, number] = [0, 0];

  let lastTime = 0;
  let decay = 0;

  const previousTouchAction = canvas.style.touchAction;

  // The fluid is now a background effect.
  // We listen globally instead of depending on canvas pointer events.
  canvas.style.touchAction = "none";

  const point = (event: PointerEvent): [number, number] => {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);

    return [
      Math.max(0, Math.min(1, event.clientX / width)),
      Math.max(0, Math.min(1, 1 - event.clientY / height)),
    ];
  };

  const move = (event: PointerEvent) => {
    if (!event.isPrimary) return;

    const next = point(event);

    if (lastTime === 0) {
      from = to = next;
      lastTime = event.timeStamp;
      activePointer = event.pointerId;
      velocity = [0, 0];
      decay = 2;
      return;
    }

    const dt = Math.max(
      0.004,
      Math.min(0.05, (event.timeStamp - lastTime) / 1000),
    );

    from = to;
    to = next;

    velocity = [
      Math.max(-2.5, Math.min(2.5, (to[0] - from[0]) / dt)),
      Math.max(-2.5, Math.min(2.5, (to[1] - from[1]) / dt)),
    ];

    activePointer = event.pointerId;
    lastTime = event.timeStamp;
    decay = 2;
  };

  const down = (event: PointerEvent) => {
    if (!event.isPrimary) return;

    activePointer = event.pointerId;

    from = to = point(event);
    lastTime = event.timeStamp;
    velocity = [0, 0];
    decay = 2;
  };

  const up = (event: PointerEvent) => {
    if (!event.isPrimary) return;
    if (event.pointerId !== activePointer) return;

    activePointer = undefined;
    decay = 2;
  };

  const cancel = (event: PointerEvent) => {
    if (!event.isPrimary) return;
    if (event.pointerId !== activePointer) return;

    activePointer = undefined;
    decay = 2;
  };

  const reset = () => {
    lastTime = 0;
    activePointer = undefined;
    velocity = [0, 0];
    decay = 0;
  };

  // IMPORTANT:
  // Listen on window so the fluid receives pointer movement even when
  // the cursor is over text, laptop, links, buttons, etc.
  window.addEventListener("pointermove", move, { passive: true });
  window.addEventListener("pointerdown", down, { passive: true });
  window.addEventListener("pointerup", up, { passive: true });
  window.addEventListener("pointercancel", cancel, { passive: true });
  window.addEventListener("blur", reset);

  return {
    get active() {
      return decay > 0;
    },

    get from() {
      return from;
    },

    get to() {
      return to;
    },

    get velocity() {
      return velocity;
    },

    consumeStep() {
      from = to;

      if (decay > 0) {
        decay--;

        if (decay === 0) {
          velocity = [velocity[0] * 0.2, velocity[1] * 0.2];
        }
      }
    },

    dispose() {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
      window.removeEventListener("blur", reset);

      activePointer = undefined;
      canvas.style.touchAction = previousTouchAction;
    },
  };
}
