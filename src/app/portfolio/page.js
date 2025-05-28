import { GalleryLayout } from '@/components/layout/GalleryLayout/GalleryLayout';
import { ArtworkGallery } from '@/components/ui/ArtworkGallery/ArtworkGallery';
import galleryData from '@/data/gallery.json';

export default function PortfolioPage() {
  return (
    <GalleryLayout>
      <ArtworkGallery artworks={galleryData.artworks} />
    </GalleryLayout>
  );
} 