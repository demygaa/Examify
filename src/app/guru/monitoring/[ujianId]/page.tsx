import CardDetaiTitle from "@/src/components/guru/monitoring/detailmonitoring/CardDetailTitle";
import { cardMonitoring } from "@/src/app/api/monitoring/data";
import CardStatisticMonitoring from "@/src/components/guru/monitoring/detailmonitoring/StatisticCard";
import FastActionMon from "@/src/components/guru/monitoring/detailmonitoring/FastActionMon";
import HeaderTableMon from "@/src/components/guru/monitoring/detailmonitoring/HeadertableMon";
import TableMon from "@/src/components/guru/monitoring/detailmonitoring/TableMon";
import RecentReports from "@/src/components/guru/monitoring/detailmonitoring/RecentReports";
import PagenationMon from "@/src/components/guru/monitoring/detailmonitoring/PaginationCardmon";

type Props = {
    params: Promise<{
        ujianId: string;
    }>;
};

type PesertaUjian = {
    id: number;
    nama: string;
    nomor: string;
    waktu: string;
    status: "Aktif" | "Selesai" | "Offline";
    skor: string;
};

export default async function MonitoringDetail({ params }: Props) {
    const { ujianId } = await params;

    const card = cardMonitoring.find(
        (card) => card.id === Number(ujianId)
    );

    const pesertaUjian: PesertaUjian[] = [
        {
            id: 1,
            nama: "Ahmad Sahroni",
            nomor: "12/2",
            waktu: "12.45",
            status: "Aktif",
            skor: "85",
        },
        {
            id: 2,
            nama: "Ahmad Sahroni",
            nomor: "12/2",
            waktu: "12.45",
            status: "Selesai",
            skor: "85",
        },
        {
            id: 3,
            nama: "Ahmad Sahroni",
            nomor: "12/2",
            waktu: "12.45",
            status: "Offline",
            skor: "85",
        },
    ];

    return (
        <div>
            <CardDetaiTitle
                title={card?.judul}
                kelas={card?.kelas}
                soal={card?.soal}
            />

            <div className="flex flex-row gap-[20px] mt-[20px]">

                <div className="w-full flex flex-col gap-[20px]">

                    <div className="flex flex-row gap-[20px] w-full">
                        <CardStatisticMonitoring
                            judul="Total Peserta"
                            value="35"
                        />

                        <CardStatisticMonitoring
                            judul="Sedang Mengerjakan"
                            value="35"
                        />

                        <CardStatisticMonitoring
                            judul="Total Selesai"
                            value="35"
                        />

                        <CardStatisticMonitoring
                            judul="Belum Masuk"
                            value="35"
                        />
                    </div>

                    <FastActionMon />

                    <div className="bg-white rounded-xl shadow-sm border border-slate-300">

                        <HeaderTableMon />

                        <TableMon
                            data={pesertaUjian}
                        />

                    

                    </div>

                </div>

                <div>
                    <RecentReports />
                </div>

            </div>
        </div>
    );
}