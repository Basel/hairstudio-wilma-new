import { REVIEWS, SALON_INFO } from '../data/salonData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export function ReviewsSection() {
  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with 1Kapper Score Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-amber-900 uppercase">
              Ervaringen van Klanten
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-2 text-balance">
              Wat onze gasten zeggen over Hairstudio Wilma.
            </h2>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs shrink-0">
            <div className="w-12 h-12 rounded-lg bg-amber-900 text-amber-100 flex flex-col items-center justify-center font-bold">
              <span className="font-serif text-lg leading-none">{SALON_INFO.rating.score}</span>
              <span className="text-[10px] uppercase font-sans tracking-tight">/ 10</span>
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-stone-800 mt-0.5">
                {SALON_INFO.rating.totalReviews}+ reviews op 1Kapper.nl
              </p>
              <p className="text-[11px] text-stone-500">
                Geverifieerde klantervaringen
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-serif font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                    {review.rating}/10
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900">{review.author}</span>
                  <span className="text-stone-400">{review.residence}</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Behandeling: {review.service}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
