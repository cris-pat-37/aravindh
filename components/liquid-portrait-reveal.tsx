"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type LiquidPortraitRevealProps = {
  baseSrc: string;
  revealSrc: string;
  alt: string;
};

export function LiquidPortraitReveal({
  baseSrc,
  revealSrc,
  alt,
}: LiquidPortraitRevealProps) {
  const frameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealImageRef = useRef<HTMLImageElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, inside: false });
  const velocityRef = useRef({ x: 0, y: 0 });
  const maskRef = useRef({ radius: 0, wobble: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const small = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(coarse || small);
    };

    updateMobile();
    window.addEventListener("resize", updateMobile);

    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const maskCanvas = document.createElement("canvas");
    const maskContext = maskCanvas.getContext("2d");

    if (!maskContext) {
      return;
    }

    const revealImage = new window.Image();
    revealImage.src = revealSrc;
    revealImage.decoding = "async";
    revealImageRef.current = revealImage;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(ratio, ratio);
    };

    const drawRevealCover = (
      target: CanvasRenderingContext2D,
      offsetX = 0,
      offsetY = 0,
    ) => {
      if (!revealImageRef.current || !revealImageRef.current.complete) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const img = revealImageRef.current;
      const imageAspect = img.naturalWidth / img.naturalHeight;
      const boxAspect = rect.width / rect.height;

      let drawWidth = rect.width;
      let drawHeight = rect.height;
      let x = 0;
      let y = 0;

      if (imageAspect > boxAspect) {
        drawHeight = rect.height;
        drawWidth = drawHeight * imageAspect;
        x = (rect.width - drawWidth) / 2;
      } else {
        drawWidth = rect.width;
        drawHeight = drawWidth / imageAspect;
        y = (rect.height - drawHeight) / 2;
      }

      target.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight);
    };

    const animate = (now: number) => {
      frameRef.current = window.requestAnimationFrame(animate);

      const rect = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      const pointer = pointerRef.current;
      const velocity = velocityRef.current;
      const mask = maskRef.current;

      pointer.x += (pointer.targetX - pointer.x) * 0.18;
      pointer.y += (pointer.targetY - pointer.y) * 0.18;

      velocity.x *= 0.84;
      velocity.y *= 0.84;

      const targetRadius = pointer.inside ? Math.max(rect.width, rect.height) * 0.22 : 0;
      mask.radius += (targetRadius - mask.radius) * 0.14;
      const speed = Math.min(Math.hypot(velocity.x, velocity.y) * 1800, 32);
      mask.wobble += (speed - mask.wobble) * 0.14;

      context.clearRect(0, 0, rect.width, rect.height);
      maskContext.setTransform(1, 0, 0, 1, 0, 0);
      maskContext.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

      if (mask.radius > 1) {
        const centerX = pointer.x * rect.width;
        const centerY = pointer.y * rect.height;
        const stretchX = 1 + Math.min(Math.abs(velocity.x) * 10, 0.35);
        const stretchY = 1 + Math.min(Math.abs(velocity.y) * 10, 0.35);
        const time = now * 0.0013;
        const driftX = velocity.x * 220;
        const driftY = velocity.y * 220;

        maskContext.save();
        maskContext.scale(ratio, ratio);
        maskContext.globalCompositeOperation = "lighter";

        const paintBlob = (
          x: number,
          y: number,
          radius: number,
          alpha: number,
          scaleX = 1,
          scaleY = 1,
        ) => {
          maskContext.save();
          maskContext.translate(x, y);
          maskContext.scale(scaleX, scaleY);
          const gradient = maskContext.createRadialGradient(0, 0, 0, 0, 0, radius);
          gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
          gradient.addColorStop(0.45, `rgba(255,255,255,${alpha * 0.94})`);
          gradient.addColorStop(0.78, `rgba(120,240,255,${alpha * 0.42})`);
          gradient.addColorStop(1, "rgba(120,240,255,0)");
          maskContext.fillStyle = gradient;
          maskContext.beginPath();
          maskContext.arc(0, 0, radius, 0, Math.PI * 2);
          maskContext.fill();
          maskContext.restore();
        };

        paintBlob(centerX, centerY, mask.radius, 1, stretchX, stretchY);
        paintBlob(
          centerX + driftX * 0.45 + Math.cos(time * 1.8) * mask.radius * 0.16,
          centerY + driftY * 0.3 + Math.sin(time * 1.4) * mask.radius * 0.14,
          mask.radius * 0.62 + mask.wobble * 0.45,
          0.82,
          1.08,
          0.94,
        );
        paintBlob(
          centerX - driftY * 0.2 + Math.sin(time * 2.2) * mask.radius * 0.12,
          centerY + driftX * 0.2 - Math.cos(time * 1.6) * mask.radius * 0.12,
          mask.radius * 0.34,
          0.68,
          0.96,
          1.1,
        );
        paintBlob(
          centerX - driftX * 0.22 - Math.cos(time * 1.3) * mask.radius * 0.1,
          centerY - driftY * 0.18 + Math.sin(time * 2.6) * mask.radius * 0.09,
          mask.radius * 0.26,
          0.56,
          1.02,
          0.98,
        );

        maskContext.restore();

        context.save();
        context.filter = "contrast(1.04) saturate(1.04)";
        drawRevealCover(
          context,
          (pointer.x - 0.5) * 12,
          (pointer.y - 0.5) * 10,
        );
        context.restore();

        context.globalCompositeOperation = "destination-in";
        context.filter = "blur(22px)";
        context.drawImage(maskCanvas, 0, 0, rect.width, rect.height);
        context.filter = "none";
        context.globalCompositeOperation = "source-over";

        const glow = context.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          mask.radius * 1.2,
        );
        glow.addColorStop(0, "rgba(255,255,255,0.2)");
        glow.addColorStop(0.45, "rgba(120,240,255,0.16)");
        glow.addColorStop(1, "rgba(120,240,255,0)");
        context.fillStyle = glow;
        context.fillRect(0, 0, rect.width, rect.height);
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
    };
  }, [isMobile, revealSrc]);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container || isMobile) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const nextX = (event.clientX - rect.left) / rect.width;
    const nextY = (event.clientY - rect.top) / rect.height;

    velocityRef.current.x = nextX - pointerRef.current.targetX;
    velocityRef.current.y = nextY - pointerRef.current.targetY;
    pointerRef.current.targetX = nextX;
    pointerRef.current.targetY = nextY;
    pointerRef.current.inside = true;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      onPointerEnter={(event) => {
        handleMove(event);
        pointerRef.current.inside = true;
      }}
      onPointerLeave={() => {
        pointerRef.current.inside = false;
      }}
      className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(120,240,255,0.18),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
    >
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,5,13,0.1),rgba(4,5,13,0.48))]" />
      <Image
        src={baseSrc}
        alt={alt}
        width={900}
        height={1100}
        priority
        className="relative z-0 h-full w-full object-cover object-top saturate-[0.68] contrast-[1.02] brightness-[0.76] grayscale-[0.16]"
      />
      {!isMobile ? (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
