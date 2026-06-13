"use client";

import { Suspense } from "react";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { ParticleSystem } from "./ParticleSystem";
import { FloatingGeometry } from "./FloatingGeometry";
import { HeroLighting } from "./HeroLighting";
import { HeroCamera } from "./HeroCamera";
import { PostProcessing } from "./PostProcessing";
import { HeroContent } from "./HeroContent";

interface HeroSceneProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
  particleProgress: number;
  mouseInfluence: number;
  postIntensity: number;
  reducedMotion: boolean;
}

export function HeroScene({
  mouse,
  scrollProgress,
  particleProgress,
  mouseInfluence,
  postIntensity,
  reducedMotion,
}: HeroSceneProps) {
  return (
    <Suspense fallback={null}>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      
      <HeroCamera mouse={mouse} scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
      <HeroLighting />
      
      <ParticleSystem
        progress={particleProgress}
        mouse={mouse}
        mouseInfluence={mouseInfluence}
        reducedMotion={reducedMotion}
      />
      
      <FloatingGeometry
        mouse={mouse}
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />
      
      <HeroContent
        mouse={mouse}
        progress={particleProgress}
        reducedMotion={reducedMotion}
      />
      
      <PostProcessing intensity={postIntensity} reducedMotion={reducedMotion} />
    </Suspense>
  );
}
