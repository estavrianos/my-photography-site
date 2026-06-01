const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      padding: '2rem 0 4rem 0',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: '#888', // Πιο ανοιχτό γκρι για καλύτερη ορατότητα
        letterSpacing: '1px',
        opacity: 0.9
      }}>
        DESIGNED - DEVELOPED BY STATHIS STAVRIANOS, 2026
      </p>
    </footer>
  );
};

export default Footer;
