import { useState } from 'react';
import { Phone, Calendar, Menu, X, Scissors } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Behandelingen', href: '#behandelingen' },
    { label: 'Prijzen', href: '#tarieven' },
    { label: 'Over Ons', href: '#over-ons' },
    { label: 'Impressie', href: '#impressie' },
    { label: 'Openingstijden & Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Exactly 3 Zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand wordmark (single element, clean display face) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-stone-900 group whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-sm"
          >
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 transition-transform group-hover:scale-105">
              <Scissors className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
              {SALON_INFO.name}
            </span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-amber-800/40"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + telephone call affordance */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${SALON_INFO.contact.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100/90 rounded-md hover:bg-stone-200 transition-colors whitespace-nowrap shrink-0"
              title="Bel de salon direct"
            >
              <Phone className="w-3.5 h-3.5 text-amber-800" />
              <span>{SALON_INFO.contact.phone}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-amber-900 rounded-md hover:bg-amber-800 transition-all shadow-sm active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Afspraak Maken</span>
            </button>

            {/* Mobile burger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              aria-label="Menu openen"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200/80 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-900 hover:bg-stone-100 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-stone-200/60 flex flex-col gap-2">
              <a
                href={`tel:${SALON_INFO.contact.phoneRaw}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-800 bg-stone-100 rounded-md"
              >
                <Phone className="w-4 h-4 text-amber-800" />
                <span>Bel direct: {SALON_INFO.contact.phone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-900 rounded-md hover:bg-amber-800 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Online Afspraak Plannen</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
