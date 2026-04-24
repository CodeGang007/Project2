'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Subtle 3D particle network, themed as molecular bonds.
 * - ~120 nodes, lines drawn only for neighbours within a radius → performant.
 * - Slow auto-rotation + gentle mouse parallax.
 * - Pauses when tab is hidden; disabled entirely under prefers-reduced-motion.
 *
 * Mounted inside the hero via a dynamic import (ssr:false) so server render
 * is zero-cost and the three.js bundle never ships on inner pages.
 */
export default function MolecularNetwork({
  color = '#ffffff',
  className = ''
}: {
  color?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Adapt particle count to viewport — keeps mobile responsive and fast
    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 60 : 120;
    const RADIUS = 18; // bond distance

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 55);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'low-power'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // --- Nodes (particles) ---
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        )
      );
    }

    const nodeGeom = new THREE.BufferGeometry();
    nodeGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const nodeMat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.35,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const points = new THREE.Points(nodeGeom, nodeMat);
    group.add(points);

    // --- Lines (bonds) ---
    // Allocate max possible line buffer; use drawRange to mask unused.
    const MAX_LINE_VERTS = NODE_COUNT * NODE_COUNT; // upper bound
    const linePositions = new Float32Array(MAX_LINE_VERTS * 3);
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.18
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    group.add(lines);

    // --- Animation ---
    let mouseX = 0;
    let mouseY = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouseY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    el.addEventListener('pointermove', onMove);

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running) tick();
    };
    document.addEventListener('visibilitychange', onVis);

    function tick() {
      if (!running) return;
      raf = requestAnimationFrame(tick);

      // Update nodes
      const p = nodeGeom.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < NODE_COUNT; i++) {
        const v = velocities[i];
        let x = p.getX(i) + v.x;
        let y = p.getY(i) + v.y;
        let z = p.getZ(i) + v.z;
        if (x > 32 || x < -32) v.x *= -1;
        if (y > 22 || y < -22) v.y *= -1;
        if (z > 22 || z < -22) v.z *= -1;
        p.setXYZ(i, x, y, z);
      }
      p.needsUpdate = true;

      // Update bonds
      let idx = 0;
      const R2 = RADIUS * RADIUS;
      for (let i = 0; i < NODE_COUNT; i++) {
        const ax = p.getX(i);
        const ay = p.getY(i);
        const az = p.getZ(i);
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = ax - p.getX(j);
          const dy = ay - p.getY(j);
          const dz = az - p.getZ(j);
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < R2) {
            linePositions[idx++] = ax;
            linePositions[idx++] = ay;
            linePositions[idx++] = az;
            linePositions[idx++] = p.getX(j);
            linePositions[idx++] = p.getY(j);
            linePositions[idx++] = p.getZ(j);
          }
        }
      }
      lineGeom.setDrawRange(0, idx / 3);
      (lineGeom.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;

      // Camera parallax + slow rotation
      const targetX = mouseX * 3;
      const targetY = -mouseY * 2;
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      group.rotation.y += reduce ? 0 : 0.0008;
      group.rotation.x += reduce ? 0 : 0.0003;

      renderer.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      el.removeEventListener('pointermove', onMove);
      el.removeChild(renderer.domElement);
      renderer.dispose();
      nodeGeom.dispose();
      lineGeom.dispose();
      nodeMat.dispose();
      lineMat.dispose();
    };
  }, [color]);

  return <div ref={containerRef} aria-hidden className={className} />;
}
