
import { useState, useEffect } from 'react';

const useParallax = (ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height } = window.innerWidth || document.documentElement.clientWidth;
      
      // Calculate position relative to center of screen
      const x = clientX - width / 2;
      const y = clientY - height / 2;
      
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref]);

  return position;
};

export default useParallax;