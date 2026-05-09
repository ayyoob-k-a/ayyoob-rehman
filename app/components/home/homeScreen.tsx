"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface HomeScreenProps {
  scrollProgress?: number;
}

export default function HomeScreen({ scrollProgress = 0 }: HomeScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 60;

    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 180;
      positions[i + 1] = (Math.random() - 0.5) * 180;
      positions[i + 2] = (Math.random() - 0.5) * 120;
      colors[i] = Math.random() * 0.5 + 0.3;
      colors[i + 1] = Math.random() * 0.5 + 0.3;
      colors[i + 2] = Math.random() * 0.5 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });

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
      particles.rotation.y = mx * 0.08 + scrollProgress * 0.5;
      particles.rotation.x = my * 0.06;
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
  }, [scrollProgress]);

  const nameLetters = Array.from("AYYOOB REHMAN");
  const techStack = [
    "FLUTTER", "DART", "NEXT.JS", "REACT NATIVE",
    "FIREBASE", "NODE.JS", "TYPESCRIPT",
    "REST APIs", "UI/UX DESIGN", "STATE MANAGEMENT"
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Michroma:wght@400;700&display=swap');

        .home-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          color: #ffffff;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 5vw;
        }

        .home-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.6;
        }

        .home-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        .greeting {
          font-family: 'Michroma', sans-serif;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          opacity: 0.9;
          background: linear-gradient(135deg, #fff, #a0a0a0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .home-name {
          font-family: 'Michroma', sans-serif;
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }

        .home-title {
          font-family: 'Michroma', sans-serif;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          color: #6c63ff;
        }

        .home-description {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          line-height: 1.6;
          max-width: 700px;
          opacity: 0.88;
          margin-bottom: 2rem;
        }

        .section-title {
          font-family: 'Michroma', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.1em;
          margin: 2rem 0 1rem;
          color: #6c63ff;
        }

        .tech-stack-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
        }

        .tech-item {
          font-family: 'Michroma', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          padding: 0.5rem 1rem;
          background: rgba(108, 99, 255, 0.1);
          border: 1px solid rgba(108, 99, 255, 0.3);
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          background: rgba(108, 99, 255, 0.2);
          transform: translateY(-2px);
        }

        .name-letter {
          display: inline-block;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <section className="home-screen">
        <canvas ref={canvasRef} className="home-canvas" />

        <div className="home-content">
          <motion.div
            className="greeting floating"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            HELLO, I AM
          </motion.div>

          <motion.h1 
            className="home-name"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {nameLetters.map((char, i) => (
              <motion.span
                key={i}
                className="name-letter"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.03,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="home-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            MOBILE APP DEVELOPER
          </motion.div>

          <motion.p
            className="home-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I am a passionate Flutter developer with expertise in building 
            high-performance, beautiful, and user-centric mobile applications. 
            With a strong foundation in clean architecture and modern UI/UX principles, 
            I transform ideas into scalable digital experiences.
          </motion.p>

          <motion.div
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            CURRENTLY CRAFTING
          </motion.div>

          <motion.p
            className="home-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
          >
            Cross-platform mobile solutions using Flutter &amp; Dart, 
            modern web applications with Next.js, and delightful user interfaces 
            that users love to interact with.
          </motion.p>

          <motion.div
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          >
            TECH STACK
          </motion.div>

          <motion.div 
            className="tech-stack-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                className="tech-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}