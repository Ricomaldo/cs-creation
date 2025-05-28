'use client';
import { useState, useEffect } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { ArtworkCard } from '@/components/ui/ArtworkCard/ArtworkCard';
import galleryData from '@/data/gallery.json';
import styles from './GalleryLayout.module.scss';

export const GalleryLayout = ({ onRestartIntro }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée séquentielle
    const timer1 = setTimeout(() => {
      setIsMenuVisible(true);
    }, 300);

    const timer2 = setTimeout(() => {
      setIsContentVisible(true);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className={styles.galleryLayout} data-theme="gallery">
      {/* Menu de navigation gauche */}
      <aside className={`${styles.sidebar} ${isMenuVisible ? styles.visible : ''}`}>
        <Navigation />
      </aside>

      {/* Contenu principal */}
      <main className={`${styles.mainContent} ${isContentVisible ? styles.visible : ''}`}>
        <div className={styles.galleryHeader}>
          <h1 className={styles.galleryTitle}>Portfolio</h1>
          <p className={styles.gallerySubtitle}>
            Découvrez l'univers onirique de C&S Création
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {galleryData.artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </main>
    </div>
  );
};