"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HeroLighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.SpotLight>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);
  const pointLight3Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (keyLightRef.current) {
      keyLightRef.current.position.x = Math.sin(time * 0.2) * 15;
      keyLightRef.current.position.z = Math.cos(time * 0.2) * 15;
    }
    if (rimLightRef.current) {
      rimLightRef.current.position.x = Math.sin(time * 0.3 + 2) * 12;
      rimLightRef.current.position.z = Math.cos(time * 0.3 + 2) * 12;
    }
    if (pointLight1Ref.current) {
      pointLight1Ref.current.position.x = Math.sin(time * 0.5) * 10;
      pointLight1Ref.current.position.y = Math.cos(time * 0.4) * 8 + 2;
      pointLight1Ref.current.position.z = Math.sin(time * 0.3) * 10;
    }
    if (pointLight2Ref.current) {
      pointLight2Ref.current.position.x = Math.sin(time * 0.4 + 1.5) * 12;
      pointLight2Ref.current.position.y = Math.cos(time * 0.5 + 1) * 6 - 1;
      pointLight2Ref.current.position.z = Math.cos(time * 0.35 + 1) * 12;
    }
    if (pointLight3Ref.current) {
      pointLight3Ref.current.position.x = Math.sin(time * 0.6 + 3) * 8;
      pointLight3Ref.current.position.y = Math.cos(time * 0.3 + 2) * 10 + 3;
      pointLight3Ref.current.position.z = Math.sin(time * 0.45 + 2) * 8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} color={0x78f0ff} />
      
      <directionalLight
        ref={keyLightRef}
        position={[10, 8, 10]}
        intensity={2.5}
        color={0x78f0ff}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <directionalLight
        position={[-8, -4, -6]}
        intensity={1.2}
        color={0x7c5cff}
      />
      
      <spotLight
        ref={rimLightRef}
        position={[-5, 10, -8]}
        angle={0.6}
        penumbra={0.5}
        intensity={3}
        color={0xff8a5b}
        distance={50}
      />
      
      <pointLight ref={pointLight1Ref} position={[5, 3, 5]} intensity={0.8} color={0x78f0ff} distance={30} />
      <pointLight ref={pointLight2Ref} position={[-5, -2, 5]} intensity={0.6} color={0x7c5cff} distance={30} />
      <pointLight ref={pointLight3Ref} position={[0, 6, -5]} intensity={0.7} color={0xff8a5b} distance={30} />
    </>
  );
}
