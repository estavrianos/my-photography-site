import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const About = () => {
  const [lang, setLang] = useState('EL');

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const linkStyle = {
    color: '#ff0000',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease'
  };

  const content = {
    EL: {
      text: [
        <span key="el-1">
          Ο <strong>Στάθης Σταυριανός</strong> ζει και εργάζεται στην Πάτρα ως εκπαιδευτικός Πληροφορικής. Η σχέση του με το φωτογραφικό μέσο ξεκίνησε το 2007, μέσα από την προτροπή και την καθοδήγηση ενός πολύ καλού 
          <a onClick={() => openInNewTab('https://www.flickr.com/photos/minas_papadopoulos/')} style={linkStyle} title="Minas Papadopoulos Flickr"> φίλου</a>. 
          Τα πρώτα χρόνια, η αναζήτησή του διοχετεύθηκε στη <strong>φωτογραφία δρόμου</strong> —μια περίοδος αυθορμητισμού και αδιάκοπης παρατήρησης της σκιας, του φωτός αλλά και της ανθρώπινης κατάστασης στο αστικό τοπίο, η οποία διαμόρφωσε τα αντανακλαστικά και την οπτική του αντίληψη.
        </span>,
        <span key="el-2">
          Με τον χρόνο, η ανάγκη του για μια πιο προσωπική και ενδοσκοπική έκφραση τον οδήγησε στη δομημένη <strong>καλλιτεχνική φωτογραφία</strong>. Τα τελευταία χρόνια παρακολούθησε το σεμινάριο του 
          <a onClick={() => openInNewTab('https://lukasvasilikos.com')} style={linkStyle} title="Λουκάς Βασιλικός"> Λουκά Βασιλικού</a>, 
          καθώς και τα μαθήματα του 
          <a onClick={() => openInNewTab('https://vassilisvouklizas.com')} style={linkStyle} title="Βασίλης Βούκλιζας"> Βασίλη Βούκλιζα</a> 
          στη Φωτογραφική Λέσχη Πάτρας 
          <a onClick={() => openInNewTab('https://idifosgr.wordpress.com')} style={linkStyle} title="Ηδύφως Πάτρα"> «Ηδύφως»</a>, 
          ενώ έργα του έχουν παρουσιαστεί σε ομαδικές εκθέσεις σε Αθήνα και Πάτρα.
        </span>,
        <span key="el-3">
          Η φωτογραφία του δεν γεννιέται στο κενό, αλλά τρέφεται από όσα αγαπά. Η μουσική —από τη μελαγχολία του <strong>post-punk</strong> και την ενέργεια του indie και alternative rock, μέχρι τους πειραματισμούς του post-rock, της IDM και τον ελεύθερο χαρακτήρα της jazz— μαζί με τον κινηματογράφο και τη λογοτεχνία, επηρεάζουν το φωτογραφικό του όραμα. Λειτουργούν σαν ένας εσωτερικός, σχεδόν αθόρυβος ρυθμός, που τον βοηθά κατά τη διαδικασία της φωτογράφισης αλλά και της επιλογής και επεξεργασίας.
        </span>
      ]
    },
    EN: {
      text: [
        <span key="en-1">
          <strong>Stathis Stavrianos</strong> lives and works in Patras, Greece, as an IT educator. His relationship with the photographic medium began in 2007, through the encouragement and guidance of a very close 
          <a onClick={() => openInNewTab('https://www.flickr.com/photos/minas_papadopoulos/')} style={linkStyle} title="Minas Papadopoulos friend"> friend</a>. 
          During the early years, his exploration was channeled into <strong>street photography</strong>—a period of spontaneity and relentless observation of shadow, light, and the human condition within the urban landscape, which shaped his reflexes and visual perception.
        </span>,
        <span key="en-2">
          Over time, his need for a more personal and introspective expression led him toward structured <strong>fine-art photography</strong>. In recent years, he attended 
          <a onClick={() => openInNewTab('https://lukasvasilikos.com')} style={linkStyle} title="Loukas Vasilikos"> Loukas Vasilikos’</a> 
          masterclass, as well as 
          <a onClick={() => openInNewTab('https://vassilisvouklizas.com')} style={linkStyle} title="Vasilis Vouklizas"> Vasilis Vouklizas’</a> 
          courses at the Patras Photographic Society 
          <a onClick={() => openInNewTab('https://idifosgr.wordpress.com')} style={linkStyle} title="Idifos Patras"> "Idifos"</a>, 
          while his work has been showcased in group exhibitions in Athens and Patras.
        </span>,
        <span key="en-3">
          His photography is not born in a vacuum but is nourished by everything he loves. Music—ranging from the melancholy of <strong>post-punk</strong> and the energy of indie and alternative rock to the experimentation of post-rock, IDM, and the free-form character of jazz—along with cinema and literature, heavily influence his photographic vision. They function as an internal, almost silent rhythm that guides him through the process of shooting, sequencing, and editing.
        </span>
      ]
    }
  };

  const tagline = "RAW // NOISE // IN_SILENCE";

  return (
    <article className="page-container about-page" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header className="about-header" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ margin: 0, textAlign: 'left', flex: 1 }}>ABOUT_</h1>
        <div className="lang-switch" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
          <button onClick={() => setLang('EL')} style={{ background: 'none', border: 'none', color: lang === 'EL' ? '#ff0000' : '#555', cursor: 'pointer', padding: '0 5px' }}>EL</button>
          <span style={{ color: '#333' }}>/</span>
          <button onClick={() => setLang('EN')} style={{ background: 'none', border: 'none', color: lang === 'EN' ? '#ff0000' : '#555', cursor: 'pointer', padding: '0 5px' }}>EN</button>
        </div>
      </header>

      <section className="about-content-wrapper" style={{ maxWidth: '800px', width: '100%', marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'justify', textAlignLast: 'left' }}
          >
            {content[lang].text.map((p, i) => (
              <p key={i} style={{ 
                fontSize: '1.05rem', 
                marginBottom: '1.2rem', 
                lineHeight: '1.7',
                color: '#ddd'
              }}>
                {p}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.figure 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            backgroundColor: 'white', 
            padding: '12px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            maxWidth: '450px',
            width: '100%',
            margin: '2rem auto'
          }}
        >
          <img 
            src={`${window.location.origin}/images/BACK.jpg`} 
            alt="Stathis Stavrianos - Greek Photographer Bio Image" 
            style={{ 
              display: 'block', 
              width: '100%', 
              height: 'auto',
              filter: 'contrast(105%)'
            }} 
          />
          <figcaption style={{ display: 'none' }}>Στάθης Σταυριανός - Stathis Stavrianos Photography</figcaption>
        </motion.figure>
      </section>

      <p style={{ 
        marginTop: '3rem', 
        marginBottom: '3rem',
        fontFamily: 'var(--font-mono)', 
        fontSize: '0.8rem', 
        letterSpacing: '2px',
        color: '#ff0000',
        fontWeight: 'bold'
      }}>
        {tagline}
      </p>
    </article>
  );
};

export default About;
