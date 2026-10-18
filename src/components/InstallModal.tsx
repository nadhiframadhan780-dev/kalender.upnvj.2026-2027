import React from 'react';
import { Smartphone, Apple, Chrome, X, CheckCircle, Download } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onNativeInstall: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onNativeInstall,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 overflow-hidden relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-slate-900 p-2 mx-auto shadow-md border-2 border-amber-400 mb-3 flex items-center justify-center">
            <img src="/favicon.svg" alt="Logo UPNVJ" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Pasang Aplikasi Kalender UPNVJ
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Dapat diakses di semua perangkat (Android, iPhone, iPad, PC) dan bisa dibuka secara <strong className="text-emerald-700">Offline</strong> tanpa internet.
          </p>
        </div>

        {/* Native Install Button if supported */}
        {deferredPrompt && (
          <button
            onClick={onNativeInstall}
            className="w-full mb-4 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Pasang Sekarang (Otomatis)</span>
          </button>
        )}

        {/* Instructions */}
        <div className="space-y-3.5 text-xs">
          {/* iOS / iPhone / iPad */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
              <Apple className="w-4 h-4 text-slate-800" />
              <span>Untuk Pengguna iPhone / iPad (Safari)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>Tekan tombol <strong>Share / Bagikan</strong> (ikon kotak dengan panah ke atas di bawah browser Safari).</li>
              <li>Gulir ke bawah dan pilih <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>.</li>
              <li>Tekan <strong>"Tambah" (Add)</strong> di pojok kanan atas.</li>
            </ol>
          </div>

          {/* Android */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>Untuk Pengguna Android (Google Chrome)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>Tekan menu <strong>titik tiga (⋮)</strong> di pojok kanan atas Chrome.</li>
              <li>Pilih menu <strong>"Pasang aplikasi" (Install app)</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.</li>
              <li>Aplikasi Kalender UPNVJ akan muncul langsung di layar utama smartphone Anda.</li>
            </ol>
          </div>

          {/* Features */}
          <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200">
            <p className="font-bold text-emerald-900 mb-1">Keunggulan Aplikasi:</p>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-emerald-800">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Akses Super Cepat
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Mode Offline PWA
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Tanpa Kuota Boros
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Data Resmi Rektor
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
