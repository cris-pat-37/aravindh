"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./HeroScene";

interface Hero3DProps {
  scrollProgress?: number;
  className?: string;
}

function getLowPerf(): boolean {
  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const mem = (navigator as { deviceMemory?: number }).deviceMemory;
  const isLowMemory = mem !== undefined && mem < 4;
  const isLowCPU = navigator.hardwareConcurrency < 4;
  return isMobile || isLowMemory || isLowCPU;
}

function getReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero3D({ scrollProgress = 0, className = "" }: Hero3DProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [particleProgress, setParticleProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => getReducedMotion());
  const containerRef = useRef<HTMLDivElement>(null);
  const internalProgress = useRef(0);

  const lowPerf = useMemo(() => getLowPerf(), []);

  const postIntensity = lowPerf ? 0.3 : 1;
  const mouseInfluence = lowPerf ? 0.5 : 1;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(prefersReducedMotion.matches);
    prefersReducedMotion.addEventListener("change", updateReducedMotion);
    return () => prefersReducedMotion.removeEventListener("change", updateReducedMotion);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouse({ x, y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const x = (touch.clientX - rect.left) / rect.width - 0.5;
        const y = (touch.clientY - rect.top) / rect.height - 0.5;
        setMouse({ x, y });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const duration = 2000;
    const start = performance.now();
    internalProgress.current = 0;

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      internalProgress.current = eased;
      setParticleProgress(eased);
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const dpr = useMemo(() => {
    if (lowPerf || reducedMotion) return 1;
    return [1, 1.5] as [number, number];
  }, [reducedMotion, lowPerf]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50, near: 0.1, far: 200 }}
        gl={{
          antialias: !reducedMotion,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={dpr}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <HeroScene
          mouse={mouse}
          scrollProgress={scrollProgress}
          particleProgress={particleProgress}
          mouseInfluence={mouseInfluence}
          postIntensity={postIntensity}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
