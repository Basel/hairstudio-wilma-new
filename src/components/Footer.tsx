import { Scissors, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Scissors className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {SALON_INFO.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Jouw vertrouwde kapsalon in het hart van Grootegast. Voor dames, heren en kinderen die houden van persoonlijke aandacht, vakkennis en een ontspannen sfeer.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p>📍 {SALON_INFO.address.street}, {SALON_INFO.address.postalCode} {SALON_INFO.address.city}</p>
              <p>📞 <a href={`tel:${SALON_INFO.contact.phoneRaw}`} className="text-amber-300 hover:underline">{SALON_INFO.contact.phone}</a></p>
              <p>✉️ <a href={`mailto:${SALON_INFO.contact.email}`} className="hover:text-white transition-colors">{SALON_INFO.contact.email}</a></p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Navigatie
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#behandelingen" className="text-stone-400 hover:text-white transition-colors">
                  Behandelingen
                </a>
              </li>
              <li>
                <a href="#tarieven" className="text-stone-400 hover:text-white transition-colors">
                  Prijslijst
                </a>
              </li>
              <li>
                <a href="#over-ons" className="text-stone-400 hover:text-white transition-colors">
                  Over Hairstudio Wilma
                </a>
              </li>
              <li>
                <a href="#impressie" className="text-stone-400 hover:text-white transition-colors">
                  Foto Impressie
                </a>
              </li>
              <li>
                <a href="#contact" className="text-stone-400 hover:text-white transition-colors">
                  Openingstijden & Route
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours Summary */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Beknopte Openingstijden
            </h4>
            <div className="text-xs text-stone-400 space-y-1.5">
              <div className="flex justify-between">
                <span>Dinsdag t/m Vrijdag:</span>
                <span className="text-stone-300 font-mono">09:00–12:00 & 13:00–18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Zaterdag:</span>
                <span className="text-stone-300 font-mono">09:00 – 13:00</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Zondag & Maandag:</span>
                <span className="italic">Gesloten</span>
              </div>
              <p className="pt-2 text-[11px] text-amber-400/90">
                🎉 Woensdag: Speciale kinderkorting (€ 19,00)
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {SALON_INFO.name} · Grootegast. Alle rechten voorbehouden.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Naar boven</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
