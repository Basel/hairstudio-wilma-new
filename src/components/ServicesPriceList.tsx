import { useState } from 'react';
import { TREATMENTS } from '../data/salonData';
import { Treatment } from '../types';
import { Check, Plus, Scissors, Sparkles, Clock, Calendar } from 'lucide-react';

interface ServicesPriceListProps {
  onSelectTreatmentsForBooking: (selectedIds: string[]) => void;
}

export function ServicesPriceList({ onSelectTreatmentsForBooking }: ServicesPriceListProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'cut' | 'color' | 'perm' | 'specials'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tabs = [
    { id: 'all', label: 'Alle Behandelingen' },
    { id: 'cut', label: 'Knippen & Stylen' },
    { id: 'color', label: 'Kleuren & Highlights' },
    { id: 'perm', label: 'Permanent & Vorm' },
    { id: 'specials', label: 'Specials & Vlechten' },
  ];

  const filteredTreatments = activeTab === 'all'
    ? TREATMENTS
    : TREATMENTS.filter((t) => t.category === activeTab);

  const toggleSelectTreatment = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedTreatments = TREATMENTS.filter((t) => selectedIds.includes(t.id));
  const totalPrice = selectedTreatments.reduce((sum, t) => sum + t.priceNum, 0);

  return (
    <section id="behandelingen" className="py-16 sm:py-24 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div id="tarieven" className="max-w-3xl mb-10 scroll-mt-24">
          <p className="text-xs font-semibold tracking-wider text-amber-900 uppercase">
            Behandelingen & Eerlijke Tarieven
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-2 text-balance">
            Heldere prijzen, vakkundige zorg voor uw haar.
          </h2>
          <p className="text-base text-stone-600 mt-3">
            Alle behandelingen zijn inclusief persoonlijk stijladvies en gebruik van professionele haarverzorgingsproducten. 
            Selecteer behandelingen om een prijsinschatting te zien of direct mee te nemen in uw afspraak.
          </p>
        </div>

        {/* Filter Tabs (Interactive buttons) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 rounded-xl max-w-fit mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Treatment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {filteredTreatments.map((treatment) => {
            const isSelected = selectedIds.includes(treatment.id);
            return (
              <div
                key={treatment.id}
                className={`relative rounded-xl border p-5 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-700 bg-amber-50/40 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-stone-900 text-base">
                          {treatment.name}
                        </h3>
                        {treatment.popular && (
                          <span className="text-[11px] font-medium text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                            Populair
                          </span>
                        )}
                      </div>
                      
                      {/* Quiet metadata line without pills */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                        <span>{treatment.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{treatment.duration}</span>
                        </span>
                      </div>
                    </div>

                    {/* Price with tabular numerals */}
                    <div className="text-right shrink-0">
                      <span className="font-serif text-lg sm:text-xl font-bold text-stone-900 tabular-nums">
                        {treatment.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                    {treatment.description}
                  </p>

                  {treatment.note && (
                    <p className="text-xs font-medium text-amber-800 mt-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>{treatment.note}</span>
                    </p>
                  )}
                </div>

                {/* Bottom action inside card */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-400">
                    Incl. wassen & verzorging waar van toepassing
                  </span>

                  <button
                    onClick={() => toggleSelectTreatment(treatment.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-900 text-white hover:bg-amber-800'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Geselecteerd</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Selecteer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Treatments Summary Bar (Sticky or bottom summary if items chosen) */}
        {selectedIds.length > 0 && (
          <div className="mt-8 p-5 bg-stone-900 text-white rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div>
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-amber-400" />
                <h4 className="font-semibold text-sm sm:text-base">
                  {selectedIds.length} {selectedIds.length === 1 ? 'behandeling' : 'behandelingen'} geselecteerd
                </h4>
              </div>
              <p className="text-xs text-stone-300 mt-1">
                {selectedTreatments.map((t) => t.name).join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
              <div className="text-left md:text-right">
                <span className="text-xs text-stone-400 block">Geschatte totaalprijs</span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-amber-300 tabular-nums">
                  v.a. € {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                onClick={() => onSelectTreatmentsForBooking(selectedIds)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Afspraak Plannen</span>
              </button>
            </div>
          </div>
        )}

        {/* Reassurance note */}
        <div className="mt-10 p-5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-stone-600">
          <div>
            <strong className="text-stone-900">Twijfelt u over de juiste behandeling of kleuring?</strong>
            <p className="text-stone-500 mt-0.5">
              Kom gerust even langs aan de Hoofdstraat 110 of bel ons voor vrijblijvend advies op maat.
            </p>
          </div>
          <a
            href="tel:0594613029"
            className="font-semibold text-amber-900 hover:text-amber-800 whitespace-nowrap underline underline-offset-4"
          >
            Bel 0594 – 613029
          </a>
        </div>

      </div>
    </section>
  );
}
