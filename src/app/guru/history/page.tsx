import SearchCard from "@/src/components/guru/banksoal/Search";
import HeaderGuru from "@/src/components/guru/HeaderGuru";
import CardStatisticResult from "@/src/components/guru/riwayatujian/CardStatistikResukt";
import CardExamResult from "@/src/components/guru/riwayatujian/CardResult";
import { Award, BarChart3, CheckCircle, Search, Users } from "lucide-react";

export default function HistoryPageGuru() {
    const examResults = [
        {
            id: "1",
            judul: "UTS Matematika",
            mapel: "Matematika",
            kelas: ["X RPL 1", "X RPL 2"],
            tahun: "2026 / 2027",
            soal: "40",
            peserta: "142",
            tanggal: "24 Mei 2024",
            durasi: "90 Menit",
            rataRata: "76.5",
            tertinggi: "98",
            terendah: "42",
            kelulusan: "88%",
        },
        {
            id: "2",
            judul: "UAS Algoritma",
            mapel: "Algoritma & Pemrograman",
            kelas: ["X RPL 1"],
            tahun: "2026 / 2027",
            soal: "50",
            peserta: "36",
            tanggal: "28 Mei 2024",
            durasi: "120 Menit",
            rataRata: "81.2",
            tertinggi: "100",
            terendah: "55",
            kelulusan: "92%",
        },
    ];
    return (
        <div>
            <HeaderGuru
                title="Riwayat Ujian"
                description="Lihat seluruh ujian yang telah selesai beserta hasilnya."
                name="Ahmad"
                prodi="Matematika"
            />
            <div className="mt-4 lg:mt-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-[20px] w-full">
                <CardStatisticResult
                    title="TOTAL UJIAN SELESAI"
                    icon={CheckCircle}
                    value="42"
                />
                <CardStatisticResult
                    title="TOTAL PESERTA UJIAN"
                    icon={Users}
                    value="1.200"
                />
                <CardStatisticResult
                    title="RATA-RATA NILAI"
                    icon={BarChart3}
                    value="75.5"
                    progres={75}
                />
                <CardStatisticResult
                    title="NILAI TERTINGGI"
                    icon={Award}
                    value="100"
                />
            </div>
            <div className="mt-4 lg:mt-[20px]">
                <SearchCard />
            </div>
            <div className="mt-4 lg:mt-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-[20px] w-full">
                {examResults.map((exam) => (
                    <CardExamResult
                        key={exam.id}
                        judul={exam.judul}
                        mapel={exam.mapel}
                        kelas={exam.kelas}
                        tahun={exam.tahun}
                        soal={exam.soal}
                        peserta={exam.peserta}
                        tanggal={exam.tanggal}
                        durasi={exam.durasi}
                        rataRata={exam.rataRata}
                        tertinggi={exam.tertinggi}
                        terendah={exam.terendah}
                        kelulusan={exam.kelulusan}
                    />
                ))}

            </div>
        </div>
    );
}