import { Calendar, Phone, Clock, MapPin, Star, Sparkles, ChevronRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import heroImage from '../assets/images/hero_salon_interior_1794477310651.jpg';

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  // Compute current salon status based on current time
  const getSalonStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeInMins = hours * 60 + minutes;

    // Tue (2) to Fri (5): 09:00-12:00 & 13:00-18:00
    if (day >= 2 && day <= 5) {
      if ((timeInMins >= 9 * 60 && timeInMins < 12 * 60) || (timeInMins >= 13 * 60 && timeInMins < 18 * 60)) {
        return { isOpen: true, text: 'Nu geopend tot 18:00 uur (middagpauze 12-13u)' };
      }
      if (timeInMins >= 12 * 60 && timeInMins < 13 * 60) {
        return { isOpen: false, text: 'Middagpauze · Weer geopend vanaf 13:00 uur' };
      }
      return { isOpen: false, text: 'Nu gesloten · Morgen geopend vanaf 09:00 uur' };
    }

    // Sat (6): 09:00-13:00
    if (day === 6) {
      if (timeInMins >= 9 * 60 && timeInMins < 13 * 60) {
        return { isOpen: true, text: 'Nu geopend tot 13:00 uur' };
      }
      return { isOpen: false, text: 'Nu gesloten · Dinsdag weer geopend vanaf 09:00 uur' };
    }

    // Sun (0) or Mon (1)
    return { isOpen: false, text: 'Nu gesloten · Dinsdag geopend vanaf 09:00 uur' };
  };

  const status = getSalonStatus();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/60 via-stone-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb / Location kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 mb-6">
          <span className="flex items-center gap-1 text-amber-900 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{SALON_INFO.address.street}, {SALON_INFO.address.city}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-stone-600">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{status.text}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-amber-700 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{SALON_INFO.rating.score} / 10 ({SALON_INFO.rating.totalReviews} reviews)</span>
          </span>
        </div>

        {/* Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Proposition & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 text-balance leading-[1.15]">
              Jouw vertrouwde kapper in Grootegast.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Welkom bij Hairstudio Wilma. Al jaren hét adres in Grootegast voor persoonlijke aandacht,
              vakmanschap en de juiste snit of kleur voor <strong className="text-stone-800 font-medium">dames, heren en kinderen</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-amber-900 rounded-md hover:bg-amber-800 transition-all shadow-sm active:scale-[0.99] whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Online Afspraak Maken</span>
              </button>

              <a
                href="#tarieven"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-700 bg-white border border-stone-300 rounded-md hover:bg-stone-50 hover:text-stone-900 transition-colors shadow-2xs whitespace-nowrap"
              >
                <span>Bekijk Prijzen & Behandelingen</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>
            </div>

            {/* Telephone reassurance */}
            <div className="pt-1 flex items-center gap-2 text-xs text-stone-500">
              <Phone className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span>
                Liever telefonisch reserveren? Bel ons gerust op{' '}
<a href={'tel:' + SALON_INFO.contact.phoneRaw} className="font-medium text-stone-800 hover:text-amber-900 underline underline-offset-2">
{SALON_INFO.contact.phone}
                </a>
              </span>
            </div>

            {/* Proof bar */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div>
                <p className="font-semibold text-stone-900">Voor het hele gezin</p>
                <p className="text-stone-500">Dames, heren & kleintjes</p>
              </div>
              <div>
                <p className="font-semibold text-stone-900">Woensdag kinderkorting</p>
                <p className="text-stone-500">Knippen slechts € 19,00</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-semibold text-stone-900">Gratis parkeren</p>
                <p className="text-stone-500">Ruim voor de deur</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 bg-stone-100 group">
              <img
                src={heroImage}
                alt="Hairstudio Wilma salon interieur aan de Hoofdstraat in Grootegast"
                className="w-full aspect-16/10 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Overlay caption card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/90 shadow-md flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Lichte & rustige salon</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Moderne stylingstations, ontspannen wasbakken en een vers kopje koffie.
                  </p>
                </div>
                <a
                  href="#impressie"
                  className="px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md whitespace-nowrap shrink-0 transition-colors"
                >
                  Bekijk Foto's
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}