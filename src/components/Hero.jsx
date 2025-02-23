import { useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToTourDetails = () => {
    const tourSection = document.getElementById('tour-details');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="h-screen flex flex-col justify-center items-center text-center text-white relative px-4 md:px-8 lg:px-16 bg-fixed bg-cover bg-center" 
      style={{ backgroundImage: "url('/cancun-dashboar.jpg')" }}
    >
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold shadow-md leading-tight tracking-wide uppercase"
      >
        ¡VIVE UNA NUEVA EXPERIENCIA!
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-white md:text-lg lg:text-xl font-light max-w-2xl"
      >
        Descubre más sobre lo que te espera en la embarcación de una nueva aventura
      </motion.p>

      {/* Botón y flecha para desplazamiento suave */}
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={scrollToTourDetails} 
        className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 text-lg"
      >
        Ver Tours
      </motion.button>

      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-3xl mt-8 animate-bounce cursor-pointer" 
        onClick={scrollToTourDetails}
      >
        ⬇️
      </motion.span>
    </section>
  );
};

export default Hero;
