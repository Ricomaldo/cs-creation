'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('portfolio');
  const router = useRouter();

  const navigationItems = [
    { id: 'portfolio', label: 'Portfolio', icon: '✦' },
    { id: 'boutique', label: 'Boutique', icon: '◆' },
    { id: 'insights', label: 'Insights', icon: '◇' },
    { id: 'agenda', label: 'Agenda', icon: '◈' },
    { id: 'contact', label: 'Contact', icon: '◉' }
  ];

  const handleReplayIntro = () => {
    // Redirection vers la page onboarding
    router.push('/');
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.brand}>
        <h2 className={styles.brandTitle}>C&S Création</h2>
        {/* <p className={styles.brandSubtitle}>Onirologue</p> */}
      </div>

      <ul className={styles.navList}>
        {navigationItems.map((item, index) => (
          <li key={item.id} className={styles.navItem} style={{ animationDelay: `${index * 0.1}s` }}>
            <button
              className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => setActiveSection(item.id)}
              aria-label={`Aller à ${item.label}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Bouton revoir l'intro - compact et discret */}
      <button 
        className={styles.replayIntroButton}
        onClick={handleReplayIntro}
        aria-label="Revoir l'introduction"
      >
        <span className={styles.replayIcon}>↻</span>
        <span className={styles.replayLabel}>Revoir l'intro</span>
      </button>
    </nav>
  );
};