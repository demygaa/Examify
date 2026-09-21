import { RefreshCcw, Send, Download, Octagon } from "lucide-react";

export default function FastActionMon() {
  return (
    <div className="p-4 bg-white rounded-xl border border-slate-300 shadow-sm">
      <p className="font-bold text-slate-800 mb-3">Aksi Cepat</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
     
        <div className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer transition">
          <p className="text-sm font-medium text-slate-700">Refresh Data</p>
          <RefreshCcw className="w-5 h-5 text-slate-600" />
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer transition">
          <p className="text-sm font-medium text-slate-700">Kirim Pengumuman</p>
          <Send className="w-5 h-5 text-slate-600" />
        </div>

        
        <div className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer transition">
          <p className="text-sm font-medium text-slate-700">Download Laporan</p>
          <Download className="w-5 h-5 text-slate-600" />
        </div>

    
        <div className="flex items-center justify-between p-3 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 cursor-pointer transition">
          <p className="text-sm font-medium text-red-600">Hentikan Proses</p>
          <Octagon className="w-5 h-5 text-red-600 fill-red-600" />
        </div>
      </div>
    </div>
  );
}