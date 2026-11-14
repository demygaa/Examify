import {
    CalendarDays,
    Clock3,
    Eye,
    ListOrdered,
    UsersRound,
} from "lucide-react";
import Link from "next/link";

type CardMonitorProps = {
    id: number
    mapel: string;
    judul: string;
    kelas: string;
    soal: string;
    durasi: string;
    tanggal: string;
    progress: number;
    mengerjakan: number;
    selesai: number;
    belumMasuk: number;
};

export default function CardMonitor({
    id,
    mapel,
    judul,
    kelas,
    soal,
    durasi,
    tanggal,
    progress,
    mengerjakan,
    selesai,
    belumMasuk,
}: CardMonitorProps) {
    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-blue-700">
                    {mapel}
                </span>

                <span className="flex items-center gap-1 rounded-full bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-green-600">
                    <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-green-500" />
                    LIVE
                </span>
            </div>

            {/* Judul */}
            <h2 className="mt-2 sm:mt-3 text-sm sm:text-[15px] md:text-[17px] font-semibold text-slate-900 line-clamp-2">
                {judul}
            </h2>

            {/* Informasi */}
            <div className="mt-2 sm:mt-4 grid grid-cols-2 gap-y-1.5 sm:gap-y-3 text-[11px] sm:text-[12px] text-slate-600">

                <div className="flex items-center gap-1.5">
                    <UsersRound size={14} />
                    <span className="truncate">{kelas}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <ListOrdered size={14} />
                    <span>{soal} Soal</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Clock3 size={14} />
                    <span>{durasi}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    <span className="truncate">{tanggal}</span>
                </div>

            </div>

            <hr className="my-2 sm:my-4 border-slate-200" />

            {/* Progress */}
            <div>
                <div className="flex items-center justify-between text-[10px] sm:text-[12px]">
                    <span className="text-slate-700">
                        Progress Pengerjaan
                    </span>

                    <span className="font-semibold text-blue-600">
                        {progress}%
                    </span>
                </div>

                <div className="mt-1.5 sm:mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Statistik */}
            <div className="mt-2 sm:mt-3 grid grid-cols-3 text-center">

                <div>
                    <p className="text-[7px] sm:text-[8px] text-slate-500">
                        MENGERJAKAN
                    </p>
                    <p className="text-xs sm:text-[13px] font-semibold text-slate-900">
                        {mengerjakan}
                    </p>
                </div>

                <div>
                    <p className="text-[7px] sm:text-[8px] text-slate-500">
                        SELESAI
                    </p>
                    <p className="text-xs sm:text-[13px] font-semibold text-slate-900">
                        {selesai}
                    </p>
                </div>

                <div>
                    <p className="text-[7px] sm:text-[8px] text-slate-500">
                        BELUM MASUK
                    </p>
                    <p className="text-xs sm:text-[13px] font-semibold text-slate-900">
                        {belumMasuk}
                    </p>
                </div>

            </div>

            {/* Monitoring */}
            <Link href={`/guru/monitoring/${id}`} className="mt-2 sm:mt-4 flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-blue-600 py-2 text-[11px] sm:text-[13px] font-medium text-white">
                <Eye size={14} className="sm:w-4 sm:h-4" />
                Monitoring
            </Link>

        </div>
    );
}