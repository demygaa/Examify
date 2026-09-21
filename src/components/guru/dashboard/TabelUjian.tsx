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
        <div className="bg-white p-6 mt-5 rounded-xl shadow-sm border border-slate-300 p-[27px]">
            <div className="border-b border-slate-200 flex flex-row justify-between items-center pb-3 mb-4">
                <p className="text-black font-semibold text-xl">Jadwal Ujian</p>
                <Link href="/guru/ujian" className="text-blue-700 font-semibold hover:underline text-sm">
                    Lihat Semua Ujian
                </Link>
            </div>

            <div className="overflow-x-auto mt-[20px]">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-slate-400 border-b border-slate-200 bg-blue-100">
                            <th className="p-4 font-semibold">NAMA UJIAN</th>
                            <th className="p-4 font-semibold">KELAS</th>
                            <th className="p-4 font-semibold">TANGGAL</th>
                            <th className="p-4 font-semibold">DURASI</th>
                            <th className="p-4 font-semibold">STATUS</th>
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