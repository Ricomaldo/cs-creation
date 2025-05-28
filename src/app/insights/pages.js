import { GalleryLayout } from '@/components/layout/GalleryLayout/GalleryLayout';

export default function InsightsPage() {
  return (
    <GalleryLayout>
      <div>
        <h1>Insights</h1>
        <p>Vie de l'atelier - En construction...</p>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          background: 'var(--museal-creme)', 
          borderRadius: '8px' 
        }}>
          <h2>Ici apparaîtront :</h2>
          <ul>
            <li>Processus créatifs en cours</li>
            <li>Carnets d'inspiration</li>
            <li>Techniques et matériaux</li>
            <li>Réflexions artistiques</li>
          </ul>
        </div>
      </div>
    </GalleryLayout>
  );
}
