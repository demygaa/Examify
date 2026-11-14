import { LockKeyholeOpenIcon, TriangleIcon } from "lucide-react";
import Link from "next/link";
export default function StartExam() {
    return (
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-4 sm:p-[15px] flex flex-col gap-3 sm:gap-4 w-full mt-4">
            <div className="flex flex-col items-center gap-1 sm:gap-2">
                <LockKeyholeOpenIcon
                    size={32}
                    className="sm:w-[40px] sm:h-[40px] text-blue-600"
                />
                <p className="text-black text-lg sm:text-[20px] font-semibold">Siap Memulai?</p>
            </div>
            <div className="border border-slate-300 p-3 sm:p-4 flex flex-row w-full gap-3 sm:gap-4 text-black text-slate-500 rounded-xl items-center bg-white">
                <input type="checkbox" 
                    className="w-[28px] h-[28px] sm:w-[40px] sm:h-[40px] flex-shrink-0"
                />
                <p className="min-w-0 text-xs sm:text-sm">
                    Saya telah membaca dan memahami seluruh aturan ujian.
                </p>
            </div>
            <div className="text-white flex flex-row gap-2 bg-blue-700 px-2 py-2.5 sm:py-3 justify-center rounded-xl font-semibold text-sm sm:text-base">
                <Link href={'/siswa/ujian/1/pengerjaan'}>Mulai Ujian</Link>
                <TriangleIcon
                    size={16}
                    strokeWidth={4}
                    className="rotate-90 sm:w-5 sm:h-5"
                />
            </div>
            <Link href={'/siswa'} className="text-black text-slate-400 font-semibold text-sm sm:text-[15px] text-center">Kembali Ke Dashboard</Link>


        </div>
    );
}