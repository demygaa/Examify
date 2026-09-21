import {
    UserRound,
    Clock,
    ListOrdered,
    Circle,
    MoreVertical,
    CalendarDays,
} from "lucide-react";

type ExamStartCardProps = {
    id: string;
    status: string;
    judul: string;
    kelas: string;
    soal: string;
    time: string;
};

export default function ExamStartCard({
    id,
    status,
    judul,
    kelas,
    soal,
    time,
}: ExamStartCardProps) {

    const isActive = status === "BERLANGSUNG";

    return (
        <div className="flex flex-col gap-3 bg-white p-[27px] rounded-xl shadow-sm border border-slate-200">

            <div className="flex items-start justify-between">
                <span
                    className={`px-2 py-1 rounded-full text-[9px] font-semibold ${
                        isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                    }`}
                >
                    {isActive ? "SEDANG AKTIF" : "TERJADWAL"}
                </span>

                <MoreVertical
                    size={18}
                    className="text-slate-400"
                />
            </div>

           
            <p className="text-[17px] font-semibold text-slate-900">
                {judul}
            </p>

            
            <div className="flex items-center gap-4 text-slate-600 text-[13px]">

                <div className="flex items-center gap-1">
                    <UserRound size={15} />
                    <span>Kelas {kelas}</span>
                </div>

                <div className="flex items-center gap-1">
                    <ListOrdered size={15} />
                    <span>{soal} Soal</span>
                </div>

                <div className="flex items-center gap-1">
                    {isActive ? (
                        <Clock size={15} />
                    ) : (
                        <CalendarDays size={15} />
                    )}

                    <span>
                        {isActive
                            ? `${time} Menit`
                            : `Besok, ${time}:00`
                        }
                    </span>
                </div>

            </div>

            <hr className="border-slate-200" />

            
            <div className="flex items-center justify-between">

                {isActive ? (
                    <>
                        <div className="flex items-center gap-2 text-[11px] text-slate-700">
                            <Circle
                                size={22}
                                className="text-blue-600"
                            />
                            <span>37 Aktif</span>
                        </div>

                        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm">
                            Hentikan Ujian
                        </button>
                    </>
                ) : (
                    <>
                        <div></div>

                        <div className="flex gap-2">
                            <button className="border border-slate-300 text-slate-600 px-4 py-2 rounded-lg text-sm">
                                Edit Jadwal
                            </button>

                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                                Mulai Sekarang
                            </button>
                        </div>
                    </>
                )}

            </div>

        </div>
    );
}