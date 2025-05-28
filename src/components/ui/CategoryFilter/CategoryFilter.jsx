'use client';
import styles from './CategoryFilter.module.scss';

export const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${activeCategory === 'all' ? styles.active : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        Toutes les œuvres
      </button>
      {categories.map(category => (
        <button
          key={category.key}
          className={`${styles.filterButton} ${activeCategory === category.key ? styles.active : ''}`}
          onClick={() => onCategoryChange(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}; 