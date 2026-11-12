import { useState, useRef } from 'react';
import { GALLERY_PHOTOS } from '../data/salonData';
import { GalleryPhoto } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Upload, RotateCcw, Image as ImageIcon } from 'lucide-react';

export function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(GALLERY_PHOTOS);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newPhotos: GalleryPhoto[] = Array.from(files).map((file, idx) => ({
      id: `custom-${Date.now()}-${idx}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      category: 'Eigen Foto',
      src: URL.createObjectURL(file),
      alt: `Geüploade salon foto: ${file.name}`,
      description: 'Eigen geüploade foto voor Hairstudio Wilma impressie.',
    }));

    setPhotos((prev) => [...newPhotos, ...prev]);
  };

  const handleResetPhotos = () => {
    setPhotos(GALLERY_PHOTOS);
  };

  return (
    <section id="impressie" className="py-16 sm:py-24 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-amber-900 uppercase">
              Foto Impressie & Sfeer
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-2 text-balance">
              Een kijkje in onze salon en resultaten.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Ontdek de rustige sfeer, onze fijne werkplekken en voorbeelden van kleuringen en stylings.
            </p>
          </div>

          {/* Photo Customizer Action */}
          <div className="flex items-center gap-2 shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
              title="Upload uw eigen salonfoto's om direct te testen"
            >
              <Upload className="w-3.5 h-3.5 text-stone-600" />
              <span>Eigen foto's toevoegen</span>
            </button>

            {photos.length !== GALLERY_PHOTOS.length && (
              <button
                onClick={handleResetPhotos}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors cursor-pointer"
                title="Herstel naar originele foto's"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Herstel</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`group relative rounded-xl overflow-hidden border border-stone-200/90 bg-stone-100 cursor-pointer shadow-xs hover:shadow-md transition-all ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2 aspect-16/9' : 'aspect-4/3'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-amber-300">
                      {photo.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-stone-300 group-hover:text-white" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mt-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                    {photo.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && selectedPhotoIndex !== null && (
          <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Sluit foto"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Vorige foto"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Volgende foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
              <div className="relative w-full max-h-[70vh] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="mt-4 text-center text-white max-w-xl">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-medium">
                  {activePhoto.category} · Foto {selectedPhotoIndex + 1} van {photos.length}
                </div>
                <h3 className="font-serif text-xl font-bold mt-1">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  {activePhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
