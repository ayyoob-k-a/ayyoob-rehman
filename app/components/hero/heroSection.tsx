'use client';

import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        background: '#FFFFFF',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Background Abstract Drawing */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0.15,
        }}
        viewBox="0 0 1200 800"
      >
        {/* ... existing paths ... */}
      </svg>

      {/* YOUR IMAGE */}
      <div
        style={{
          position: 'absolute',
          zIndex: 15,
          width: 'clamp(420px, 52vw, 780px)',
          height: 'clamp(620px, 92vh, 920px)',
          bottom: '-40px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(140px)',
          transition: 'all 1.4s cubic-bezier(0.23, 1, 0.32, 1)', // Slower
        }}
      >
        <img
          src="/ayyoob.png"
          alt="Ayyoob"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'grayscale(100%) contrast(1.15)',
          }}
        />
      </div>

      {/* Giant Text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          userSelect: 'none',
          padding: '0 2vw',
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontSize: 'clamp(4.2rem, 15vw, 13rem)',
            fontWeight: 900,
            lineHeight: 0.82,
            letterSpacing: '-0.06em',
            color: '#111',
            whiteSpace: 'nowrap',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(80px)',
            transition: 'all 1.1s cubic-bezier(0.23, 1, 0.32, 1) 150ms',
          }}
        >
          I&rsquo;M A SENIOR
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontSize: 'clamp(4.2rem, 15vw, 13rem)',
            fontWeight: 900,
            lineHeight: 0.82,
            letterSpacing: '-0.06em',
            color: '#111',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(80px)',
            transition: 'all 1.1s cubic-bezier(0.23, 1, 0.32, 1) 350ms',
          }}
        >
          FLUTTER
        </div>

        {/* Line 3 */}
        <div
          style={{
            fontSize: 'clamp(4.2rem, 15vw, 13rem)',
            fontWeight: 900,
            lineHeight: 0.82,
            display: 'flex',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(80px)',
            transition: 'all 1.1s cubic-bezier(0.23, 1, 0.32, 1) 550ms',
          }}
        >
          <span>DE</span>
          <span
            style={{
              color: 'transparent',
              WebkitTextStroke: '3px #111',
            }}
          >
            VELOP
          </span>
          <span>ER</span>
        </div>
      </div>

      {/* Red X - Now Behind the Text */}
      <div
        style={{
          position: 'absolute',
          left: '12%',
          top: '18%',
          width: 'clamp(200px, 26vw, 380px)',
          height: 'clamp(200px, 26vw, 380px)',
          zIndex: 5,                    // ← Now behind text
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-15deg)',
          transition: 'all 1.3s cubic-bezier(0.23, 1, 0.32, 1) 400ms',
        }}
      >
        <svg viewBox="0 0 200 200">
          <g transform="translate(100,100)">
            <rect
              x="-100"
              y="-26"
              width="200"
              height="52"
              rx="5"
              fill="#E10600"
              transform="rotate(45)"
            />
            <rect
              x="-26"
              y="-100"
              width="52"
              height="200"
              rx="5"
              fill="#E10600"
              transform="rotate(45)"
            />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;