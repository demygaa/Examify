import { LockKeyholeOpenIcon, TriangleIcon } from "lucide-react";
import Link from "next/link";
export default function StartExam() {
    return (
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-[15px] flex flex-col gap-4 w-[250px] mt-[20px]">
            <div className="flex flex-col items-center gap-2">
                <LockKeyholeOpenIcon
                    size={40}
                    className="text-blue-600"
                />
                <p className="text-black text-[20px] font-semibold">Siap Memulai?</p>
            </div>
            <div className="border border-slate-300 p-4 flex flex-row w-min-0 gap-4 text-black text-slate-500 rounded-xl items-center">
                <input type="checkbox" 
                    className="w-[40px] h-[40px]"
                />
                <p className="min-w-0">
                    Saya telah membaca dan memahami seluruh aturan ujian.
                </p>
            </div>
            <div className="text-white flex flex-row gap-2 bg-blue-700 px-2 py-3 justify-center rounded-xl font-semibold">
                <Link href={'/siswa/ujian/1/pengerjaan'}>Mulai Ujian</Link>
                <TriangleIcon
                    size={20}
                    strokeWidth={4}
                    className="rotate-90"
                />
            </div>
            <Link href={'/siswa'} className="text-black text-slate-400 font-semibold text-[15px] text-center">Kembali Ke Dashboard</Link>


        </div>
    );
}