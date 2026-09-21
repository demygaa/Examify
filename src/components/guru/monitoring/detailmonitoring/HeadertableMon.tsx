import { RefreshCcw } from "lucide-react";
export default function HeaderTableMon() {
    return (
        <div className="flex flex-row justify-between px-[10px] py-[10px] border-b border-slate-300 items-center">
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