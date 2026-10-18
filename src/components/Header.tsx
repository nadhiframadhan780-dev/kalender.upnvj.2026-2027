import React from 'react';
import { Calendar, Download, Printer, Smartphone, ShieldCheck, Share2 } from 'lucide-react';
import { generateICalFile } from '../data/calendarData';

interface HeaderProps {
  onOpenInstall: () => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInstall, onOpenShare }) => {
  const handleDownloadIcs = () => {
    const icsContent = generateICalFile();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Kalender_Akademik_UPNVJ_2026_2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-30">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-emerald-100 px-4 py-1.5 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-semibold text-amber-300 tracking-wider">KAMPUS BELA NEGARA</span>
            <span className="hidden sm:inline text-emerald-300">|</span>
            <span className="hidden sm:inline text-emerald-200">SK Rektor No: 919/UN61/HK.03.01/2026</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-emerald-200 hidden md:inline">Tahun Akademik 2026/2027</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-700/60 text-amber-300 font-semibold text-[11px] border border-amber-400/30">
              Dokumen Resmi
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & University Identity */}
          <div className="flex items-center gap-3.5 sm:gap-4 w-full md:w-auto">
            <div className="relative group flex-shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 p-1 shadow-md border-2 border-amber-400/70 flex items-center justify-center transition-transform group-hover:scale-105">
                <img 
                  src="/favicon.svg" 
                  alt="Logo UPN Veteran Jakarta" 
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-900 p-0.5 rounded-full border-2 border-white shadow">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-950 font-bold" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Kalender Akademik
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  TA 2026 / 2027
                </span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                UPN <span className="text-emerald-700">"VETERAN"</span> JAKARTA
              </h1>
              <p className="text-xs text-slate-600 line-clamp-1">
                Program Sarjana, Diploma, dan Magister &bull; Tanggal Penetapan: 2 Februari 2026
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end no-print">
            <button
              onClick={handleDownloadIcs}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all hover:shadow-sm active:scale-95"
              title="Unduh file kalender .ics untuk disinkronkan ke Google Calendar / Apple Calendar"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Sinkron</span> .iCal
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all hover:shadow-sm active:scale-95"
              title="Cetak atau Simpan PDF Kalender"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={onOpenShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all hover:shadow-sm active:scale-95"
              title="Bagikan Tautan Kalender"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Bagikan</span>
            </button>

            <button
              onClick={onOpenInstall}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 rounded-xl shadow-sm hover:shadow transition-all active:scale-95 border border-emerald-500"
              title="Pasang aplikasi Kalender UPNVJ di ponsel atau desktop"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-300" />
              <span>Pasang Aplikasi</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
