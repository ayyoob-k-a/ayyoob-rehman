'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import * as THREE from 'three';

const R = 150;

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const springX = useSpring(useMotionValue(-999), { stiffness: 140, damping: 22, mass: 0.5 });
  const springY = useSpring(useMotionValue(-999), { stiffness: 140, damping: 22, mass: 0.5 });

  useEffect(() => {
    const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Three.js — untouched
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 65;

    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 170;
      positions[i + 1] = (Math.random() - 0.5) * 170;
      positions[i + 2] = (Math.random() - 0.5) * 110;
      colors[i] = colors[i + 1] = colors[i + 2] = 0.07;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.13, vertexColors: true, transparent: true, opacity: 0.38 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y = mx * 0.12 + 0.0001;
      particles.rotation.x = my * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    springX.set(e.clientX - rect.left);
    springY.set(e.clientY - rect.top);
  };

  // Premium letter animation — bloom up from below, blur clears, slight overshoot
  const letters = Array.from('PORTFOLIO');

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Michroma&family=Inter:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #fff; }

        .hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #fff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        canvas.bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .name-bar {
          font-family: 'Michroma', sans-serif;
          background: #000;
          color: #fff;
          padding: 14px 48px;
          font-size: clamp(1.2rem, 2.5vw, 2.2rem);
          letter-spacing: 0.14em;
          margin-bottom: 1.8rem;
          display: inline-block;
        }

        .title-row {
          display: block;
          font-family: 'Michroma', sans-serif;
          font-size: clamp(5rem, 13vw, 13rem);
          font-weight: 700;
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: #000;
          white-space: nowrap;
          cursor: default;
        }

        .letter {
          display: inline-block;
          transform-origin: 50% 100%;
          will-change: transform, opacity, filter;
        }

        .subtitle {
          font-family: 'Michroma', sans-serif;
          font-size: clamp(0.85rem, 2vw, 1.4rem);
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: #000;
          margin-top: 1.4rem;
        }

        /* SVG overlay fills entire screen */
        .spotlight-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 5;
          pointer-events: none;
        }

        /* Veil overlay — blurs everything outside circle */
        .veil {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          backdrop-filter: blur(3px) brightness(0.92);
          -webkit-backdrop-filter: blur(3px) brightness(0.92);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-hint {
          position: absolute;
          bottom: 6vh;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.35em;
          color: #555;
          z-index: 3;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hero"
        onMouseMove={handleMouseMove}
      >
        <canvas ref={canvasRef} className="bg" />

        {/* ── BASE CONTENT ── */}
        <div className="content">
          <motion.div
            className="name-bar"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            AYYOOB REHMAN
          </motion.div>

          <h1
            className="title-row"
            onMouseEnter={() => setIsTextHovered(true)}
            onMouseLeave={() => setIsTextHovered(false)}
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                className="letter"
                initial={{ opacity: 0, y: 80, scaleY: 0.7, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.4,
                  delay: 0.35 + i * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            MOBILE APP DEVELOPER
          </motion.p>
        </div>

        {/* ── VEIL (dim + blur outside circle) — only when text hovered ── */}
        <motion.div
          className="veil"
          animate={{ opacity: isTextHovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            // Punch a hole where the spotlight is using CSS mask
            maskImage: useTransform(
              [springX, springY],
              ([x, y]: number[]) =>
                `radial-gradient(circle ${R + 20}px at ${x}px ${y}px, transparent 0%, transparent 55%, black 85%)`
            ),
            WebkitMaskImage: useTransform(
              [springX, springY],
              ([x, y]: number[]) =>
                `radial-gradient(circle ${R + 20}px at ${x}px ${y}px, transparent 0%, transparent 55%, black 85%)`
            ),
          }}
        />

        {/* ── INVERTED SPOTLIGHT (black circle, white text) ── */}
        {dimensions.w > 0 && (
          <svg
            className="spotlight-svg"
            viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
            preserveAspectRatio="none"
            style={{ opacity: isTextHovered ? 1 : 0, transition: 'opacity 0.45s ease' }}
          >
            <defs>
              {/* Soft feathered circle clip */}
              <radialGradient id="spotGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="65%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="spotMask">
                <motion.circle
                  style={{ cx: springX, cy: springY }}
                  r={R}
                  fill="url(#spotGrad)"
                />
              </mask>
            </defs>

            {/* Black fill — masked to circle */}
            <rect width={dimensions.w} height={dimensions.h} fill="#000" mask="url(#spotMask)" />

            {/* White "PORTFOLIO" text — masked to same circle */}
            <g mask="url(#spotMask)">
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#fff"
                fontFamily="Michroma, sans-serif"
                fontWeight="700"
                fontSize={`clamp(5rem, 13vw, 13rem)`}
                letterSpacing="-0.04em"
                style={{ userSelect: 'none' }}
              >
                PORTFOLIO
              </text>
            </g>
          </svg>
        )}

        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          SCROLL TO EXPLORE ↓
        </motion.div>
      </section>
    </>
  );
}
