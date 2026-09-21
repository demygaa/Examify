import DashboardHeader from "@/src/components/siswa/dashboard/DashboardHeader";
import ExamCard from "@/src/components/siswa/dashboard/ExamCard";
import StatisticCard from "@/src/components/siswa/dashboard/StatisticCard";
import Link from "next/link";
import { Sigma, ClipboardCheck } from "lucide-react";
import AlertCard from "@/src/components/siswa/dashboard/AlertCard";
import ActivityCard from "@/src/components/siswa/dashboard/ActivityCard";

export default function SiswaDashboard() {
    return (
        <div className="text-black">
            <DashboardHeader />

            <div className="flex gap-5 ">
                <StatisticCard
                    title="Ujian Tersedia"
                    value="4"
                    icon={ClipboardCheck}
                    className="text-blue-700 bg-blue-50"
                />

                <StatisticCard
                    title="Dikerjakan"
                    value="4"
                    icon={ClipboardCheck}
                />

                <StatisticCard
                    title="Belum Dikerjakan"
                    value="4"
                    icon={ClipboardCheck}
                />
            </div>

            <div className="flex mt-[30px]">
                
                <div className="flex-column w-[75%]">
                    <div className="flex w-full justify-between">
                        <p className="font-bold text-[20px]">
                            Daftar Ujin Mendatang
                        </p>
                        <Link
                            href="/siswa/ujian"
                            className="text-blue-700 text-[15px] font-semibold"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                    <div className="flex gap-[30px] mt-[20px]">
                        <ExamCard
                            id={1}
                            icon={Sigma}
                            mapel="Matematika"
                            title="Aljabar & Algoritma"
                            schedule="14 Januari"
                            timer={90}
                        />
                        <ExamCard
                            id={1}
                            icon={Sigma}
                            mapel="Matematika"
                            title="Aljabar & Algoritma"
                            schedule="14 Januari"
                            timer={90}
                        />
                        <ExamCard
                            id={1}
                            icon={Sigma}
                            mapel="Matematika"
                            title="Aljabar & Algoritma"
                            schedule="14 Januari"
                            timer={90}
                        />
                        <ExamCard
                            id={1}
                            icon={Sigma}
                            mapel="Matematika"
                            title="Aljabar & Algoritma"
                            schedule="14 Januari"
                            timer={90}
                        />
                    </div>
                    <AlertCard />
                </div>
               
                <ActivityCard />
            </div>
        </div>
    );
}