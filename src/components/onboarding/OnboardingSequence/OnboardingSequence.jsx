'use client';
import { useState, useEffect, useRef } from 'react';
import { RotatingArtwork } from '../RotatingArtwork/RotatingArtwork';
import citationsData from '@/data/onboardingCitations.json';
import styles from './OnboardingSequence.module.scss';

export const OnboardingSequence = ({ onComplete }) => {
  const [isSkipped, setIsSkipped] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleSkip = () => {
    setIsSkipped(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  const handleComplete = () => {
    setShowTransition(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1200);
  };

  // Auto-completion après un temps contemplatif
  useEffect(() => {
    const autoCompleteTimer = setTimeout(() => {
      handleComplete();
    }, 60000); // 60 secondes pour une expérience complète

    return () => clearTimeout(autoCompleteTimer);
  }, []);

  if (isSkipped) {
    return <div className={styles.fadeOut}></div>;
  }

  return (
    <div className={styles.onboardingWrapper} data-theme="onboarding">
      <button 
        className={styles.skipButton}
        onClick={handleSkip}
        aria-label="Passer l'introduction"
      >
        Entrer directement
      </button>

      {/* Transition finale */}
      {showTransition && (
        <div className={styles.transitionOverlay}>
          <div className={styles.transitionText}>
            Bienvenue dans l'univers de C&S Création
          </div>
        </div>
      )}

      {/* Citation 1 - Éveil */}
      <section className={styles.awakeningSection}>
        <div className={styles.introQuote}>
          <blockquote className={styles.contemplativeCitation}>
            <p>{citationsData.citations.find(c => c.id === 'eveil')?.text}</p>
            <cite>— {citationsData.citations.find(c => c.id === 'eveil')?.author}</cite>
          </blockquote>
        </div>
        <div className={styles.scrollInvitation}>
          <span>Laissez-vous porter par le voyage</span>
          <div className={styles.scrollArrow}>⬇</div>
        </div>
      </section>

      {/* Première œuvre - Arbre Ancestral (sans citations) */}
      <RotatingArtwork
        artwork="arbre"
        totalFrames={72}
      />

      {/* Citation 2 - Arbre */}
      <section className={styles.transitionSection}>
        <div className={styles.transitionQuote}>
          <blockquote className={styles.contemplativeCitation}>
            <p>{citationsData.citations.find(c => c.id === 'arbre')?.text}</p>
            <cite>— {citationsData.citations.find(c => c.id === 'arbre')?.author}</cite>
          </blockquote>
        </div>
      </section>

      {/* Seconde œuvre - Œuf Habité (sans citations) */}
      <RotatingArtwork
        artwork="oeuf"
        totalFrames={72}
      />

      {/* Citation 3 - Œuf */}
      <section className={styles.transitionSection}>
        <div className={styles.transitionQuote}>
          <blockquote className={styles.contemplativeCitation}>
            <p>{citationsData.citations.find(c => c.id === 'oeuf')?.text}</p>
            <cite>— {citationsData.citations.find(c => c.id === 'oeuf')?.author}</cite>
          </blockquote>
        </div>
      </section>

      {/* Citation 4 - Finale */}
      <section className={styles.revelationSection}>
        <div className={styles.finaleQuote}>
          <blockquote className={styles.contemplativeCitation}>
            <p>{citationsData.citations.find(c => c.id === 'finale')?.text}</p>
            <cite>— {citationsData.citations.find(c => c.id === 'finale')?.author}</cite>
          </blockquote>
        </div>
        <div className={styles.enterGallery}>
          <button 
            className={styles.galleryButton}
            onClick={handleComplete}
          >
            Découvrir la galerie
          </button>
        </div>
      </section>
    </div>
  );
};