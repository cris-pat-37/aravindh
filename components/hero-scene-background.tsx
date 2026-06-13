"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Pointer = {
  x: number;
  y: number;
};

export default function HeroSceneBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      1000,
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const pointer: Pointer = { x: 0, y: 0 };
    const particleCount = 1100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let index = 0; index < particleCount; index += 1) {
      const stride = index * 3;
      positions[stride] = (Math.random() - 0.5) * 44;
      positions[stride + 1] = (Math.random() - 0.5) * 24;
      positions[stride + 2] = (Math.random() - 0.5) * 18;
      scales[index] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0x8ceeff,
      size: 0.09,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const orbGeometry = new THREE.IcosahedronGeometry(3.4, 1);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0x6b5bff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(8, -2, -8);
    scene.add(orb);

    const ambient = new THREE.AmbientLight(0xbcdfff, 1.4);
    scene.add(ambient);

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    };

    const handleResize = () => {
      if (!mount) {
        return;
      }

      camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    mount.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);

    let frame = 0;

    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      particles.rotation.y += 0.0009;
      particles.rotation.x += 0.00035;
      particles.position.x += (pointer.x * 1.1 - particles.position.x) * 0.02;
      particles.position.y += (pointer.y * 0.8 - particles.position.y) * 0.02;

      orb.rotation.x += 0.0035;
      orb.rotation.y += 0.0045;
      orb.position.x += ((6.5 + pointer.x * 2.4) - orb.position.x) * 0.04;
      orb.position.y += ((-1 + pointer.y * 1.8) - orb.position.y) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      mount.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
