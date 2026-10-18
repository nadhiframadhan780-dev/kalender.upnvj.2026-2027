import React from 'react';
import { MonthDefinition, CalendarDayInfo, getCategoryInfo, EventCategory, AcademicEvent } from '../data/calendarData';
import { Info, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarMonthProps {
  month: MonthDefinition;
  selectedDateStr: string | null;
  highlightedEventId: string | null;
  selectedCategory: EventCategory | 'all';
  onSelectDate: (day: CalendarDayInfo) => void;
  onSelectEvent: (event: AcademicEvent) => void;
}

export const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  selectedDateStr,
  highlightedEventId,
  selectedCategory,
  onSelectDate,
  onSelectEvent,
}) => {
  const dayNames = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
  const dayFullNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // Helper for cell styles based on category
  const getCategoryStyles = (category?: EventCategory) => {
    switch (category) {
      case 'krs':
        return 'bg-sky-200 text-sky-950 border-sky-400 font-bold';
      case 'kuliah':
        return 'bg-emerald-200 text-emerald-950 border-emerald-400 font-bold';
      case 'libur_kuliah':
        return 'bg-yellow-200 text-yellow-950 border-yellow-400 font-bold';
      case 'libur_nasional':
        return 'bg-rose-300 text-rose-950 border-rose-500 font-black';
      case 'wisuda':
        return 'bg-fuchsia-300 text-fuchsia-950 border-fuchsia-500 font-black ring-1 ring-fuchsia-400';
      case 'uts':
        return 'bg-orange-300 text-orange-950 border-orange-500 font-black';
      case 'minggu_tenang':
        return 'bg-amber-300 text-amber-950 border-amber-600 font-black';
      case 'uas':
        return 'bg-slate-300 text-slate-900 border-slate-500 font-black';
      case 'pkkmb':
        return 'bg-yellow-300 text-yellow-950 border-yellow-500 font-black';
      case 'dies_natalis':
        return 'bg-amber-400 text-amber-950 border-amber-600 font-black';
      default:
        return 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Month Card Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 px-4 py-2.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-amber-300" />
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-amber-300">
            {month.name}
          </h3>
        </div>
        <span className="text-[11px] font-semibold bg-emerald-700/60 text-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
          {month.semester === 'ganjil' ? 'Semester Ganjil' : 'Semester Genap'}
        </span>
      </div>

      {/* Calendar Grid Table */}
      <div className="p-3 flex-1 flex flex-col">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-bold text-slate-600">
              <th className="py-1.5 px-1 text-[10px] uppercase tracking-wider bg-slate-100/90 text-slate-700 border-r border-slate-200 rounded-tl-lg w-16">
                Minggu
              </th>
              {dayNames.map((d, idx) => (
                <th
                  key={idx}
                  title={dayFullNames[idx]}
                  className={`py-1.5 px-0.5 text-xs font-extrabold ${
                    idx === 0 ? 'text-rose-600 bg-rose-50/70' : 'text-slate-700 bg-slate-50/70'
                  }`}
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {month.weeks.map((week, wIdx) => (
              <tr key={wIdx} className="border-b border-slate-100 last:border-b-0">
                {/* Week Column label matching official PDF */}
                <td className="py-1 px-1 bg-slate-50/80 text-[10px] font-bold text-slate-700 border-r border-slate-200 select-none">
                  {week.weekLabel ? (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/80 inline-block font-extrabold">
                      {week.weekLabel}
                    </span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>

                {/* Day cells */}
                {week.days.map((day, dIdx) => {
                  if (!day) {
                    return (
                      <td key={dIdx} className="p-0.5 bg-slate-50/30">
                        <div className="w-full h-8 sm:h-9"></div>
                      </td>
                    );
                  }

                  const isSelected = selectedDateStr === day.dateStr;
                  const isEventHighlighted = Boolean(
                    highlightedEventId && day.events.some(e => e.id === highlightedEventId)
                  );
                  const isCategoryFilterMatch = 
                    selectedCategory === 'all' || day.category === selectedCategory;

                  const opacityClass = isCategoryFilterMatch ? 'opacity-100' : 'opacity-30';
                  const baseStyle = getCategoryStyles(day.category);

                  const ringClass = isSelected
                    ? 'ring-3 ring-emerald-600 shadow-md scale-105 z-10 font-black'
                    : isEventHighlighted
                    ? 'ring-3 ring-amber-500 animate-pulse scale-105 z-10'
                    : '';

                  return (
                    <td key={dIdx} className="p-0.5">
                      <button
                        type="button"
                        onClick={() => onSelectDate(day)}
                        className={`w-full h-8 sm:h-9 rounded-lg border text-xs flex flex-col items-center justify-center relative transition-all active:scale-95 ${baseStyle} ${ringClass} ${opacityClass}`}
                        title={
                          day.events.length > 0 
                            ? day.events.map(e => e.title).join(' | ') 
                            : `${day.date} ${month.name}`
                        }
                      >
                        <span className={dIdx === 0 && !day.category ? 'text-rose-600 font-bold' : ''}>
                          {day.date}
                        </span>

                        {/* Multi-event indicator */}
                        {day.events.length > 1 && (
                          <div className="flex gap-0.5 absolute bottom-0.5">
                            <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                            <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                          </div>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Quick Month Footnote / Key Dates based on PDF */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 mb-1 text-emerald-800 font-bold">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] uppercase tracking-wider">Catatan Penting Bulan Ini:</span>
          </div>
          <div className="space-y-1">
            {month.events && month.events.length > 0 ? (
              month.events.map((evt) => {
                const cat = getCategoryInfo(evt?.category);
                const isEvtSelected = highlightedEventId === evt.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => onSelectEvent(evt)}
                    className={`w-full text-left p-1 rounded-lg transition-colors flex items-start gap-1.5 text-[11px] leading-tight ${
                      isEvtSelected ? 'bg-amber-100 text-amber-950 font-semibold' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${cat?.dotColor || 'bg-emerald-500'}`}></span>
                    <span className="font-semibold text-slate-900 flex-shrink-0">{evt.dateStr.split(' ')[0]}:</span>
                    <span className="line-clamp-1">{evt.title}</span>
                  </button>
                );
              })
            ) : (
              <p className="text-[11px] text-slate-400 italic">Tidak ada agenda khusus</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
