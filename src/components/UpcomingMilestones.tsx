import React from 'react';
import { Sparkles, Calendar, Clock, AlertCircle } from 'lucide-react';
import { AcademicEvent, getCategoryInfo } from '../data/calendarData';

interface UpcomingMilestonesProps {
  events: AcademicEvent[];
  onSelectEvent: (event: AcademicEvent) => void;
}

export const UpcomingMilestones: React.FC<UpcomingMilestonesProps> = ({ events, onSelectEvent }) => {
  // Key critical milestones across the academic year
  const priorityEventIds = [
    'g-ukt',
    'g-krs-online',
    'g-kuliah-mulai',
    'g-uts',
    'g-uas',
    'ge-ukt-bayar',
    'ge-krs-online',
    'ge-kuliah-mulai',
    'ge-uts',
    'ge-uas',
    'ge-ta-ujian'
  ];

  const milestoneEvents = priorityEventIds
    .map(id => events.find(e => e.id === id))
    .filter(Boolean) as AcademicEvent[];

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm mb-6 no-print">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Agenda Penting & Tenggat Akademik Utama (Milestone)
            </h2>
            <p className="text-xs text-slate-500">
              Klik agenda di bawah untuk langsung menuju tanggal pada kalender
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling pill chips for high mobile comfort */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        {milestoneEvents.slice(0, 6).map((evt) => {
          const cat = getCategoryInfo(evt.category);
          return (
            <button
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="flex-shrink-0 group flex flex-col items-start p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-emerald-50/80 hover:border-emerald-300 transition-all text-left max-w-[210px] sm:max-w-[240px]"
            >
              <div className="flex items-center gap-1.5 mb-1 w-full justify-between">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${cat?.bgClass || 'bg-emerald-100'} ${cat?.textClass || 'text-emerald-900'} border ${cat?.borderClass || 'border-emerald-300'}`}>
                  {cat?.badgeLabel || 'Akademik'}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {evt.semester === 'ganjil' ? 'Ganjil' : 'Genap'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 line-clamp-1">
                {evt.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {evt.dateStr}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
