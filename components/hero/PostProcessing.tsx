"use client";

import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

interface PostProcessingProps {
  intensity: number;
  reducedMotion: boolean;
}

export function PostProcessing({ intensity, reducedMotion }: PostProcessingProps) {

  return (
    <EffectComposer
      multisampling={reducedMotion ? 0 : 4}
      autoClear={false}
    >
      <Bloom
        mipmapBlur
        intensity={0.8 * intensity}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        levels={3}
      />
      <DepthOfField
        focusDistance={0}
        focalLength={reducedMotion ? 0 : 0.08}
        bokehScale={reducedMotion ? 0 : 4}
        height={480}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0015 * intensity, 0.001 * intensity]}
        radialModulation={false}
      />
      <Vignette
        offset={0.35}
        darkness={0.5 * intensity}
        eskil={false}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={reducedMotion ? 0 : 0.03 * intensity}
      />
    </EffectComposer>
  );
}
