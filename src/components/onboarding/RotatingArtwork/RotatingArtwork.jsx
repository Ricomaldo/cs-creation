'use client';
import { useRotationScroll } from '@/hooks/useRotationScroll';
import styles from './RotatingArtwork.module.scss';

export const RotatingArtwork = ({ 
  artwork = 'arbre', 
  totalFrames = 72
}) => {
  const { sectionRef, isLoaded, getCurrentImageSrc, scrollProgress } = useRotationScroll(
    totalFrames, 
    artwork,
    4.0 // 4 tours complets au lieu de 1
  );

  return (
    <section ref={sectionRef} className={styles.rotationContainer}>
      <div className={styles.artworkStage}>
        {isLoaded ? (
          <div 
            className={styles.rotatingImage}
            style={{ 
              backgroundImage: `url(${getCurrentImageSrc()})`
            }}
            aria-label={`Œuvre ${artwork} en rotation 360°`}
          />
        ) : (
          <div className={styles.loadingSpinner}>
            <div className={styles.loadingDots}></div>
            <div className={styles.loadingText}>
              Chargement de l'œuvre...
            </div>
          </div>
        )}
      </div>
      
      {/* Indication de scroll subtile */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollProgress}>
          <div 
            className={styles.progressBar}
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <span>Explorez l'œuvre en défilant</span>
      </div>
    </section>
  );
};