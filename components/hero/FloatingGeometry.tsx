"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingGeometryProps {
  mouse: { x: number; y: number };
  scrollProgress: number;
  reducedMotion: boolean;
}

export function FloatingGeometry({ mouse, reducedMotion }: FloatingGeometryProps) {
  const torusKnotRef = useRef<THREE.Mesh>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);
  const helixRef = useRef<THREE.Group>(null);
  const dodecahedronRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.x = time * 0.15;
      torusKnotRef.current.rotation.y = time * 0.2;
      torusKnotRef.current.position.x = Math.sin(time * 0.3) * 2.5 + 4;
      torusKnotRef.current.position.y = Math.sin(time * 0.2 + 1) * 1.5 + 1;
      torusKnotRef.current.position.z = Math.cos(time * 0.25) * 2 - 4;
      const mx = mouse.x * 0.6;
      const my = mouse.y * 0.4;
      torusKnotRef.current.position.x += mx;
      torusKnotRef.current.position.y -= my;
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = time * 0.2 + 0.5;
      icosahedronRef.current.rotation.y = time * 0.25;
      icosahedronRef.current.position.x = Math.sin(time * 0.25 + 2) * 3 - 3.5;
      icosahedronRef.current.position.y = Math.cos(time * 0.3 + 1) * 1.8 - 1.5;
      icosahedronRef.current.position.z = Math.sin(time * 0.2 + 1) * 2 - 3;
      const mx = mouse.x * 0.5;
      const my = mouse.y * 0.3;
      icosahedronRef.current.position.x += mx;
      icosahedronRef.current.position.y -= my;
      
      const pulse = 1 + Math.sin(time * 1.5) * 0.05;
      icosahedronRef.current.scale.setScalar(pulse);
    }

    if (helixRef.current) {
      helixRef.current.rotation.y = time * 0.1;
      helixRef.current.position.x = Math.sin(time * 0.2 + 3) * 1.5;
      helixRef.current.position.y = Math.cos(time * 0.15 + 2) * 1 + 2;
      helixRef.current.position.z = 2;
      
      helixRef.current.children.forEach((child, i) => {
        child.rotation.x = time * (0.5 + i * 0.1);
        child.rotation.z = time * (0.3 + i * 0.1);
      });
    }

    if (dodecahedronRef.current) {
      dodecahedronRef.current.rotation.x = Math.sin(time * 0.18) * 0.5;
      dodecahedronRef.current.rotation.y = time * 0.22;
      dodecahedronRef.current.position.x = Math.sin(time * 0.35 + 4) * 3.5;
      dodecahedronRef.current.position.y = Math.sin(time * 0.25 + 2) * 2.5 + 3;
      dodecahedronRef.current.position.z = Math.cos(time * 0.3 + 2) * 2 + 1;
    }
  });

  return (
    <group>
      {/* Torus Knot - iridescent glass */}
      <mesh ref={torusKnotRef} position={[4, 1, -4]}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.5}
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.3}
          color={"#78f0ff"}
          attenuationColor={"#7c5cff"}
          attenuationDistance={0.5}
        />
      </mesh>

      {/* Icosahedron - distorting wireframe */}
      <mesh ref={icosahedronRef} position={[-3.5, -1.5, -3]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <MeshDistortMaterial
          color={"#7c5cff"}
          emissive={"#78f0ff"}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          distort={0.15}
          speed={2}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Dodecahedron - glowing */}
      <mesh ref={dodecahedronRef} position={[0, 3, 1]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshPhysicalMaterial
          color={"#ff8a5b"}
          emissive={"#ff8a5b"}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.3}
          transparent
          opacity={0.7}
          wireframe={false}
        />
      </mesh>

      {/* Helix group - floating rings */}
      <group ref={helixRef} position={[0, 2, 2]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.6 - 2.4, 0]} rotation={[0, i * 0.8, i * 0.4]}>
            <torusGeometry args={[0.5 + i * 0.05, 0.03, 16, 32]} />
            <meshPhysicalMaterial
              color={i % 2 === 0 ? "#78f0ff" : "#7c5cff"}
              emissive={i % 2 === 0 ? "#78f0ff" : "#7c5cff"}
              emissiveIntensity={0.2}
              transparent
              opacity={0.4 + i * 0.07}
              roughness={0.1}
              metalness={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
