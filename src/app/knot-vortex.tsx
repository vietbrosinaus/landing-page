"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export default function KnotVortex() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const cameraSize = 10;
    const camera = new THREE.OrthographicCamera(
      -cameraSize / 2,
      cameraSize / 2,
      cameraSize / 2,
      -cameraSize / 2,
      0.1,
      100,
    );
    camera.position.set(0, 0, 17.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const environment = new RoomEnvironment();
    const environmentGenerator = new THREE.PMREMGenerator(renderer);
    const environmentTarget = environmentGenerator.fromScene(environment, 0.04);
    environmentGenerator.dispose();
    scene.environment = environmentTarget.texture;

    const group = new THREE.Group();
    group.rotation.set(0, 0, 0);
    group.position.x = 0.6;
    scene.add(group);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x171719,
      metalness: 0.82,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      reflectivity: 1,
      envMapIntensity: 1.35,
      sheen: 0.12,
      sheenColor: new THREE.Color(0xffffff),
      sheenRoughness: 0.12,
    });

    // One continuous sculptural form reads more like the original Spline piece
    // than several unrelated knots layered on top of each other.
    const geometry = new THREE.TorusKnotGeometry(1.72, 0.3, 360, 36, 3, 5);
    const knot = new THREE.Mesh(geometry, material);
    knot.scale.set(1.08, 1.08, 1.08);
    group.add(knot);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x111111, 2.8));

    const fill = new THREE.PointLight(0xffffff, 52, 14, 1.8);
    fill.position.set(3.5, -1.5, 4.5);
    scene.add(fill);

    const white = new THREE.DirectionalLight(0xffffff, 5.5);
    white.position.set(-3, 4, 5);
    scene.add(white);

    const rim = new THREE.PointLight(0x888888, 34, 12, 1.8);
    rim.position.set(-3, -2, 1);
    scene.add(rim);

    const applyMaterialForTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      material.color.setHex(isDark ? 0x171719 : 0xbfc0c4);
      material.metalness = isDark ? 0.82 : 0.9;
      material.roughness = isDark ? 0.1 : 0.075;
      material.envMapIntensity = isDark ? 1.35 : 1.7;
      renderer.render(scene, camera);
    };

    const themeObserver = new MutationObserver(applyMaterialForTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    applyMaterialForTheme();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      const aspect = width / Math.max(height, 1);
      const desktopLayoutProgress = THREE.MathUtils.clamp(
        (width - 768) / (1224 - 768),
        0,
        1,
      );
      group.position.x = THREE.MathUtils.lerp(1.2, 3.3, desktopLayoutProgress);
      camera.left = (-cameraSize * aspect) / 2;
      camera.right = (cameraSize * aspect) / 2;
      camera.top = cameraSize / 2;
      camera.bottom = -cameraSize / 2;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const startedAt = performance.now();
    let animationFrame = 0;

    const animate = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      group.rotation.x = Math.sin(elapsed * 0.34) * 0.05;
      group.rotation.y = Math.sin(elapsed * 0.27) * 0.07;
      group.rotation.z = Math.sin(elapsed * 0.22) * 0.025;
      group.position.y = Math.sin(elapsed * 0.38) * 0.07;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    if (!prefersReducedMotion) animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      themeObserver.disconnect();
      for (const child of group.children) {
        if (child instanceof THREE.Mesh) child.geometry.dispose();
      }
      material.dispose();
      environment.dispose();
      environmentTarget.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="knot-vortex"
      role="img"
      aria-label="Monochrome chrome 3D knot"
    />
  );
}
