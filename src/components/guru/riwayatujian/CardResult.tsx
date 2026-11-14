import {
    CalendarDays,
    CircleCheck,
    Clock3,
    Download,
    FileText,
    ListOrdered,
    UsersRound,
} from "lucide-react";
import Link from "next/link";

type CardExamResultProps = {
    judul: string;
    mapel: string;
    kelas: string[];
    tahun: string;
    soal: string;
    peserta: string;
    tanggal: string;
    durasi: string;
    rataRata: string;
    tertinggi: string;
    terendah: string;
    kelulusan: string;
};

export default function CardExamResult({
    judul,
    mapel,
    kelas,
    tahun,
    soal,
    peserta,
    tanggal,
    durasi,
    rataRata,
    tertinggi,
    terendah,
    kelulusan,
}: CardExamResultProps) {
    return (
        <div className="w-full rounded-xl border border-slate-300 bg-white p-3 sm:p-5 shadow-sm">

            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <h2 className="text-base sm:text-[18px] font-semibold text-slate-900 line-clamp-2">
                        {judul}
                    </h2>

                    <p className="mt-1 text-xs sm:text-[14px] text-slate-700 line-clamp-1">
                        {mapel}
                    </p>
                </div>

                <span className="flex items-center gap-1 shrink-0 rounded-md bg-blue-100 px-1.5 sm:px-2 py-1 text-[10px] font-medium text-blue-700">
                    <CircleCheck size={12} fill="currentColor" className="sm:w-3.5 sm:h-3.5" />
                    Selesai
                </span>
            </div>

            {/* Kelas + Tahun */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between">

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {kelas.map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-slate-300 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] text-slate-700"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <span className="text-[10px] sm:text-[12px] text-slate-500 whitespace-nowrap ml-2">
                    TA {tahun}
                </span>
            </div>

            <hr className="my-3 sm:my-4 border-slate-200" />

            {/* Informasi */}
            <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3 text-xs sm:text-[13px] text-slate-700">

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <ListOrdered size={14} className="sm:w-4 sm:h-4" />
                    <span>{soal} Soal</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <UsersRound size={14} className="sm:w-4 sm:h-4" />
                    <span className="line-clamp-1">{peserta} Peserta</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <CalendarDays size={14} className="sm:w-4 sm:h-4" />
                    <span className="line-clamp-1">{tanggal}</span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock3 size={14} className="sm:w-4 sm:h-4" />
                    <span>{durasi}</span>
                </div>

            </div>

            {/* Statistik */}
            <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-3 rounded-lg border border-slate-200 bg-[#F5F5FC] p-2 sm:p-4">

                <div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500">
                        RATA-RATA
                    </p>
                    <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                        {rataRata}
                    </p>
                </div>

                <div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500">
                        TERTINGGI
                    </p>
                    <p className="font-semibold text-orange-600 text-xs sm:text-sm">
                        {tertinggi}
                    </p>
                </div>

                <div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500">
                        TERENDAH
                    </p>
                    <p className="font-semibold text-red-600 text-xs sm:text-sm">
                        {terendah}
                    </p>
                </div>

                <div>
                    <p className="text-[9px] sm:text-[10px] text-slate-500">
                        KELULUSAN
                    </p>
                    <p className="font-semibold text-blue-600 text-xs sm:text-sm">
                        {kelulusan}
                    </p>
                </div>

            </div>

            {/* Button */}
            <div className="mt-3 sm:mt-5 flex gap-2">

                <Link className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-blue-600 py-2 sm:py-2.5 text-[11px] sm:text-[13px] font-medium text-white" href={"/guru/history/detailhasil"}>
                    <FileText size={14} className="sm:w-4 sm:h-4" />
                    <span className="line-clamp-1">Lihat Hasil</span>
                </Link>

                <button className="flex w-9 sm:w-[44px] items-center justify-center rounded-lg border border-slate-300 text-slate-700" >
                    <Download size={14} className="sm:w-4 sm:h-4" />
                </button>

            </div>

        </div>
    );
}