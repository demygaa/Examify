import HeaderGuru from "@/src/components/guru/HeaderGuru";
import { PlayCircle, Users, FileEdit, CheckCircle2 } from 'lucide-react'
import MonitoringStatisticCard from "@/src/components/guru/monitoring/StatisticCardMonitoring";
import SearchCard from "@/src/components/guru/banksoal/Search";
import CardMonitor from "@/src/components/guru/monitoring/CardMonitoring";
import { cardMonitoring } from "../../api/monitoring/data";
export default function MonitoringPage() {

    

    return (
        <div>
            <HeaderGuru
                title="Monitoring Ujian"
                description="Pilih ujian yang sedang berlangsung untuk melihat aktivitas peserta secara real-time."
                name="Ahmad"
                prodi="Matematika"
            />
            <div className="mt-4 sm:mt-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-[20px] w-full">
                <MonitoringStatisticCard
                    title="Ujian Aktif"
                    icon={PlayCircle}
                    value="3"

                    className="bg-green-100 text-green-700 p-2 rounded-full"
                />
                <MonitoringStatisticCard
                    title="Total Peserta Ujian"
                    icon={Users}
                    value="3"
                    className="bg-blue-100 text-blue-700 p-2 rounded-full"
                />
                <MonitoringStatisticCard
                    title="Sedang Mengerjakan"
                    icon={FileEdit}
                    value="3"
                    className="bg-orange-100 text-orange-700 p-2 rounded-full"
                />
                <MonitoringStatisticCard
                    title="Siswa Selesai"
                    icon={CheckCircle2}
                    value="3"
                    className="bg-blue-100 text-blue-700 p-2 rounded-full"
                />
            </div>
            <div className="mt-4 sm:mt-[20px]">
                <SearchCard />
            </div>
            <div className="mt-4 sm:mt-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-[20px]">
                {cardMonitoring.map((card) => (
                    <CardMonitor
                        key={card.id}
                        id={card.id}
                        mapel={card.mapel}
                        judul={card.judul}
                        kelas={card.kelas}
                        soal={card.soal}
                        durasi={card.durasi}
                        tanggal={card.tanggal}
                        progress={card.progress}
                        mengerjakan={card.mengerjakan}
                        selesai={card.selesai}
                        belumMasuk={card.belumMasuk}
                    />
                ))}
            </div>

        </div>
    );
}