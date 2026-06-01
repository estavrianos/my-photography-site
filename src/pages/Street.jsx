import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import projectsData from '../data/projects.json';
import Lightbox from '../components/Lightbox';

const StreetImage = ({ src, index, onClick }) => {
  const [orientation, setOrientation] = useState('horizontal');
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleLoad({ target: imgRef.current });
    }
  }, []);

  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalHeight > naturalWidth) {
      setOrientation('vertical');
    }
    setIsLoaded(true);
  };

  return (
    <motion.div 
      className="gallery-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.6 }}
      style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
    >
      <div 
        onClick={() => onClick(index)}
        style={{ 
          backgroundColor: 'white', 
          padding: '10px', 
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          width: '100%',
          maxWidth: orientation === 'horizontal' ? '650px' : '400px',
          position: 'relative',
          zIndex: 20,
          cursor: 'zoom-in',
          minHeight: orientation === 'horizontal' ? '250px' : '400px'
        }}
      >
        {!isLoaded && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: '#222', fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}
            >
              LOADING...
            </motion.div>
          </div>
        )}

        <img 
          ref={imgRef}
          src={`${window.location.origin}/${src}`}
          alt={`Street photography in Greece by Stathis Stavrianos - Image ${index + 1}`} 
          onLoad={handleLoad}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
          style={{ 
            display: 'block', 
            width: '100%', 
            height: 'auto',
            maxHeight: '80vh',
            objectFit: 'contain',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease-in'
          }} 
          onError={(e) => {
            console.error("Failed to load image:", e.target.src);
          }}
        />
      </div>
    </motion.div>
  );
};

const Street = () => {
  const streetProject = projectsData.find(p => p.id === 'street');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  if (!streetProject) return <div className="page-container">Archive not found</div>;

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % streetProject.images.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + streetProject.images.length) % streetProject.images.length);

  return (
    <article className="page-container street-page" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
      <header className="street-header" style={{ textAlign: 'left', marginBottom: '4rem' }}>
        <h1 className="section-title">STREET_ARCHIVE</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#ff0000', fontWeight: 'bold' }}>
          SELECTED STREET PHOTOGRAPHY // 2007 - Today
        </p>
      </header>
      
      <section className="image-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '5rem', alignItems: 'center' }}>
        {streetProject.images.map((img, i) => (
          <StreetImage 
            key={i} 
            src={img} 
            index={i} 
            onClick={openLightbox}
          />
        ))}
      </section>

      <div style={{ textAlign: 'center', width: '100%' }}>
        <p style={{ 
          marginTop: '6rem', 
          marginBottom: '4rem',
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.8rem', 
          letterSpacing: '2px',
          color: '#ff0000',
          fontWeight: 'bold'
        }}>
          WANDER // OBSERVE // RECORD
        </p>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox 
            images={streetProject.images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </article>
  );
};

export default Street;
