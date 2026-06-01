import { useParams, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Lightbox from '../components/Lightbox';

const GalleryImage = ({ src, alt, index, projectTitle, onClick }) => {
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
          padding: '12px', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          width: '100%',
          maxWidth: orientation === 'horizontal' ? '650px' : '400px',
          position: 'relative',
          zIndex: 20,
          cursor: 'zoom-in',
          minHeight: orientation === 'horizontal' ? '300px' : '500px',
          transition: 'transform 0.3s ease'
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
              style={{ color: '#333', fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}
            >
              LOADING_IMAGE...
            </motion.div>
          </div>
        )}

        <img 
          ref={imgRef}
          src={`${window.location.origin}/${src}`}
          alt={`${projectTitle} by Stathis Stavrianos - Image ${index + 1}`} 
          onLoad={handleLoad}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          style={{ 
            display: 'block', 
            width: '100%', 
            height: 'auto',
            maxHeight: '85vh',
            objectFit: 'contain',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in'
          }} 
          onError={(e) => {
            console.error("Failed to load image:", e.target.src);
          }}
        />
      </div>
    </motion.div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);
  const [lang, setLang] = useState('EL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!project) return <div className="page-container" style={{color: 'white', padding: '100px'}}>Project not found: {id}</div>;

  const isFuture = id === 'future-yesterdays';
  const isFishtank = id === 'fishtank';
  
  const navLink = isFuture ? '/projects/fishtank' : (isFishtank ? '/projects/future-yesterdays' : null);
  const navText = isFuture ? 'NEXT PROJECT: FISHTANK' : 'BACK TO: FUTURE YESTERDAYS';

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <article className="page-container project-detail" style={{ position: 'relative', zIndex: 10 }}>
      <header className="project-header-container" style={{ display: 'flex', flexDirection: 'column', marginBottom: '6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
          <h1 className="section-title" style={{ margin: 0, border: 'none', padding: 0 }}>{project.title.toUpperCase()}</h1>
          <div className="lang-switch" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <button onClick={() => setLang('EL')} style={{ background: 'none', border: 'none', color: lang === 'EL' ? '#ff0000' : '#555', cursor: 'pointer', padding: '0 5px' }}>EL</button>
            <span style={{ color: '#333' }}>/</span>
            <button onClick={() => setLang('EN')} style={{ background: 'none', border: 'none', color: lang === 'EN' ? '#ff0000' : '#555', cursor: 'pointer', padding: '0 5px' }}>EN</button>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem', width: '100%' }}>
          <p className="label" style={{ color: project.year === 'ONGOING' ? '#ff0000' : '#666', textAlign: 'left' }}>
            {project.year}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div className="project-desc" style={{ 
              maxWidth: '750px', 
              marginTop: '1rem', 
              lineHeight: '1.8', 
              color: '#ddd', 
              textAlign: 'justify',
              textAlignLast: 'left'
            }}>
              {lang === 'EL' ? project.description : project.description_en}
            </div>
          </div>
        </div>
      </header>

      <section className="image-gallery" style={{ display: 'flex', flexDirection: 'column', gap: '6rem', alignItems: 'center' }}>
        {project.images.map((img, i) => (
          <GalleryImage 
            key={i} 
            src={img} 
            alt={`${project.title} photography by Stathis Stavrianos`} 
            index={i} 
            projectTitle={project.title} 
            onClick={openLightbox}
          />
        ))}
      </section>

      <nav style={{ marginTop: '10rem', marginBottom: '6rem', textAlign: 'center' }}>
        {navLink && (
          <Link to={navLink} style={{ textDecoration: 'none', display: 'inline-block' }}>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              style={{ color: '#ff0000', fontFamily: 'var(--font-mono)' }}
            >
              {isFishtank && <span style={{ fontSize: '3rem', marginRight: '1rem', verticalAlign: 'middle' }}>←</span>}
              <span style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold' }}>{navText}</span>
              {isFuture && <span style={{ fontSize: '3rem', marginLeft: '1rem', verticalAlign: 'middle' }}>→</span>}
            </motion.div>
          </Link>
        )}
      </nav>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox 
            images={project.images}
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

export default ProjectDetail;
