import Link from "next/link";
import UjianRow from "./Ujianjadwal";

export default function TabelUjian() {
    const examsschedule = [
        {
            id: 2,
            nama: "Ujian Binggris",
            kelas: "XI MIPA 3",
            schedule: "12 Mei 2028",
            durasi: "90",
            status: "SCHEDULE"
        },
        {
            id: 7,
            nama: "Ujian Binggris",
            kelas: "XI MIPA 3",
            schedule: "12 Mei 2028",
            durasi: "90",
            status: "BERLANGSUNG"
        },
        {
            id: 3,
            nama: "Ujian Binggris",
            kelas: "XI MIPA 3",
            schedule: "12 Mei 2028",
            durasi: "90",
            status: "SCHEDULE"
        },
        {
            id: 4,
            nama: "Ujian Binggris",
            kelas: "XI MIPA 3",
            schedule: "12 Mei 2028",
            durasi: "90",
            status: "SCHEDULE"
        },
        {
            id: 5,
            nama: "Ujian Binggris",
            kelas: "XI MIPA 3",
            schedule: "12 Mei 2028",
            durasi: "90",
            status: "SCHEDULE"
        }
    ];

    return (
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm border border-slate-300">
            <div className="border-b border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 sm:pb-3 mb-3 sm:mb-4 gap-2">
                <p className="text-black font-semibold text-lg sm:text-xl">Jadwal Ujian</p>
                <Link href="/guru/ujian" className="text-blue-700 font-semibold hover:underline text-sm self-start sm:self-auto">
                    Lihat Semua Ujian
                </Link>
            </div>

            <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="text-left text-slate-400 border-b border-slate-200 bg-blue-100">
                            <th className="p-3 sm:p-4 font-semibold text-xs sm:text-sm">NAMA UJIAN</th>
                            <th className="p-3 sm:p-4 font-semibold text-xs sm:text-sm">KELAS</th>
                            <th className="p-3 sm:p-4 font-semibold text-xs sm:text-sm">TANGGAL</th>
                            <th className="p-3 sm:p-4 font-semibold text-xs sm:text-sm">DURASI</th>
                            <th className="p-3 sm:p-4 font-semibold text-xs sm:text-sm">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examsschedule.map((examsch) => (
                            <UjianRow
                                key={examsch.id}
                                id={examsch.id}
                                nama={examsch.nama}
                                kelas={examsch.kelas}
                                schedule={examsch.schedule}
                                durasi={examsch.durasi}
                                status={examsch.status}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}