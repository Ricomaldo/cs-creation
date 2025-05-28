import { useState, useEffect, useRef, useCallback } from 'react';

export const useRotationScroll = (totalFrames = 72, artwork = 'arbre', speed = 1) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const frameCache = useRef([]);
  const tickingRef = useRef(false);

  // Préchargement optimisé des images
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = [];
      
      for (let i = 0; i < totalFrames; i++) {
        const frameNumber = String(i + 1).padStart(3, '0');
        const img = new Image();
        img.src = `/assets/onboarding/${artwork}/frame_${frameNumber}.webp`;
        
        const loadPromise = new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => {
            // Fallback vers .jpg si .webp échoue
            img.src = `/assets/onboarding/${artwork}/frame_${frameNumber}.jpg`;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          };
        });
        
        loadPromises.push(loadPromise);
        frameCache.current[i] = img;
      }

      try {
        await Promise.all(loadPromises);
        setIsLoaded(true);
      } catch (error) {
        console.warn(`Erreur chargement images ${artwork}:`, error);
        setIsLoaded(true); // Continue même en cas d'erreur
      }
    };

    preloadImages();
  }, [totalFrames, artwork]);

  // Logique de scroll améliorée avec rotation fluide
  const handleScroll = useCallback(() => {
    if (!tickingRef.current && sectionRef.current && isLoaded) {
      requestAnimationFrame(() => {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Calcul du progrès basé sur la position de la section dans le viewport
        let progress = 0;
        
        // Nouvelle logique pour les sections hautes (300vh)
        if (rect.top <= 0 && rect.bottom >= windowHeight) {
          // Section remplit tout l'écran - rotation basée sur le scroll dans la section
          const scrolledInSection = Math.abs(rect.top);
          const maxScroll = sectionHeight - windowHeight;
          progress = scrolledInSection / maxScroll;
        } else if (rect.top > 0) {
          // Section entre dans le viewport par le bas
          progress = 0;
        } else if (rect.bottom < windowHeight) {
          // Section sort du viewport par le haut
          progress = 1;
        } else {
          // Section partiellement visible
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          progress = visibleHeight / windowHeight;
        }
        
        // Normalisation et application de la vitesse
        progress = Math.max(0, Math.min(1, progress));
        progress = Math.pow(progress, 1 / speed); // Courbe de vitesse
        
        setScrollProgress(progress);
        
        // Calcul de la frame avec interpolation fluide
        const targetFrame = progress * (totalFrames - 1);
        const frameIndex = Math.round(targetFrame);
        const clampedFrame = Math.max(0, Math.min(frameIndex, totalFrames - 1));

        if (clampedFrame !== currentFrame) {
          setCurrentFrame(clampedFrame);
        }

        tickingRef.current = false;
      });
      tickingRef.current = true;
    }
  }, [currentFrame, totalFrames, isLoaded, speed]);

  useEffect(() => {
    if (isLoaded) {
      // Écoute passive pour de meilleures performances
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Appel initial pour définir la position
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isLoaded]);

  const getCurrentImageSrc = () => {
    return frameCache.current[currentFrame]?.src || '';
  };

  const getPreloadProgress = () => {
    const loadedCount = frameCache.current.filter(img => img?.complete).length;
    return (loadedCount / totalFrames) * 100;
  };

  // Fonction pour obtenir la rotation en degrés (utile pour les animations CSS)
  const getRotationDegrees = () => {
    return (currentFrame / (totalFrames - 1)) * 360;
  };

  return {
    sectionRef,
    currentFrame,
    isLoaded,
    scrollProgress,
    getCurrentImageSrc,
    getPreloadProgress,
    getRotationDegrees,
    totalFrames
  };
};