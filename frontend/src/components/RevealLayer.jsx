import React, { useEffect, useRef, useState } from 'react';

const SPOTLIGHT_R = 260;

export default function RevealLayer({ image, cursorX, cursorY }) {
  const canvasRef = useRef(null);
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Only draw if cursor is on screen
    if (cursorX !== -999 && cursorY !== -999) {
      // Build radial gradient
      const gradient = ctx.createRadialGradient(
        cursorX,
        cursorY,
        0,
        cursorX,
        cursorY,
        SPOTLIGHT_R
      );

      // Stops: 0 -> rgba(255,255,255,1), 0.4 -> 1, 0.6 -> 0.75, 0.75 -> 0.4, 0.88 -> 0.12, 1 -> 0
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.75)');
      gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.88, 'rgba(255, 255, 255, 0.12)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      // Draw arc of radius SPOTLIGHT_R filled with gradient
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fill();
    }

    try {
      const dataUrl = canvas.toDataURL();
      const div = divRef.current;
      if (div) {
        div.style.maskImage = `url(${dataUrl})`;
        div.style.webkitMaskImage = `url(${dataUrl})`;
        div.style.maskSize = '100% 100%';
        div.style.webkitMaskSize = '100% 100%';
        div.style.maskRepeat = 'no-repeat';
        div.style.webkitMaskRepeat = 'no-repeat';
      }
    } catch (err) {
      console.error('Error applying canvas mask:', err);
    }
  }, [cursorX, cursorY, dimensions]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        ref={divRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
    </>
  );
}
