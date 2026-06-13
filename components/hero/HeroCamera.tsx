"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface HeroCameraProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
  reducedMotion: boolean;
}

export function HeroCamera({ mouse, scrollProgress, reducedMotion }: HeroCameraProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 30));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 30));

  useFrame(() => {
    const mx = mouse.x * 2;
    const my = mouse.y * 1.2;

    if (reducedMotion) {
      camera.position.lerp(targetPosition.current, 0.05);
      camera.lookAt(0, 0, 0);
      return;
    }

    targetPosition.current.set(
      mx * 1.5 - scrollProgress * 3,
      -my * 1.2 + scrollProgress * 1.5,
      30 + scrollProgress * 8
    );

    targetLookAt.current.set(
      mx * 0.3,
      -my * 0.3,
      scrollProgress * -2
    );

    currentPosition.current.lerp(targetPosition.current, 0.04);
    camera.position.copy(currentPosition.current);

    const lookTarget = new THREE.Vector3(
      targetLookAt.current.x,
      targetLookAt.current.y,
      targetLookAt.current.z
    );
    camera.lookAt(lookTarget);
  });

  return null;
}
