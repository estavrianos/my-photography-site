import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onNext, onPrev]);

  if (currentIndex === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.95)',
          zIndex: 100000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none'
        }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            zIndex: 100001,
            padding: '10px'
          }}
        >
          ✕
        </button>

        {/* Navigation Arrows - Hidden on mobile, use swipe/tap later if needed, but keeping them small/safe */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="nav-arrow prev"
          style={{
            position: 'absolute',
            left: '10px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2.5rem',
            cursor: 'pointer',
            zIndex: 100001,
            padding: '10px',
            opacity: 0.5
          }}
        >
          ←
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="nav-arrow next"
          style={{
            position: 'absolute',
            right: '10px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2.5rem',
            cursor: 'pointer',
            zIndex: 100001,
            padding: '10px',
            opacity: 0.5
          }}
        >
          →
        </button>

        {/* Image Container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            maxWidth: '95%',
            maxHeight: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '5px',
            boxShadow: '0 0 50px rgba(0,0,0,0.5)',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={`${window.location.origin}/${images[currentIndex]}`}
            alt={`Gallery ${currentIndex}`}
            style={{
              maxWidth: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />
          
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '0',
            width: '100%',
            textAlign: 'center',
            color: '#888',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem'
          }}>
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
