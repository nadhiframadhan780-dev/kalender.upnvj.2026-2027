import React from 'react';
import { CATEGORIES, EventCategory } from '../data/calendarData';

interface ColorLegendProps {
  selectedCategory: EventCategory | 'all';
  onSelectCategory: (category: EventCategory | 'all') => void;
}

export const ColorLegend: React.FC<ColorLegendProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const legendItems: { category: EventCategory; label: string; sampleBg: string; border: string }[] = [
    { category: 'krs', label: 'Pengisian KRS & P-KRS', sampleBg: 'bg-sky-200 text-sky-900', border: 'border-sky-400' },
    { category: 'kuliah', label: 'Kegiatan Perkuliahan', sampleBg: 'bg-emerald-200 text-emerald-950', border: 'border-emerald-400' },
    { category: 'libur_kuliah', label: 'Libur Perkuliahan', sampleBg: 'bg-yellow-200 text-yellow-950', border: 'border-yellow-400' },
    { category: 'libur_nasional', label: 'Hari Libur Nasional', sampleBg: 'bg-rose-200 text-rose-950', border: 'border-rose-400' },
    { category: 'wisuda', label: 'Wisuda (tentatif)', sampleBg: 'bg-fuchsia-200 text-fuchsia-950', border: 'border-fuchsia-400' },
    { category: 'uts', label: 'UTS (Ujian Tengah Smt)', sampleBg: 'bg-orange-200 text-orange-950', border: 'border-orange-400' },
    { category: 'minggu_tenang', label: 'Minggu Tenang', sampleBg: 'bg-amber-300 text-amber-950', border: 'border-amber-600' },
    { category: 'uas', label: 'UAS (Ujian Akhir Smt)', sampleBg: 'bg-slate-300 text-slate-900', border: 'border-slate-400' },
    { category: 'pkkmb', label: 'PKKMB Maba', sampleBg: 'bg-yellow-300 text-yellow-950', border: 'border-yellow-500' },
    { category: 'dies_natalis', label: 'Dies Natalis / Hari Besar', sampleBg: 'bg-amber-400 text-slate-900', border: 'border-amber-600' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Keterangan Penanda Warna (Sesuai SK Resmi Rektor UPNVJ)
          </h3>
        </div>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline active:scale-95 text-left"
          >
            Tampilkan Semua Kategori (Reset)
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {legendItems.map((item) => {
          const isSelected = selectedCategory === item.category;
          return (
            <button
              key={item.category}
              onClick={() => onSelectCategory(isSelected ? 'all' : item.category)}
              className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border text-left transition-all ${
                isSelected 
                  ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/30 font-semibold' 
                  : 'border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] font-black border shadow-2xs ${item.sampleBg} ${item.border}`}>
                12
              </span>
              <span className="text-[11px] leading-tight text-slate-700 font-medium truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
