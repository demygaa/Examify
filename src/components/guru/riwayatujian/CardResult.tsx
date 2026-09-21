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
        <div className="w-full max-w-[500px] rounded-xl border border-slate-300 bg-white p-5 shadow-sm">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-[19px] font-semibold text-slate-900">
                        {judul}
                    </h2>

                    <p className="mt-1 text-[14px] text-slate-700">
                        {mapel}
                    </p>
                </div>

                <span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-[11px] font-medium text-blue-700">
                    <CircleCheck size={13} fill="currentColor" />
                    Selesai
                </span>
            </div>

            {/* Kelas + Tahun */}
            <div className="mt-4 flex items-center justify-between">

                <div className="flex gap-2">
                    {kelas.map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-slate-300 px-2 py-1 text-[11px] text-slate-700"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <span className="text-[12px] text-slate-500">
                    TA {tahun}
                </span>
            </div>

            <hr className="my-4 border-slate-200" />

            {/* Informasi */}
            <div className="grid grid-cols-2 gap-y-3 text-[13px] text-slate-700">

                <div className="flex items-center gap-2">
                    <ListOrdered size={16} />
                    <span>{soal} Soal</span>
                </div>

                <div className="flex items-center gap-2">
                    <UsersRound size={16} />
                    <span>{peserta} Peserta</span>
                </div>

                <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>{tanggal}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock3 size={16} />
                    <span>{durasi}</span>
                </div>

            </div>

            {/* Statistik */}
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-[#F5F5FC] p-4">

                <div>
                    <p className="text-[10px] text-slate-500">
                        RATA-RATA
                    </p>
                    <p className="font-semibold text-slate-900">
                        {rataRata}
                    </p>
                </div>

                <div>
                    <p className="text-[10px] text-slate-500">
                        TERTINGGI
                    </p>
                    <p className="font-semibold text-orange-600">
                        {tertinggi}
                    </p>
                </div>

                <div>
                    <p className="text-[10px] text-slate-500">
                        TERENDAH
                    </p>
                    <p className="font-semibold text-red-600">
                        {terendah}
                    </p>
                </div>

                <div>
                    <p className="text-[10px] text-slate-500">
                        KELULUSAN
                    </p>
                    <p className="font-semibold text-blue-600">
                        {kelulusan}
                    </p>
                </div>

            </div>

            {/* Button */}
            <div className="mt-5 flex gap-2">

                <Link className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-[13px] font-medium text-white" href={"/guru/history/detailhasil"}>
                    <FileText size={16} />
                    Lihat Hasil
                </Link>

                <button className="flex w-[44px] items-center justify-center rounded-lg border border-slate-300 text-slate-700" >
                    <Download size={16} />
                </button>

            </div>

        </div>
    );
}