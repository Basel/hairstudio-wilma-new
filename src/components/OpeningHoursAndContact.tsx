import { useState } from 'react';
import { OPENING_HOURS, SALON_INFO } from '../data/salonData';
import { Clock, MapPin, Phone, Mail, Navigation, Car, CreditCard, ExternalLink, Calendar } from 'lucide-react';

interface OpeningHoursAndContactProps {
  onOpenBooking: () => void;
}

export function OpeningHoursAndContact({ onOpenBooking }: OpeningHoursAndContactProps) {
  const currentDayIndex = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Hairstudio Wilma Hoofdstraat 110 Grootegast'
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-amber-900 uppercase">
            Openingstijden & Bereikbaarheid
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-2 text-balance">
            Kom gezellig langs of neem contact met ons op.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            U vindt onze salon in het gezellige dorpscentrum van Grootegast. Parkeren is gratis en direct voor de deur mogelijk.
          </p>
        </div>

        {/* 2-Column Grid: Hours Table on Left, Contact & Map Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Weekly Schedule */}
          <div className="lg:col-span-6 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-amber-900" />
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Openingstijden Kapsalon
              </h3>
            </div>

            <div className="divide-y divide-stone-200/80">
              {OPENING_HOURS.map((item) => {
                const isToday = item.dayIndex === currentDayIndex;
                return (
                  <div
                    key={item.day}
                    className={`py-3.5 flex items-center justify-between text-xs sm:text-sm transition-colors ${
                      isToday ? 'bg-amber-100/60 -mx-3 px-3 rounded-lg font-medium text-amber-950' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold w-24">{item.day}</span>
                      {isToday && (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded uppercase">
                          Vandaag
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      {item.isClosed ? (
                        <span className="text-stone-400 italic">Gesloten</span>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="tabular-nums block">{item.morning}</span>
                          <span className="tabular-nums text-stone-500 block">{item.afternoon}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500 space-y-2">
              <p>
                <strong>Tussen de middag:</strong> Dinsdag t/m vrijdag lunchpauze van 12:00 tot 13:00 uur.
              </p>
              <p>
                <strong>Woensdagmiddag:</strong> Speciale actie kinderknippen voor slechts € 19,00!
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={onOpenBooking}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-amber-900 rounded-lg hover:bg-amber-800 transition-colors shadow-2xs cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan uw bezoek online in</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contact Details, Map & Practicalities */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-5">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Contact & Adresgegevens
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Adres</strong>
                    <span className="text-stone-600 block">{SALON_INFO.address.street}</span>
                    <span className="text-stone-600 block">{SALON_INFO.address.postalCode} {SALON_INFO.address.city}</span>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-800 mt-1"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Telefoonnummer</strong>
                    <a
                      href={`tel:${SALON_INFO.contact.phoneRaw}`}
                      className="text-amber-900 hover:text-amber-800 font-semibold text-base transition-colors"
                    >
                      {SALON_INFO.contact.phone}
                    </a>
                    <span className="text-xs text-stone-500 block mt-0.5">
                      Tijdens openingstijden direct bereikbaar
                    </span>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">E-mailadres</strong>
                    <a
                      href={`mailto:${SALON_INFO.contact.email}`}
                      className="text-stone-700 hover:text-amber-900 transition-colors"
                    >
                      {SALON_INFO.contact.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Practical Badges */}
              <div className="pt-4 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>Gratis parkeren voor de deur</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>Pinnen en contant betalen</span>
                </div>
              </div>
            </div>

            {/* Map Visual / Location Box */}
            <div className="rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs bg-stone-100 relative group">
              <div className="p-6 bg-gradient-to-br from-stone-900 to-stone-800 text-white flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-medium uppercase tracking-wider mb-2">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Grootegast Centrum</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold">
                    Hoofdstraat 110, Grootegast
                  </h4>
                  <p className="text-xs text-stone-300 mt-1">
                    Gunstig gelegen en eenvoudig bereikbaar vanuit Sebaldeburen, Doezum, Lutjegast en Marum.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs text-stone-400">
                    Kapsalon Hairstudio Wilma
                  </span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-300 hover:bg-amber-200 rounded-md transition-colors shadow-xs"
                  >
                    <span>Routebeschrijving</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
