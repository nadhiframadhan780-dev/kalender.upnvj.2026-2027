import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Halo! Ini link Kalender Akademik Resmi UPN "Veteran" Jakarta TA 2026/2027 lengkap dengan penanda warna dan jadwal KRS/UTS/UAS/Wisuda: ${currentUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">
          Bagikan Kalender Akademik
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Bagikan jadwal resmi UPNVJ TA 2026/2027 ke teman seangkatan atau grup kelas.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Bagikan ke WhatsApp</span>
          </button>

          <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-xs text-slate-700 flex-1 outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-800 flex items-center gap-1 transition-colors flex-shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
