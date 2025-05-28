'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ArtworkModal.module.scss';

export const ArtworkModal = ({ artwork, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const imageRef = useRef(null);

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Clic extérieur pour fermer
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Animation d'entrée de l'image
  const handleImageLoad = () => {
    if (imageRef.current) {
      imageRef.current.classList.add(styles.loaded);
    }
  };

  if (!isOpen || !artwork) return null;

  // Citation inspirante (peut être ajoutée aux données plus tard)
  const getArtworkCitation = (artwork) => {
    const citations = {
      1: "Dans chaque feuille qui tombe, une histoire se murmure...",
      2: "L'enfance habite éternellement sous les cerisiers en fleurs",
      3: "Les fragments de mémoire tissent la dentelle du temps",
      4: "Le petit peuple veille dans les recoins oubliés du monde",
      5: "La mousse garde les secrets que la terre lui confie"
    };
    return citations[artwork.id] || "Chaque œuvre porte en elle un fragment d'âme...";
  };

  return (
    <div 
      className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="artwork-title"
    >
      <div className={styles.modalContainer} ref={modalRef}>
        {/* Bouton fermeture */}
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fermer la modal"
        >
          <span className={styles.closeIcon}>✕</span>
        </button>

        {/* Image principale */}
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <Image
              ref={imageRef}
              src={`/${artwork.image}`}
              alt={artwork.nom}
              width={500}
              height={500}
              sizes="(max-width: 768px) 90vw, 60vw"
              className={styles.artworkImage}
              onLoad={handleImageLoad}
              priority
              style={{ width: '100%', height: 'auto' }}
            />
            
            {/* Halo contemplatif */}
            <div className={styles.contemplativeHalo} />
          </div>
        </div>

        {/* Métadonnées élégantes */}
        <div className={styles.metadataSection}>
          <div className={styles.titleGroup}>
            <h2 id="artwork-title" className={styles.artworkTitle}>
              {artwork.nom}
            </h2>
            <p className={styles.artworkYear}>{artwork.annee}</p>
          </div>

          <div className={styles.technicalInfo}>
            <p className={styles.technique}>{artwork.technique}</p>
            <p className={styles.dimensions}>{artwork.dimensions}</p>
          </div>

          {/* Citation inspirante */}
          <blockquote className={styles.inspiration}>
            <p className={styles.citationText}>
              "{getArtworkCitation(artwork)}"
            </p>
            {/* <cite className={styles.citationAuthor}>— L'Onirologue</cite> */}
          </blockquote>

          {/* Description si disponible */}
          {artwork.description && (
            <div className={styles.description}>
              <p>{artwork.description}</p>
            </div>
          )}

          {/* Statut discret */}
          <div className={styles.statusInfo}>
            {artwork.disponible ? (
              <span className={styles.available}>Œuvre disponible</span>
            ) : (
              <span className={styles.sold}>Collection privée</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 