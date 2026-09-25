'use client';

import React, { useEffect, useRef } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

export interface GalleryItem {
  image: string;
  text: string;
}

export interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollEase?: number;
  className?: string;
}

function createTextTexture(gl: any, text: string, font = 'bold 30px sans-serif', color = '#111111') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return new Texture(gl);

  canvas.width = 512;
  canvas.height = 128;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return texture;
}

export function CircularGallery({
  items,
  bend = 3,
  textColor = '#111111',
  borderRadius = 0.05,
  font = 'bold 28px Inter, system-ui, sans-serif',
  scrollEase = 0.02,
  className = '',
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    // 1. Setup OGL Renderer
    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.userSelect = 'none';
    canvas.style.cursor = 'grab';
    container.appendChild(canvas);

    // 2. Camera & Scene
    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 20;

    const scene = new Transform();

    // 3. Shaders
    const vertexShader = `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform sampler2D tMap;
      uniform float uBorderRadius;
      varying vec2 vUv;

      float roundedBoxSDF(vec2 p, vec2 b, float r) {
        vec2 d = abs(p) - b + vec2(r);
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
      }

      void main() {
        vec2 p = vUv - vec2(0.5);
        float d = roundedBoxSDF(p, vec2(0.5), uBorderRadius);
        if (d > 0.0) discard;
        vec4 color = texture2D(tMap, vUv);
        gl_FragColor = color;
      }
    `;

    const textFragmentShader = `
      precision highp float;
      uniform sampler2D tMap;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(tMap, vUv);
        gl_FragColor = color;
      }
    `;

    const planeGeometry = new Plane(gl, { width: 4.8, height: 6.2 });
    const textPlaneGeometry = new Plane(gl, { width: 4.8, height: 1.2 });

    // 4. Create Meshes for each item
    interface GalleryMeshItem {
      mesh: Mesh;
      textMesh: Mesh;
      baseAngle: number;
    }

    const totalItems = items.length;
    const angleStep = (Math.PI * 2) / totalItems;
    const radius = Math.max(12, totalItems * 1.5 * (bend / 3));

    const galleryMeshes: GalleryMeshItem[] = items.map((item, index) => {
      // Texture
      const texture = new Texture(gl, { generateMipmaps: true });
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = item.image;
      img.onload = () => {
        texture.image = img;
      };

      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          tMap: { value: texture },
          uBorderRadius: { value: borderRadius },
        },
        transparent: true,
        cullFace: false,
      });

      const mesh = new Mesh(gl, { geometry: planeGeometry, program });
      mesh.setParent(scene);

      // Text Texture & Mesh
      const textTexture = createTextTexture(gl, item.text, font, textColor);
      const textProgram = new Program(gl, {
        vertex: vertexShader,
        fragment: textFragmentShader,
        uniforms: {
          tMap: { value: textTexture },
        },
        transparent: true,
        cullFace: false,
      });

      const textMesh = new Mesh(gl, { geometry: textPlaneGeometry, program: textProgram });
      textMesh.setParent(scene);

      return {
        mesh,
        textMesh,
        baseAngle: index * angleStep,
      };
    });

    // 5. Interaction & Scrolling
    let isDragging = false;
    let startX = 0;
    let scrollCurrent = 0;
    let scrollTarget = 0;
    let scrollVelocity = 0;

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      canvas.style.cursor = 'grabbing';
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      scrollVelocity = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const delta = (x - startX) * 0.005;
      scrollTarget += delta;
      scrollVelocity = delta;
      startX = x;
    };

    const onPointerUp = () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollTarget -= e.deltaY * 0.0015;
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    canvas.addEventListener('wheel', onWheel, { passive: false });

    // 6. Animation Loop
    let animationFrameId: number;

    const update = () => {
      animationFrameId = requestAnimationFrame(update);

      if (!isDragging) {
        scrollVelocity *= 0.95;
        scrollTarget += scrollVelocity;
      }

      // Smooth Lerp
      scrollCurrent += (scrollTarget - scrollCurrent) * scrollEase;

      // Position meshes around the circular arc
      galleryMeshes.forEach((item) => {
        const angle = item.baseAngle + scrollCurrent;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - radius;
        const rotationY = angle;

        // Main card
        item.mesh.position.set(x, 0, z);
        item.mesh.rotation.y = rotationY;

        // Label below card
        item.textMesh.position.set(x, -3.9, z);
        item.textMesh.rotation.y = rotationY;
      });

      renderer.render({ scene, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      canvas.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      canvas.removeEventListener('wheel', onWheel);

      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [items, bend, textColor, borderRadius, font, scrollEase]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    />
  );
}

export default CircularGallery;
