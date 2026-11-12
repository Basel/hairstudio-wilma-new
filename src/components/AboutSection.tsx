```tsx
import { CheckCircle2, Heart, Award, Users, Coffee } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import stylingImage from '../assets/images/styling_craft_action_1794477311576.jpg';

export function AboutSection() {
  const highlights = [
    {
      icon: Heart,
      title: 'Echt de tijd voor u',
      description: 'Geen haastwerk of lopende band. We luisteren naar uw wensen en stemmen het kapsel af op uw levensstijl en haarstructuur.',
    },
    {
      icon: Award,
      title: 'Ervaren vakmanschap',
      description: 'Van moderne folies en zachte balayage tot strakke herensnitten en duurzame permanenten. Vakkennis met liefde voor het vak.',
    },
    {
      icon: Users,
      title: 'Voor de hele familie',
      description: 'Zowel dames, heren als kinderen zijn van harte welkom. Speciaal voor de kleintjes met geduldige en vrolijke aandacht.',
    },
    {
      icon: Coffee,
      title: 'Dorpsgevoel met verse koffie',
      description: 'Een ontspannen moment voor uzelf in het centrum van Grootegast, inclusief gratis parkeren direct voor de deur.',
    },
  ];

  return (
    <section id="over-ons" className="py-16 sm:py-24 bg-stone-100/50 border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image showcase with craftsmanship photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-md border border-stone-200/80 bg-white">
                <img
                  src={stylingImage}
                  alt="Vakmanschap en precisie bij Hairstudio Wilma in Grootegast"
                  className="w-full aspect-4/5 object-cover object-center"
                />
              </div>

              {/* Little trust stamp */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-xl border border-stone-200 shadow-lg max-w-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 font-serif font-bold text-sm">
                    9.2
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900">Beoordeeld met een 9,2</p>
                    <p className="text-[11px] text-stone-500">op 1Kapper.nl (50+ klantervaringen)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-amber-900 uppercase">
                Over Hairstudio Wilma
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-2 text-balance">
                Een warm welkom en passie voor mooi, gezond haar.
              </h2>
            </div>

            <p className="text-stone-600 text-base leading-relaxed">
              Al vele jaren is Hairstudio Wilma gevestigd aan de vertrouwde <strong>Hoofdstraat 110 in Grootegast</strong>. 
              Bij ons stapt u binnen in een gezellige, ontspannen salon waar persoonlijke service voorop staat.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Of u nu komt voor een snelle bijpuntbeurt, een complete restyling, schitterende highlights of het 
              eerste knipbeurtje van uw kind: we zorgen ervoor dat u ontspannen in de stoel zit en met een 
              fris, zelfverzekerd gevoel de salon verlaat.
            </p>

            {/* 4 Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                      <Icon className="w-4 h-4 text-amber-800" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Practical information snippet */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-500">
              <span className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Geen wachttijden bij afspraak</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pinnen & contant mogelijk</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Rolstoeltoegankelijk</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
```
