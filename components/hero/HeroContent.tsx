"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

interface HeroContentProps {
  mouse: { x: number; y: number };
  progress: number;
  reducedMotion: boolean;
}

export function HeroContent({ mouse, progress, reducedMotion }: HeroContentProps) {
  const taglineRef = useRef<THREE.Mesh>(null);
  const subtitleRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (reducedMotion) return;
    if (taglineRef.current) {
      taglineRef.current.position.x = mouse.x * 0.5;
      taglineRef.current.position.y = -mouse.y * 0.3;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Main Name */}
      <Float speed={1} rotationIntensity={0.02} floatIntensity={0.4}>
        <Text
          ref={taglineRef}
          position={[0, 2.5, -3]}
          fontSize={0.9}
          font="/fonts/Geist_Bold.json"
          letterSpacing={0.12}
          lineHeight={1}
          anchorX="center"
          anchorY="middle"
          color={"#78f0ff"}
          fillOpacity={0.5 + progress * 0.5}
          outlineWidth={0.02}
          outlineColor={"#7c5cff"}
        >
          V. ARAVINDH
        </Text>
      </Float>

      {/* Subtitle Tagline */}
      <Float speed={0.5} rotationIntensity={0.01} floatIntensity={0.2}>
        <Text
          ref={subtitleRef}
          position={[0, 1.2, -2.5]}
          fontSize={0.25}
          font="/fonts/Geist_Regular.json"
          letterSpacing={0.15}
          lineHeight={1.2}
          anchorX="center"
          anchorY="middle"
          color={"#99a6cc"}
          fillOpacity={0.3 + progress * 0.7}
        >
          AI Systems · 3D Interfaces · Scalable Platforms
        </Text>
      </Float>

      {/* Description */}
      <Float speed={0.3} rotationIntensity={0.008} floatIntensity={0.15}>
        <Text
          position={[0, -0.5, -2]}
          fontSize={0.15}
          font="/fonts/Geist_Regular.json"
          letterSpacing={0.05}
          lineHeight={1.5}
          anchorX="center"
          anchorY="middle"
          maxWidth={6}
          color={"#8899cc"}
          fillOpacity={0.2 + progress * 0.5}
        >
          Building real-world AI systems and scalable web platforms
          with automation, 3D interfaces, and production-ready solutions.
        </Text>
      </Float>

      {/* Scroll Indicator */}
      <group position={[0, -3, -1]}>
        <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3} floatingRange={[0, 0.5]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.15}
            font="/fonts/Geist_Regular.json"
            anchorX="center"
            anchorY="middle"
            color={"#78f0ff"}
            fillOpacity={0.4}
          >
            SCROLL
          </Text>
        </Float>
      </group>
    </group>
  );
}
