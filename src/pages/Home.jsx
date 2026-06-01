import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../data/projects.json';

const Home = () => {
  const futureImages = projectsData.find(p => p.id === 'future-yesterdays')?.images || [];
  const fishtankImages = projectsData.find(p => p.id === 'fishtank')?.images || [];
  
  const [currentImage, setCurrentImage] = useState('images/home.jpg');
  const [isDeveloping, setIsDeveloping] = useState(false);
  const [nextSource, setNextSource] = useState('fishtank');
  const [imageOrientation, setImageOrientation] = useState('horizontal');
  const [isImageLoading, setIsImageLoading] = useState(false);

  const preloadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `${window.location.origin}/${src}`;
      img.onload = () => resolve(src);
    });
  };

  const handleDarkroomClick = async () => {
    if (isDeveloping || isImageLoading) return;

    let nextImage = '';
    const sourceArray = nextSource === 'fishtank' ? fishtankImages : futureImages;
    
    if (sourceArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * sourceArray.length);
      nextImage = sourceArray[randomIndex];
    }

    if (!nextImage) return;

    setIsDeveloping(true);
    setIsImageLoading(true);

    await preloadImage(nextImage);

    setTimeout(() => {
      if (nextImage) setCurrentImage(nextImage);
      setNextSource(nextSource === 'fishtank' ? 'future' : 'fishtank');
      setIsImageLoading(false);
      setTimeout(() => setIsDeveloping(false), 2000);
    }, 300);
  };

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImageOrientation(naturalWidth > naturalHeight ? 'horizontal' : 'vertical');
  };

  const isCurrentlyGrayscale = currentImage.includes('future-yesterdays') || currentImage.includes('home.jpg');
  const titleText = "WELCOME // TO_THE_SILENT_NOISE";
  const developColor = '#00ff00';

  return (
    <div className="page-container home-page" onClick={handleDarkroomClick} style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.div 
        initial={{ scale: 1, opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="hero-section"
        style={{ width: '100%', maxWidth: '900px' }}
      >
        <header className="hero-header" style={{ marginBottom: '2.5rem' }}>
          <h1 className="hero-title" style={{ 
            fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)', 
            lineHeight: '1.2',
            margin: '0 auto',
            letterSpacing: '5px', 
            fontFamily: 'var(--font-mono)',
            width: 'fit-content',
            borderBottom: '1px solid #222',
            paddingBottom: '0.5rem',
            position: 'relative',
            color: 'white'
          }}>
            {titleText}
          </h1>
        </header>

        <div className="hero-image-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <motion.div 
            className="printed-photo-frame"
            animate={{ 
              maxWidth: imageOrientation === 'horizontal' ? '700px' : '400px',
            }}
            transition={{ duration: 0.5 }}
            style={{ 
              backgroundColor: 'white',
              padding: '12px',
              boxShadow: '0 15px 45px rgba(0,0,0,0.6)',
              display: 'inline-block',
              width: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {isImageLoading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#000',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <motion.div 
                  animate={{ 
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    color: developColor,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '2px'
                  }}
                >
                  PREPARING_CHEMICALS...
                </motion.div>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImage}
                src={`${window.location.origin}/${currentImage}`}
                alt="Darkroom" 
                onLoad={handleImageLoad}
                initial={{ 
                  filter: `grayscale(${isCurrentlyGrayscale ? '100%' : '0%'}) contrast(300%) brightness(0%)`, 
                  opacity: 0 
                }}
                animate={{ 
                  filter: `grayscale(${isCurrentlyGrayscale ? '100%' : '0%'}) contrast(100%) brightness(100%)`, 
                  opacity: 1 
                }}
                transition={{ 
                  duration: 2.5, 
                  ease: "easeIn" 
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  maxHeight: '65vh',
                  objectFit: 'contain'
                }}
              />
            </AnimatePresence>
            
            {isDeveloping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 2 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'red',
                  pointerEvents: 'none',
                  zIndex: 30
                }}
              />
            )}
          </motion.div>
        </div>

        <p style={{ 
          marginTop: '2.5rem', 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.7rem', 
          letterSpacing: '2px',
          color: '#ff0000',
          fontWeight: 'bold'
        }}>
          {isImageLoading ? 'LOADING_ASSETS...' : `CLICK_ANYWHERE_TO_DEVELOP // ${isDeveloping ? 'DEVELOPING...' : 'READY?'}`}
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
