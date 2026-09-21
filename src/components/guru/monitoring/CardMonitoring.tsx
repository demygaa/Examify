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
        <div className="w-full max-w-[350px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">
                    {mapel}
                </span>

                <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    LIVE
                </span>
            </div>

            {/* Judul */}
            <h2 className="mt-3 text-[17px] font-semibold text-slate-900">
                {judul}
            </h2>

            {/* Informasi */}
            <div className="mt-4 grid grid-cols-2 gap-y-3 text-[12px] text-slate-600">

                <div className="flex items-center gap-2">
                    <UsersRound size={15} />
                    <span>{kelas}</span>
                </div>

                <div className="flex items-center gap-2">
                    <ListOrdered size={15} />
                    <span>{soal} Soal</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock3 size={15} />
                    <span>{durasi}</span>
                </div>

                <div className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    <span>{tanggal}</span>
                </div>

            </div>

            <hr className="my-4 border-slate-200" />

            {/* Progress */}
            <div>
                <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-700">
                        Progress Pengerjaan
                    </span>

                    <span className="font-semibold text-blue-600">
                        {progress}%
                    </span>
                </div>

                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Statistik */}
            <div className="mt-3 grid grid-cols-3 text-center">

                <div>
                    <p className="text-[8px] text-slate-500">
                        MENGERJAKAN
                    </p>
                    <p className="text-[13px] font-semibold text-slate-900">
                        {mengerjakan}
                    </p>
                </div>

                <div>
                    <p className="text-[8px] text-slate-500">
                        SELESAI
                    </p>
                    <p className="text-[13px] font-semibold text-slate-900">
                        {selesai}
                    </p>
                </div>

                <div>
                    <p className="text-[8px] text-slate-500">
                        BELUM MASUK
                    </p>
                    <p className="text-[13px] font-semibold text-slate-900">
                        {belumMasuk}
                    </p>
                </div>

            </div>

            {/* Monitoring */}
            <Link href={`/guru/monitoring/${id}`} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-[13px] font-medium text-white">
                <Eye size={16} />
                Monitoring
            </Link>

        </div>
    );
}