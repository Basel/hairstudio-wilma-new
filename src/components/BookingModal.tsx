import { useState, useEffect } from 'react';
import { TREATMENTS, SALON_INFO } from '../data/salonData';
import { X, Calendar, Clock, Phone, CheckCircle2, Scissors, ArrowRight, ExternalLink } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedTreatmentIds?: string[];
}

export function BookingModal({
  isOpen,
  onClose,
  preSelectedTreatmentIds = [],
}: BookingModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [preferredDay, setPreferredDay] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preSelectedTreatmentIds.length > 0) {
      setSelectedIds(preSelectedTreatmentIds);
    }
  }, [preSelectedTreatmentIds]);

  if (!isOpen) return null;

  const toggleTreatment = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedTreatments = TREATMENTS.filter((t) => selectedIds.includes(t.id));
  const estimatedTotal = selectedTreatments.reduce((sum, t) => sum + t.priceNum, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Vul alstublieft uw naam in';
    if (!phone.trim()) newErrors.phone = 'Vul alstublieft uw telefoonnummer in';
    if (selectedIds.length === 0) newErrors.treatments = 'Kies minimaal één gewenste behandeling';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setSelectedIds([]);
    setPreferredDay('');
    setPreferredTime('morning');
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-stone-50">
          <div>
            <span className="text-xs font-semibold text-amber-900 tracking-wider uppercase block">
              Afspraak Inplannen
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Welkom bij Hairstudio Wilma
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            /* Confirmation State */
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Hartelijk dank, {name}!
                </h4>
                <p className="text-stone-600 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  Uw afspraakverzoek is goed ontvangen. We nemen zo snel mogelijk telefonisch of per e-mail contact met u op via <strong>{phone}</strong> om het tijdstip definitief te bevestigen.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Gekozen behandeling(en):</span>
                  <span className="font-medium text-stone-900 text-right">
                    {selectedTreatments.map((t) => t.name).join(', ')}
                  </span>
                </div>
                {preferredDay && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Voorkeursdag:</span>
                    <span className="font-medium text-stone-900">{preferredDay}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Dagdeel:</span>
                  <span className="font-medium text-stone-900">
                    {preferredTime === 'morning' ? 'Ochtend (09:00 – 12:00)' : 'Middag (13:00 – 18:00)'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 font-semibold text-stone-900">
                  <span>Indicatie totaal:</span>
                  <span className="tabular-nums font-serif text-sm">€ {estimatedTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-amber-900 text-white rounded-lg text-sm font-semibold hover:bg-amber-800 transition-colors cursor-pointer"
                >
                  Sluiten
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Booking Form */
            <div className="space-y-6">
              
              {/* Option to book on 1Kapper directly */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-amber-950 font-medium">
                  <Calendar className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Real-time agenda bekijken via 1Kapper.nl?</span>
                </div>
                <a
                  href="https://www.1kapper.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-900 text-white font-semibold rounded-md hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  <span>Naar 1Kapper</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* 1. Choose Treatments */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    1. Selecteer gewenste behandeling(en) *
                  </label>
                  {errors.treatments && (
                    <p className="text-xs text-red-600 mb-2 font-medium">{errors.treatments}</p>
                  )}
                  <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-stone-50 rounded-xl border border-stone-200">
                    {TREATMENTS.map((t) => {
                      const checked = selectedIds.includes(t.id);
                      return (
                        <div
                          key={t.id}
                          onClick={() => toggleTreatment(t.id)}
                          className={`p-2.5 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors ${
                            checked ? 'bg-white shadow-2xs font-medium text-stone-900 border border-amber-800/30' : 'hover:bg-stone-200/50 text-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {}} // handled by parent div
                              className="accent-amber-900 rounded"
                            />
                            <span>{t.name}</span>
                          </div>
                          <span className="font-serif font-semibold tabular-nums text-stone-900">{t.price}</span>
                        </div>
                      );
                    })}
                  </div>

                  {selectedTreatments.length > 0 && (
                    <div className="mt-2 flex items-center justify-between text-xs text-stone-600 px-1">
                      <span>{selectedTreatments.length} geselecteerd</span>
                      <span className="font-semibold text-stone-900">
                        Geschat: € {estimatedTotal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Preferred Date & Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      2. Voorkeursdatum
                    </label>
                    <input
                      type="date"
                      value={preferredDay}
                      onChange={(e) => setPreferredDay(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Voorkeursdagdeel
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white"
                    >
                      <option value="morning">Ochtend (09:00 – 12:00)</option>
                      <option value="afternoon">Middag (13:00 – 18:00)</option>
                      <option value="saturday">Zaterdagochtend (09:00 – 13:00)</option>
                    </select>
                  </div>
                </div>

                {/* 3. Contact Details */}
                <div className="space-y-3 pt-2 border-t border-stone-200">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                    3. Uw contactgegevens
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Uw volledige naam *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-800 ${
                          errors.name ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                        }`}
                      />
                      {errors.name && <span className="text-[11px] text-red-600">{errors.name}</span>}
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Telefoonnummer *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-800 ${
                          errors.phone ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                        }`}
                      />
                      {errors.phone && <span className="text-[11px] text-red-600">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder="E-mailadres (optioneel)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />

                    <input
                      type="text"
                      placeholder="Opmerking (bijv. haarlengte of voorkeur)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />
                  </div>
                </div>

                {/* Submit action */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Phone className="w-3.5 h-3.5 text-amber-900" />
                    <span>Spoed of liever bellen? Bel <a href="tel:0594613029" className="font-semibold text-stone-800 underline">0594 – 613029</a></span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-amber-900 hover:bg-amber-800 rounded-lg transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                  >
                    <span>Afspraakverzoek Versturen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
