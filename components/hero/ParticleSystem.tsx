"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { particleVertexShader, particleFragmentShader } from "./shaders/particleShader";

const PARTICLE_COUNT = 5000;

function generateParticleData(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const customColors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const noiseOffsets = new Float32Array(count * 3);

  const colorA = new THREE.Color(0x78f0ff);
  const colorB = new THREE.Color(0x7c5cff);
  const colorC = new THREE.Color(0xff8a5b);

  for (let i = 0; i < count; i++) {
    const stride = i * 3;
    const radius = 15 + Math.random() * 25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[stride] = radius * Math.sin(phi) * Math.cos(theta);
    positions[stride + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[stride + 2] = radius * Math.cos(phi);

    scales[i] = 0.3 + Math.random() * 0.7;

    const colorMix = Math.random();
    let color: THREE.Color;
    if (colorMix < 0.33) {
      color = colorA.clone().lerp(colorB, Math.random());
    } else if (colorMix < 0.66) {
      color = colorB.clone().lerp(colorC, Math.random());
    } else {
      color = colorC.clone().lerp(colorA, Math.random());
    }
    customColors[stride] = color.r;
    customColors[stride + 1] = color.g;
    customColors[stride + 2] = color.b;

    phases[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.5 + Math.random() * 1.5;
    noiseOffsets[stride] = Math.random() * 100;
    noiseOffsets[stride + 1] = Math.random() * 100;
    noiseOffsets[stride + 2] = Math.random() * 100;
  }

  return { positions, scales, customColors, phases, speeds, noiseOffsets };
}

interface ParticleSystemProps {
  progress: number;
  mouse: { x: number; y: number };
  mouseInfluence: number;
  reducedMotion: boolean;
}

export function ParticleSystem({ progress, mouse, mouseInfluence, reducedMotion }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const { camera } = useThree();
  const timeRef = useRef(0);

  const data = useMemo(() => generateParticleData(PARTICLE_COUNT), []);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geom.setAttribute("scale", new THREE.BufferAttribute(data.scales, 1));
    geom.setAttribute("customColor", new THREE.BufferAttribute(data.customColors, 3));
    geom.setAttribute("phase", new THREE.BufferAttribute(data.phases, 1));
    geom.setAttribute("speed", new THREE.BufferAttribute(data.speeds, 1));
    geom.setAttribute("noiseOffset", new THREE.BufferAttribute(data.noiseOffsets, 3));
    return geom;
  }, [data]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: 1 },
        uCameraPosition: { value: new THREE.Vector3() },
      },
    });
  }, []);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const u = (meshRef.current?.material as THREE.ShaderMaterial)?.uniforms;
    if (!u) return;
    timeRef.current = clock.getElapsedTime();
    u.uTime.value = timeRef.current;
    u.uProgress.value = progress;
    u.uMouse.value.set(mouse.x, mouse.y);
    u.uMouseInfluence.value = mouseInfluence;
    u.uCameraPosition.value.copy(camera.position);
  });

  return (
    <points ref={meshRef} geometry={geometry} material={material} />
  );
}
