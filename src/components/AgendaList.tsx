import React, { useRef, useEffect } from 'react';
import { 
  AcademicEvent, 
  CATEGORIES, 
  EventCategory 
} from '../data/calendarData';
import { 
  Search, 
  Calendar as CalendarIcon, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  GraduationCap,
  ShieldAlert,
  Award,
  Users
} from 'lucide-react';

interface AgendaListProps {
  events: AcademicEvent[];
  selectedSemester: 'ganjil' | 'genap' | 'all';
  activeCategory: EventCategory | 'all';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  highlightedEventId: string | null;
  onSelectEvent: (event: AcademicEvent) => void;
}

export const AgendaList: React.FC<AgendaListProps> = ({
  events,
  selectedSemester,
  activeCategory,
  searchQuery,
  setSearchQuery,
  highlightedEventId,
  onSelectEvent,
}) => {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-scroll to highlighted event when user clicks a date on calendar
  useEffect(() => {
    if (highlightedEventId && itemRefs.current[highlightedEventId]) {
      itemRefs.current[highlightedEventId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [highlightedEventId]);

  // Filter events based on semester, category, and search query
  const filteredEvents = events.filter((evt) => {
    // Semester filter
    if (selectedSemester !== 'all') {
      if (evt.semester !== 'both' && evt.semester !== selectedSemester) {
        return false;
      }
    }

    // Category filter
    if (activeCategory !== 'all') {
      if (evt.category !== activeCategory) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchDesc = evt.description.toLowerCase().includes(q);
      const matchDate = evt.dateStr.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchDate) return false;
    }

    return true;
  });

  // Group filtered events by section
  const akademikEvents = filteredEvents.filter(e => e.type === 'akademik');
  const mutuEvents = filteredEvents.filter(e => e.type === 'penjaminan_mutu');
  const liburEvents = filteredEvents.filter(e => e.type === 'libur');
  const mabaEvents = filteredEvents.filter(e => e.type === 'maba');

  const createGoogleCalendarLink = (evt: AcademicEvent) => {
    const title = encodeURIComponent(evt.title + ' - UPNVJ');
    const details = encodeURIComponent(`${evt.description}\n\nResmi SK Rektor UPN "Veteran" Jakarta No. 919/UN61/HK.03.01/2026`);
    const location = encodeURIComponent('UPN "Veteran" Jakarta, Kampus Bela Negara');
    const start = evt.startDate.replace(/-/g, '');
    const [y, m, d] = evt.endDate.split('-').map(Number);
    const endObj = new Date(Date.UTC(y, m - 1, d + 1));
    const end = `${endObj.getUTCFullYear()}${String(endObj.getUTCMonth() + 1).padStart(2, '0')}${String(endObj.getUTCDate()).padStart(2, '0')}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  const renderEventCard = (evt: AcademicEvent) => {
    const cat = CATEGORIES[evt.category];
    const isSelected = highlightedEventId === evt.id;

    return (
      <div
        key={evt.id}
        ref={(el) => { itemRefs.current[evt.id] = el; }}
        onClick={() => onSelectEvent(evt)}
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative ${
          isSelected
            ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
            : 'bg-white border-slate-200/90 hover:border-emerald-300 hover:shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
          {/* Category badge & Semester */}
          <div className="flex items-center flex-wrap gap-1.5">
            <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md ${cat.bgClass} ${cat.textClass} border ${cat.borderClass}`}>
              {cat.badgeLabel}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {evt.semester === 'both' ? 'Smt Ganjil & Genap' : evt.semester === 'ganjil' ? 'Smt Ganjil' : 'Smt Genap'}
            </span>
            {evt.isImportantDeadline && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-600" />
                Tenggat Penting
              </span>
            )}
          </div>

          {/* Date Badge */}
          <div className="flex items-center gap-1 text-emerald-800 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 self-start sm:self-auto flex-shrink-0">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-700" />
            <span>{evt.dateStr}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className={`text-sm font-bold leading-snug ${isSelected ? 'text-amber-950' : 'text-slate-900'}`}>
          {evt.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {evt.description}
        </p>

        {/* Quick Footer Action */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[11px] text-emerald-700 font-semibold group flex items-center gap-1">
            <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-600' : 'text-emerald-600'}`} />
            {isSelected ? 'Sedang Disorot di Kalender' : 'Klik untuk lihat di Kalender'}
          </span>

          <a
            href={createGoogleCalendarLink(evt)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[11px] text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-medium transition-colors hover:underline no-print"
            title="Tambahkan ke Google Calendar Anda"
          >
            <span>+ Google Calendar</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col h-full shadow-xs">
      {/* Header and Search */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-2">
              <span>Penjelasan & Rincian Agenda</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {filteredEvents.length} Agenda
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Sinkron otomatis dengan tanggal kalender di sisi kiri
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari agenda (misal: KRS, UTS, UKT, Wisuda, Yudisium)..."
            className="w-full pl-9 pr-4 py-2 bg-white text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Events Container */}
      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
            <p className="text-sm font-semibold text-slate-600">Tidak ada agenda yang cocok</p>
            <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci pencarian atau reset filter kategori.</p>
          </div>
        ) : (
          <>
            {/* Section 1: Kegiatan Akademik */}
            {akademikEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2.5 pb-1 border-b border-emerald-200">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                    Kegiatan Akademik ({akademikEvents.length})
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {akademikEvents.map(renderEventCard)}
                </div>
              </div>
            )}

            {/* Section 2: Penjaminan Mutu */}
            {mutuEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2.5 pb-1 border-b border-teal-200">
                  <Award className="w-4 h-4 text-teal-700" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-teal-950">
                    Kegiatan Penjaminan Mutu ({mutuEvents.length})
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {mutuEvents.map(renderEventCard)}
                </div>
              </div>
            )}

            {/* Section 3: Hari Libur & Hari Besar */}
            {liburEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2.5 pb-1 border-b border-rose-200">
                  <ShieldAlert className="w-4 h-4 text-rose-700" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-rose-950">
                    Hari Libur Nasional & Peringatan Kampus ({liburEvents.length})
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {liburEvents.map(renderEventCard)}
                </div>
              </div>
            )}

            {/* Section 4: Kegiatan Penerimaan Mahasiswa Baru */}
            {mabaEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2.5 pb-1 border-b border-indigo-200">
                  <Users className="w-4 h-4 text-indigo-700" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-indigo-950">
                    Kegiatan Mahasiswa Baru (SNPMB & SEMA) ({mabaEvents.length})
                  </h4>
                </div>
                <div className="space-y-2.5">
                  {mabaEvents.map(renderEventCard)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
