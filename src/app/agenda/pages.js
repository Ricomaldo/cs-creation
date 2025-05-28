import { GalleryLayout } from '@/components/layout/GalleryLayout/GalleryLayout';

export default function AgendaPage() {
  return (
    <GalleryLayout>
      <div>
        <h1>Agenda</h1>
        <p>Événements & expositions - En construction...</p>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          background: 'var(--museal-creme)', 
          borderRadius: '8px' 
        }}>
          <h2>Ici apparaîtront :</h2>
          <ul>
            <li>Expositions à venir</li>
            <li>Événements passés avec photos</li>
            <li>Ateliers et rencontres</li>
            <li>Calendrier interactif</li>
          </ul>
        </div>
      </div>
    </GalleryLayout>
  );
}