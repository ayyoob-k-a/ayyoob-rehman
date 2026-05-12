'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TechStackSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 28, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 28, damping: 22 });

  const p1x = useTransform(springX, [-1,1], [-22, 22]);
  const p1y = useTransform(springY, [-1,1], [-12, 12]);
  const p2x = useTransform(springX, [-1,1], [18,-18]);
  const p2y = useTransform(springY, [-1,1], [-9,  9]);
  const p3x = useTransform(springX, [-1,1], [-14, 14]);
  const p3y = useTransform(springY, [-1,1], [ 8, -8]);
  const p4x = useTransform(springX, [-1,1], [10,-10]);
  const p4y = useTransform(springY, [-1,1], [-7,  7]);

  useEffect(() => {
    const h = (e : MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,900;1,6..96,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        .ts-root {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #F5EFE6;
          overflow: hidden;
        }

        /* ─── SVG CLIP BANDS ─── */
        .band {
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          top: 0;
          pointer-events: none;
        }

        /* ─── BAND CONTENT WRAPPERS ─── */
        .band-content {
          position: absolute;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          overflow: visible;
          pointer-events: none;
        }

        /* ─── TYPOGRAPHY ─── */
        .w {
          font-family: 'Bodoni Moda', serif;
          font-weight: 900;
          color: #0a0a0a;
          text-transform: uppercase;
          line-height: 0.86;
          letter-spacing: -0.04em;
          white-space: nowrap;
          user-select: none;
          flex-shrink: 0;
          display: inline-block;
        }

        .w-a { font-size: clamp(90px, 15vw, 200px); }
        .w-b { font-size: clamp(72px, 12vw, 165px); }
        .w-c { font-size: clamp(58px, 9.5vw, 130px); }
        .w-d { font-size: clamp(80px, 13vw, 180px); }

        .wi { font-style: italic; }
        .wo {
          -webkit-text-stroke: 2px #0a0a0a;
          color: transparent;
        }

        /* ─── STICKERS ─── */
        .sticker {
          position: absolute;
          border-radius: 50%;
          background: #FFFAF4;
          border: 1.5px solid #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
          cursor: default;
          box-shadow: 2px 3px 0 #0a0a0a;
        }

        .sticker span {
          font-family: 'Michroma', sans-serif;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          color: #0a0a0a;
          line-height: 1.6;
          padding: 8px;
        }

        /* ─── DECO ─── */
        .deco-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(10,10,10,0.1);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <div className="ts-root">

        {/* ─── BACKGROUND DECO ─── */}
        <div className="deco-circle" style={{ width:440, height:440, top:'-80px', right:'-100px' }} />
        <div className="deco-circle" style={{ width:220, height:220, bottom:'20px', left:'30px'  }} />
        <div className="deco-circle" style={{ width:90,  height:90,  top:'55vh',   left:'48vw'  }} />

        {/* ════════════════════════════════════
            BAND 1 — TEAL — SVG clip wave
        ════════════════════════════════════ */}
   <motion.div
  style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', x: p1x, y: p1y }}
  initial={{ y: -340 }}
  transition={{ duration: 1.2, delay: 0.0, ease: [0.16,1,0.3,1] }}
>
          <svg className="band" viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="wave1" clipPathUnits="userSpaceOnUse">
                <path d="M-10,38 C180,0 400,70 720,30 C1040,-10 1280,55 1450,20 L1450,255 C1260,300 1020,230 720,265 C420,300 180,240 -10,275 Z"/>
              </clipPath>
            </defs>
            <rect x="-10" y="0" width="1470" height="900" fill="#B9DFDC" clipPath="url(#wave1)"/>
          </svg>

          <div className="band-content" style={{ top:'4vh', height:'27vh' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'5vw', paddingLeft:'3vw', transform:'rotate(-2deg)' }}>
              <span className="w w-a">FLUTTER</span>
              <span className="w w-b wi wo">DART</span>
              <span className="w w-c">GOLANG</span>
              <span className="w w-b wi" style={{ opacity:0.22, marginLeft:'2vw' }}>MOBILE</span>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════
            BAND 2 — LAVENDER — deeper wave
        ════════════════════════════════════ */}
        <motion.div
          style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', x: p2x, y: p2y }}
          initial={{ y: 360 }}
          transition={{ duration: 1.2, delay: 0.18, ease: [0.16,1,0.3,1] }}
        >
          <svg className="band" viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="wave2" clipPathUnits="userSpaceOnUse">
                <path d="M-10,215 C120,185 380,255 700,210 C1020,165 1300,230 1450,195 L1450,450 C1310,490 1050,425 720,465 C390,505 130,445 -10,475 Z"/>
              </clipPath>
            </defs>
            <rect x="-10" y="0" width="1470" height="900" fill="#CFC6F2" clipPath="url(#wave2)"/>
          </svg>

          <div className="band-content" style={{ top:'26vh', height:'26vh' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'4vw', paddingLeft:'0', justifyContent:'flex-end', paddingRight:'3vw', width:'100%', transform:'rotate(-1.5deg)' }}>
              <span className="w w-c wi" style={{ opacity:0.25 }}>BLOC</span>
              <span className="w w-c wo wi">NEXT.JS</span>
              <span className="w w-a">FIREBASE</span>
              <span className="w w-b wi">BLOC</span>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════
            BAND 3 — CORAL — asymmetric wave
        ════════════════════════════════════ */}
        <motion.div
          style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', x: p3x, y: p3y }}
          initial={{ y: -300 }}
          transition={{ duration: 1.2, delay: 0.34, ease: [0.16,1,0.3,1] }}
        >
          <svg className="band" viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="wave3" clipPathUnits="userSpaceOnUse">
                <path d="M-10,430 C200,400 480,468 760,425 C1040,382 1280,448 1450,415 L1450,670 C1240,712 980,648 700,688 C420,728 190,668 -10,695 Z"/>
              </clipPath>
            </defs>
            <rect x="-10" y="0" width="1470" height="900" fill="#F58A96" clipPath="url(#wave3)"/>
          </svg>

          <div className="band-content" style={{ top:'50vh', height:'26vh' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'5vw', paddingLeft:'4vw', transform:'rotate(-2.2deg)' }}>
              <span className="w w-d">REST API</span>
              <span className="w w-b wi wo">RIVERPOD</span>
              <span className="w w-c">CI/CD</span>
              <span className="w w-c wi" style={{ opacity:0.2 }}>DOCKER</span>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════
            BAND 4 — YELLOW — bottom wave
        ════════════════════════════════════ */}
        <motion.div
          style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', x: p4x, y: p4y }}
          initial={{ y: 320 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16,1,0.3,1] }}
        >
          <svg className="band" viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="wave4" clipPathUnits="userSpaceOnUse">
                <path d="M-10,650 C160,622 420,690 740,648 C1060,606 1300,668 1450,638 L1450,920 C1300,920 1060,920 740,920 C420,920 160,920 -10,920 Z"/>
              </clipPath>
            </defs>
            <rect x="-10" y="0" width="1470" height="900" fill="#E8D27A" clipPath="url(#wave4)"/>
          </svg>

          <div className="band-content" style={{ top:'74vh', height:'24vh' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'4vw', justifyContent:'flex-end', paddingRight:'4vw', width:'100%', transform:'rotate(-1.8deg)' }}>
              <span className="w w-c wi wo">DOCKER</span>
              <span className="w w-d">MOBILE</span>
              <span className="w w-b wi">CROSS PLATFORM</span>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════
            STICKERS
        ════════════════════════════════════ */}
        <motion.div
          className="sticker"
          style={{ width:112, height:112, top:'20vh', left:'46vw', zIndex:30 }}
          initial={{ scale:0, rotate:-28 }}
          animate={{ scale:1, rotate:15 }}
          transition={{ duration:0.8, delay:1.15, ease:[0.16,1,0.3,1] }}
          whileHover={{ scale:1.1, rotate:0, transition:{duration:0.3} }}
        >
          <span>Senior<br/>Flutter<br/>Dev</span>
        </motion.div>

        <motion.div
          className="sticker"
          style={{ width:96, height:96, top:'44vh', left:'12vw', zIndex:30 }}
          initial={{ scale:0, rotate:24 }}
          animate={{ scale:1, rotate:-11 }}
          transition={{ duration:0.8, delay:1.3, ease:[0.16,1,0.3,1] }}
          whileHover={{ scale:1.1, rotate:0, transition:{duration:0.3} }}
        >
          <span>Open<br/>to Work</span>
        </motion.div>

        <motion.div
          className="sticker"
          style={{ width:100, height:100, top:'67vh', right:'10vw', zIndex:30 }}
          initial={{ scale:0, rotate:-20 }}
          animate={{ scale:1, rotate:9 }}
          transition={{ duration:0.8, delay:1.45, ease:[0.16,1,0.3,1] }}
          whileHover={{ scale:1.1, rotate:0, transition:{duration:0.3} }}
        >
          <span>Kerala<br/>India</span>
        </motion.div>

      </div>
    </>
  );
}