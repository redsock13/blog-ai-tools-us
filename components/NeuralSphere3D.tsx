"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const count = 1800;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pos[i * 3] = Math.cos(theta) * radius * 1.8;
      pos[i * 3 + 1] = y * 1.8;
      pos[i * 3 + 2] = Math.sin(theta) * radius * 1.8;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      // indigo at poles, purple at equator
      const r = 0.4 + t * 0.3;
      const g = 0.24 + t * 0.1;
      const b = 0.9 + t * 0.1;
      cols[i * 3] = r;
      cols[i * 3 + 1] = g;
      cols[i * 3 + 2] = b;
    }
    return cols;
  }, []);

  // Build line segments between nearby particles
  const linePositions = useMemo(() => {
    const lines: number[] = [];
    const threshold = 0.6;
    for (let i = 0; i < count; i += 8) {
      for (let j = i + 1; j < Math.min(i + 20, count); j++) {
        const dx = positions[i*3] - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < threshold) {
          lines.push(positions[i*3], positions[i*3+1], positions[i*3+2]);
          lines.push(positions[j*3], positions[j*3+1], positions[j*3+2]);
        }
      }
    }
    return new Float32Array(lines);
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.15;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    // Breathing scale
    const scale = 1 + Math.sin(t * 1.2) * 0.04;
    pointsRef.current.scale.setScalar(scale);
    if (lineRef.current) {
      lineRef.current.rotation.y = t * 0.15;
      lineRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
      lineRef.current.scale.setScalar(scale);
      // Pulse line opacity
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.1 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} vertexColors transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.12} />
      </lineSegments>
      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

export default function NeuralSphere3D() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} color="#6366f1" intensity={2} />
        <pointLight position={[-4, -4, 2]} color="#a855f7" intensity={1.5} />
        <NeuralParticles />
      </Canvas>
    </div>
  );
}
