import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'develop'
  const [clickFlash, setClickFlash] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('.home-page')) {
        setCursorState('develop');
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.project-card')) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = () => {
      setClickFlash(true);
      setTimeout(() => setClickFlash(false), 150);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const isDevelop = cursorState === 'develop';
  const developColor = '#00ff00'; // Επαναφορά σε ανοιχτό πράσινο

  return (
    <>
      <motion.div
        className="cursor"
        animate={{
          x: mousePosition.x - (cursorState === 'default' ? 12 : 20),
          y: mousePosition.y - (cursorState === 'default' ? 12 : 20),
          width: cursorState === 'default' ? 24 : 40,
          height: cursorState === 'default' ? 24 : 40,
          borderColor: isDevelop ? developColor : 'white',
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          borderRadius: '50%',
          border: '1px solid',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: isDevelop ? 'normal' : 'difference'
        }}
      >
        {/* Center cross/dot */}
        <div style={{
          width: 4,
          height: 4,
          backgroundColor: isDevelop ? developColor : 'white',
          borderRadius: '50%'
        }} />
        
        {/* Viewfinder lines */}
        <div style={{ position: 'absolute', top: -5, left: '50%', width: 1, height: 4, backgroundColor: isDevelop ? developColor : 'white' }} />
        <div style={{ position: 'absolute', bottom: -5, left: '50%', width: 1, height: 4, backgroundColor: isDevelop ? developColor : 'white' }} />
        <div style={{ position: 'absolute', left: -5, top: '50%', width: 4, height: 1, backgroundColor: isDevelop ? developColor : 'white' }} />
        <div style={{ position: 'absolute', right: -5, top: '50%', width: 4, height: 1, backgroundColor: isDevelop ? developColor : 'white' }} />

        {/* Develop Hint Text */}
        <AnimatePresence>
          {isDevelop && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                position: 'absolute',
                top: '50px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: developColor,
                fontWeight: 'bold',
                letterSpacing: '2px',
                whiteSpace: 'nowrap'
              }}
            >
              [ CLICK_TO_DEVELOP ]
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Global Click Flash */}
      <AnimatePresence>
        {clickFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'white',
              zIndex: 99998,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
