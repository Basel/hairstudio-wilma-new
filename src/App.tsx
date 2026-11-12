import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesPriceList } from './components/ServicesPriceList';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { OpeningHoursAndContact } from './components/OpeningHoursAndContact';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { Phone, Calendar } from 'lucide-react';
import { SALON_INFO } from './data/salonData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedTreatmentIds, setPreSelectedTreatmentIds] = useState<string[]>([]);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectTreatmentsForBooking = (ids: string[]) => {
    setPreSelectedTreatmentIds(ids);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900 pb-16 md:pb-0">
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with 16:9 salon photography and real-time open status */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Services & Exact Tariffs with Interactive Calculator */}
        <ServicesPriceList onSelectTreatmentsForBooking={handleSelectTreatmentsForBooking} />

        {/* About Section with Expanded Info */}
        <AboutSection />

        {/* Photos & Portfolio Gallery with Lightbox and custom uploader */}
        <GallerySection />

        {/* Customer Reviews & 1Kapper Rating */}
        <ReviewsSection />

        {/* Opening Hours, Map & Contact in Grootegast */}
        <OpeningHoursAndContact onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedTreatmentIds={preSelectedTreatmentIds}
      />

      {/* Mobile Sticky Quick Action Bar (Under 15% viewport height cap) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-4 py-2.5 flex items-center gap-2 shadow-lg">
        <a
          href={`tel:${SALON_INFO.contact.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 rounded-md active:bg-stone-200 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-amber-800" />
          <span>Bellen</span>
        </a>

        <button
          onClick={handleOpenBooking}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white bg-amber-900 rounded-md active:bg-amber-800 transition-colors shadow-2xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Afspraak Maken</span>
        </button>
      </div>
    </div>
  );
}
