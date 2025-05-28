import { GalleryLayout } from '@/components/layout/GalleryLayout/GalleryLayout';

export default function BoutiquePage() {
  return (
    <GalleryLayout>
      <div>
        <h1>Boutique</h1>
        <p>Créations disponibles - En construction...</p>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          background: 'var(--museal-creme)', 
          borderRadius: '8px' 
        }}>
          <h2>Ici apparaîtront :</h2>
          <ul>
            <li>Œuvres disponibles à l'acquisition</li>
            <li>Reproductions et tirages d'art</li>
            <li>Pièces uniques</li>
            <li>Système de commande personnalisée</li>
          </ul>
        </div>
      </div>
    </GalleryLayout>
  );
}