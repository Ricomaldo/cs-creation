'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArtworkModal } from '../ArtworkModal/ArtworkModal';
import styles from './ArtworkCard.module.scss';

export const ArtworkCard = ({ artwork }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className={styles.artworkCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={`Voir les détails de ${artwork.nom}`}
      >
        <div className={styles.imageContainer}>
          <Image
            src={`/${artwork.image}`} 
            alt={artwork.nom}
            width={400}
            height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`${styles.artworkImage} ${isLoaded ? styles.loaded : ''}`}
            onLoad={() => setIsLoaded(true)}
            priority={artwork.featured}
            style={{ width: '100%', height: 'auto' }}
          />
          
          {/* Skeleton loader */}
          {!isLoaded && (
            <div className={styles.skeleton} />
          )}
          
          {/* Halo blanc au hover */}
          <div className={`${styles.halo} ${isHovered ? styles.visible : ''}`} />
          
          {/* Informations qui apparaissent au hover */}
          <div className={`${styles.artworkInfo} ${isHovered ? styles.visible : ''}`}>
            <h3 className={styles.title}>{artwork.nom}</h3>
            <p className={styles.technique}>{artwork.technique}</p>
            <p className={styles.year}>{artwork.annee}</p>
            <p className={styles.dimensions}>{artwork.dimensions}</p>
            {artwork.prix && (
              <p className={styles.price}>{artwork.prix}€</p>
            )}
            {!artwork.disponible && (
              <span className={styles.sold}>Vendu</span>
            )}
            
            {/* Indication pour cliquer */}
            <div className={styles.clickHint}>
              <span>Cliquer pour contempler</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de détail */}
      <ArtworkModal 
        artwork={artwork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}; 