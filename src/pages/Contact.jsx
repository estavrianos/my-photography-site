import { motion } from 'framer-motion';

const Contact = () => {
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/istathis/' },
    { name: 'Facebook', url: 'https://www.facebook.com/e.stavrianos/' },
    { name: 'Flickr', url: 'https://www.flickr.com/photos/10318010@N05/' },
    { name: 'Spotify', url: 'https://open.spotify.com/user/11124408498?si=6762550163b34a26' },
  ];

  return (
    <div className="page-container contact-page" style={{ textAlign: 'center' }}>
      <h2 className="section-title" style={{ textAlign: 'left' }}>CONTACT_</h2>
      
      <div className="contact-layout" style={{ textAlign: 'left' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form 
            action="https://formspree.io/f/xzdwljkb"
            method="POST"
            className="contact-form"
          >
            <div className="form-group">
              <label>NAME</label>
              <input type="text" name="name" required placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label>EMAIL</label>
              <input type="email" name="_replyto" required placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>MESSAGE</label>
              <textarea name="message" rows="5" required placeholder="Write your message..."></textarea>
            </div>
            
            {/* Ρυθμίσεις Formspree */}
            <input type="hidden" name="_subject" value="New message from Photography Portfolio" />
            <input type="hidden" name="_next" value={window.location.href} />
            
            <button type="submit" className="submit-btn">SEND_MESSAGE</button>
          </form>
        </motion.div>

        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="info-block">
            <p className="label" style={{ color: '#ff0000' }}>EMAIL</p>
            <a href="mailto:e_stavrianos@yahoo.gr" className="email-link">e_stavrianos@yahoo.gr</a>
          </div>

          <div className="info-block" style={{ marginTop: '4rem' }}>
            <p className="label" style={{ marginBottom: '1.5rem', color: '#ff0000' }}>CONNECT_</p>
            <div className="social-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-item"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: '#888',
                    transition: 'color 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                >
                  <span>{social.name.toUpperCase()} //</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <p style={{ 
        marginTop: '6rem', 
        marginBottom: '4rem',
        fontFamily: 'var(--font-mono)', 
        fontSize: '0.8rem', 
        letterSpacing: '2px',
        color: '#ff0000',
        fontWeight: 'bold'
      }}>
        STAY // LOOK_DEEPER // CONTACT
      </p>
    </div>
  );
};

export default Contact;
