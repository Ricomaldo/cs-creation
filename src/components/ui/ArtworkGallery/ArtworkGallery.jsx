'use client';
import { useState, useMemo } from 'react';
import { ArtworkCard } from '@/components/ui/ArtworkCard/ArtworkCard';
import { CategoryFilter } from '@/components/ui/CategoryFilter/CategoryFilter';
import styles from './ArtworkGallery.module.scss';

export const ArtworkGallery = ({ artworks, title = "Portfolio" }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Extraire les catégories uniques des œuvres
  const categories = useMemo(() => {
    const categoryMap = new Map();
    
    artworks.forEach(artwork => {
      if (artwork.category && !categoryMap.has(artwork.category)) {
        // Convertir les clés en labels lisibles
        const label = artwork.category
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        categoryMap.set(artwork.category, {
          key: artwork.category,
          label: label
        });
      }
    });
    
    return Array.from(categoryMap.values());
  }, [artworks]);

  // Filtrer les œuvres selon la catégorie active
  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'all') {
      return artworks;
    }
    return artworks.filter(artwork => artwork.category === activeCategory);
  }, [artworks, activeCategory]);

  // Séparer les œuvres featured des autres (après filtrage)
  const featuredArtworks = filteredArtworks.filter(artwork => artwork.featured);
  const regularArtworks = filteredArtworks.filter(artwork => !artwork.featured);

  return (
    <div className={styles.gallery}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>
          Univers artistique où l'onirique rencontre le tangible
        </p>
      </header>

      {/* Filtres par catégorie */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}

      {/* Message si aucune œuvre dans la catégorie */}
      {filteredArtworks.length === 0 && (
        <div className={styles.emptyState}>
          <p>Aucune œuvre dans cette catégorie pour le moment.</p>
        </div>
      )}

      {/* Œuvres mises en avant */}
      {featuredArtworks.length > 0 && (
        <section className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>Œuvres phares</h2>
          <div className={styles.featuredGrid}>
            {featuredArtworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>
      )}

      {/* Toutes les œuvres */}
      {regularArtworks.length > 0 && (
        <section className={styles.allWorksSection}>
          <h2 className={styles.sectionTitle}>
            {featuredArtworks.length > 0 ? 'Autres créations' : 'Créations'}
          </h2>
          <div className={styles.artworkGrid}>
            {regularArtworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>
      )}

      {/* Statistiques discrètes */}
      {filteredArtworks.length > 0 && (
        <footer className={styles.galleryFooter}>
          <p className={styles.stats}>
            {filteredArtworks.length} œuvre{filteredArtworks.length > 1 ? 's' : ''} 
            {activeCategory !== 'all' && ` dans "${categories.find(c => c.key === activeCategory)?.label}"`} • 
            {filteredArtworks.filter(a => a.disponible).length} disponible{filteredArtworks.filter(a => a.disponible).length > 1 ? 's' : ''}
          </p>
        </footer>
      )}
    </div>
  );
}; 