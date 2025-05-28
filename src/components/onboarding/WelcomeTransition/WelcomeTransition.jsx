'use client';
import { useState, useEffect } from 'react';
import styles from './WelcomeTransition.module.scss';

export const WelcomeTransition = ({ onComplete }) => {
  const [phase, setPhase] = useState('fadeIn'); // 'fadeIn', 'welcome', 'fadeOut'

  useEffect(() => {
    // Séquence de transition
    const timer1 = setTimeout(() => {
      setPhase('welcome');
    }, 800); // Fondu blanc complet

    const timer2 = setTimeout(() => {
      setPhase('fadeOut');
    }, 3500); // Affichage du message BIENVENUE

    const timer3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4800); // Transition vers la galerie

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.welcomeContainer} ${styles[phase]}`}>
      {/* Fond blanc */}
      <div className={styles.whiteOverlay} />
      
      {/* Message de bienvenue */}
      {(phase === 'welcome' || phase === 'fadeOut') && (
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>BIENVENUE</h1>
          <p className={styles.welcomeSubtitle}>
            dans l'univers onirique de C&S Création
          </p>
          <div className={styles.welcomeOrnament}>✦</div>
        </div>
      )}
    </div>
  );
}; 