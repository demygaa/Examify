import { RefreshCcw } from "lucide-react";
export default function HeaderTableMon() {
    return (
        <div  className="flex flex-wrap items-center justify-between gap-2 p-4">
            
            <p className="text-black font-semibold">Daftar Peserta Ujian</p>
            <div className="flex flex-row gap-2 p-2 bg-slate-300 w-fit rounded-xl">
                <RefreshCcw
                    size={20}
                    color="white"
                 />
                <p className="text-white font-semibold text-[15px]">Auto Refresh Setaiap 5s</p>
            </div>
        </div>
    );
}