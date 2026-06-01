import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { motion } from 'framer-motion';

const Projects = () => {
  // Φιλτράρουμε το projectsData για να εξαιρέσουμε το street_archive
  const filteredProjects = projectsData.filter(project => project.id !== 'street');

  return (
    <article className="page-container projects-page" style={{ position: 'relative', zIndex: 10 }}>
      <header>
        <h1 className="section-title" style={{ textAlign: 'left' }}>PROJECTS_</h1>
        <p style={{ display: 'none' }}>Εξερευνήστε τα φωτογραφικά projects του Στάθη Σταυριανού: Future Yesterdays και FishTank.</p>
      </header>
      
      <section className="projects-grid" style={{ textAlign: 'left' }}>
        {filteredProjects.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="project-card"
          >
            <Link to={`/projects/${project.id}`} title={`View project: ${project.title}`}>
              <div className="project-image-wrapper" style={{ 
                backgroundColor: 'white', 
                padding: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                position: 'relative',
                zIndex: 20
              }}>
                <img 
                  src={`${window.location.origin}/${project.cover}`} 
                  alt={`${project.title} - Contemporary photography by Stathis Stavrianos`} 
                  style={{ 
                    width: '100%', 
                    height: '400px', 
                    objectFit: 'cover',
                    display: 'block'
                  }} 
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
                <div className="project-info" style={{ padding: '10px 0 5px 0' }}>
                  <h2 style={{ color: 'black', fontSize: '0.9rem', margin: 0 }}>{project.title.toUpperCase()}</h2>
                  <span style={{ 
                    color: project.year === 'ONGOING' ? '#ff0000' : '#666', 
                    fontSize: '0.7rem', 
                    fontFamily: 'var(--font-mono)',
                    fontWeight: project.year === 'ONGOING' ? 'bold' : 'normal'
                  }}>
                    {project.year}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      <footer style={{ textAlign: 'center', width: '100%' }}>
        <p style={{ 
          marginTop: '6rem', 
          marginBottom: '4rem',
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.8rem', 
          letterSpacing: '2px',
          color: '#ff0000',
          fontWeight: 'bold'
        }}>
          JOIN // WATCH // ESCAPE
        </p>
      </footer>
    </article>
  );
};

export default Projects;
