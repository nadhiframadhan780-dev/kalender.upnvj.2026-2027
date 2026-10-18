import React, { useState, useEffect } from 'react';
import { 
  MONTHS_DATA, 
  ALL_EVENTS, 
  MonthDefinition, 
  CalendarDayInfo, 
  AcademicEvent, 
  EventCategory 
} from './data/calendarData';
import { Header } from './components/Header';
import { UpcomingMilestones } from './components/UpcomingMilestones';
import { ColorLegend } from './components/ColorLegend';
import { CalendarMonth } from './components/CalendarMonth';
import { AgendaList } from './components/AgendaList';
import { EventDetailModal } from './components/EventDetailModal';
import { InstallModal } from './components/InstallModal';
import { ShareModal } from './components/ShareModal';
import { 
  Calendar, 
  ListFilter, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Award, 
  Building2, 
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [selectedSemester, setSelectedSemester] = useState<'ganjil' | 'genap' | 'all'>('ganjil');
  const [activeMonthIndex, setActiveMonthIndex] = useState<number | null>(0); // 0 = Agustus 2026
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive sync states
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(null);
  const [modalDayInfo, setModalDayInfo] = useState<CalendarDayInfo | null>(null);

  // Modals & PWA
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Mobile active tab view ('calendar' vs 'agenda')
  const [mobileViewTab, setMobileViewTab] = useState<'calendar' | 'agenda'>('calendar');

  // PWA beforeinstallprompt listener
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
      setIsInstallOpen(false);
    }
  };

  // Filter months according to active semester selection
  const displayedMonths = MONTHS_DATA.filter((m) => {
    if (selectedSemester === 'all') return true;
    return m.semester === selectedSemester;
  });

  // When clicking a date on the calendar:
  // 1. Highlight the date
  // 2. Open detail modal
  // 3. Highlight first coinciding event in the agenda list
  const handleSelectDate = (day: CalendarDayInfo) => {
    setSelectedDateStr(day.dateStr);
    setModalDayInfo(day);
    if (day.events.length > 0) {
      setHighlightedEventId(day.events[0].id);
    }
  };

  // When clicking an event in the agenda or milestone list:
  // 1. Find which month it belongs to and switch to that month or semester
  // 2. Highlight the event and its start date on calendar
  const handleSelectEvent = (evt: AcademicEvent) => {
    setHighlightedEventId(evt.id);
    setSelectedDateStr(evt.startDate);

    // If event is in different semester, switch to it automatically
    if (evt.semester !== 'both' && selectedSemester !== 'all' && evt.semester !== selectedSemester) {
      setSelectedSemester(evt.semester);
    }
    setActiveMonthIndex(evt.monthIndex);

    // On mobile, if in agenda view, suggest switching to calendar view or vice-versa
    if (window.innerWidth < 1024) {
      setMobileViewTab('calendar');
    }

    // Scroll to the specific month container
    const element = document.getElementById(`month-card-${evt.monthIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-800">
      {/* Top Header */}
      <Header 
        onOpenInstall={() => setIsInstallOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex-1 w-full">
        
        {/* Academic Milestones Tracker */}
        <UpcomingMilestones 
          events={ALL_EVENTS}
          onSelectEvent={handleSelectEvent}
        />

        {/* Official Decree Banner Card */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-5 sm:p-7 shadow-md mb-6 relative overflow-hidden border border-emerald-700/50">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <img src="/favicon.svg" alt="" className="w-96 h-96 object-contain" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold mb-3">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Universitas Pembangunan Nasional "Veteran" Jakarta</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight text-white mb-2 font-cinzel">
              KALENDER AKADEMIK TA 2026/2027
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
              Berdasarkan Keputusan Rektor UPN "Veteran" Jakarta Nomor: <strong className="text-amber-300 font-semibold">919/UN61/HK.03.01/2026</strong>, tanggal 2 Februari 2026. Berlaku bagi Program Sarjana, Diploma, dan Magister Kampus Bela Negara.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
              <span className="bg-emerald-800/80 px-3 py-1.5 rounded-xl border border-emerald-600/50 flex items-center gap-1.5 font-semibold text-emerald-200">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                Rektor: Prof. Dr. Anter Venus, MA.Comm
              </span>
              <span className="bg-emerald-800/80 px-3 py-1.5 rounded-xl border border-emerald-600/50 flex items-center gap-1.5 font-semibold text-emerald-200">
                <BookOpen className="w-4 h-4 text-emerald-300" />
                Semester Ganjil & Semester Genap
              </span>
            </div>
          </div>
        </div>

        {/* Color Legend (Official sk Rektor color code) */}
        <ColorLegend 
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* View Switcher Controls & Month Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-2xs mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Semester Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full md:w-auto">
              <button
                onClick={() => {
                  setSelectedSemester('ganjil');
                  setActiveMonthIndex(0);
                }}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedSemester === 'ganjil'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semester Ganjil (Ags 2026 - Jan 2027)
              </button>
              <button
                onClick={() => {
                  setSelectedSemester('genap');
                  setActiveMonthIndex(6);
                }}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedSemester === 'genap'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semester Genap (Feb 2027 - Jul 2027)
              </button>
              <button
                onClick={() => setSelectedSemester('all')}
                className={`flex-1 md:flex-none px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedSemester === 'all'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Seluruh Tahun
              </button>
            </div>

            {/* Mobile View Tab Switcher (Kalender vs Agenda) */}
            <div className="flex items-center lg:hidden w-full sm:w-auto bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setMobileViewTab('calendar')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mobileViewTab === 'calendar'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>Kalender</span>
              </button>
              <button
                onClick={() => setMobileViewTab('agenda')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mobileViewTab === 'agenda'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5 text-emerald-700" />
                <span>Daftar Agenda</span>
              </button>
            </div>

          </div>

          {/* Quick Month Pills */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
              Bulan:
            </span>
            {displayedMonths.map((m) => {
              const isActive = activeMonthIndex === m.monthIndex;
              return (
                <button
                  key={m.monthIndex}
                  onClick={() => {
                    setActiveMonthIndex(m.monthIndex);
                    const el = document.getElementById(`month-card-${m.monthIndex}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {m.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Synchronized Grid ("Disetarain supaya bacanya gampang") */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Calendar Months Grid (7 cols on desktop) */}
          <div className={`lg:col-span-7 space-y-6 ${mobileViewTab === 'agenda' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                  Kalender Bulan & Jadwal Mingguan
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Klik tanggal untuk rincian kegiatan
              </span>
            </div>

            {/* Grid of Months */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayedMonths.map((month) => (
                <div key={month.monthIndex} id={`month-card-${month.monthIndex}`}>
                  <CalendarMonth
                    month={month}
                    selectedDateStr={selectedDateStr}
                    highlightedEventId={highlightedEventId}
                    selectedCategory={selectedCategory}
                    onSelectDate={handleSelectDate}
                    onSelectEvent={handleSelectEvent}
                  />
                </div>
              ))}
            </div>

            {/* Rector Signature & Legal Note Box based on official decree */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 mt-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 font-medium">Ditetapkan di Jakarta, 2 Februari 2026</p>
                <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">
                  Rektor UPN "Veteran" Jakarta
                </h4>
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Prof. Dr. Anter Venus, MA.Comm</span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6 text-xs text-slate-600">
                <div className="text-right sm:text-left">
                  <span className="font-extrabold text-emerald-800 block">KAMPUS BELA NEGARA</span>
                  <span className="text-[11px] text-slate-500">Jl. RS. Fatmawati No. 1, Pondok Labu, Jakarta Selatan</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Synchronized Agenda Explanations (5 cols on desktop, sticky) */}
          <div className={`lg:col-span-5 lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] flex flex-col ${mobileViewTab === 'calendar' ? 'hidden lg:flex' : 'flex'}`}>
            <AgendaList
              events={ALL_EVENTS}
              selectedSemester={selectedSemester}
              activeCategory={selectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              highlightedEventId={highlightedEventId}
              onSelectEvent={handleSelectEvent}
            />
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="UPNVJ" className="w-6 h-6 object-contain" />
            <span className="font-bold text-slate-800">UPN "Veteran" Jakarta</span>
            <span>&bull;</span>
            <span>Kalender Akademik 2026/2027</span>
          </div>
          <div>
            <span>Format Standar SK Rektor No. 919/UN61/HK.03.01/2026</span>
          </div>
        </div>
      </footer>

      {/* Date Detail Popover / Modal */}
      <EventDetailModal
        dayInfo={modalDayInfo}
        onClose={() => setModalDayInfo(null)}
        onSelectEvent={handleSelectEvent}
      />

      {/* PWA Install Guidance Modal */}
      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        deferredPrompt={deferredPrompt}
        onNativeInstall={handleNativeInstall}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
