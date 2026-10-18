import React from 'react';
import { AcademicEvent, CalendarDayInfo, getCategoryInfo } from '../data/calendarData';
import { Calendar, Clock, X, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface EventDetailModalProps {
  dayInfo: CalendarDayInfo | null;
  onClose: () => void;
  onSelectEvent: (event: AcademicEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  dayInfo,
  onClose,
  onSelectEvent,
}) => {
  if (!dayInfo) return null;

  // Format date readable in Indonesian
  const [y, m, d] = dayInfo.dateStr.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const fullDateIndo = dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const createGoogleCalendarLink = (evt: AcademicEvent) => {
    const title = encodeURIComponent(evt.title + ' - UPNVJ');
    const details = encodeURIComponent(`${evt.description}\n\nResmi SK Rektor UPN "Veteran" Jakarta No. 919/UN61/HK.03.01/2026`);
    const location = encodeURIComponent('UPN "Veteran" Jakarta');
    const start = evt.startDate.replace(/-/g, '');
    const [ey, em, ed] = evt.endDate.split('-').map(Number);
    const endObj = new Date(Date.UTC(ey, em - 1, ed + 1));
    const end = `${endObj.getUTCFullYear()}${String(endObj.getUTCMonth() + 1).padStart(2, '0')}${String(endObj.getUTCDate()).padStart(2, '0')}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex flex-col items-center justify-center font-black shadow-md flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-emerald-200">
              {dateObj.toLocaleDateString('id-ID', { month: 'short' })}
            </span>
            <span className="text-xl leading-none">
              {dayInfo.date}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Rincian Tanggal
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight mt-1">
              {fullDateIndo}
            </h3>
            <p className="text-xs text-slate-500">
              Kalender Akademik Resmi UPN "Veteran" Jakarta
            </p>
          </div>
        </div>

        {/* Coinciding Events */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {dayInfo.events.length === 0 ? (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-60" />
              <p className="text-xs font-semibold text-slate-700">Tidak ada agenda khusus pada tanggal ini.</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Hari perkuliahan atau hari kerja reguler universitas.
              </p>
            </div>
          ) : (
            dayInfo.events.map((evt) => {
              const cat = getCategoryInfo(evt.category);
              return (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${cat?.bgClass || 'bg-emerald-100'} ${cat?.textClass || 'text-emerald-950'} border ${cat?.borderClass || 'border-emerald-300'}`}>
                      {cat?.badgeLabel || 'Akademik'}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {evt.dateStr}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {evt.title}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectEvent(evt);
                        onClose();
                      }}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Sorot di Daftar Agenda
                    </button>

                    <a
                      href={createGoogleCalendarLink(evt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                    >
                      <span>Simpan di Google Cal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
