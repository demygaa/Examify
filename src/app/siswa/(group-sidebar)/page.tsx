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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
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

            <div className="flex flex-col lg:flex-row mt-6 lg:mt-[30px] gap-6">
                <div className="flex flex-col w-full lg:w-[75%]">
                    <div className="flex w-full justify-between items-center">
                        <p className="font-bold text-lg lg:text-[20px]">
                            Daftar Ujian Mendatang
                        </p>
                        <Link
                            href="/siswa/ujian"
                            className="text-blue-700 text-sm lg:text-[15px] font-semibold"
                        >
                            Lihat Semua
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-[30px] mt-4 lg:mt-[20px]">
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

                <div className="w-full lg:w-auto">
                    <ActivityCard />
                </div>
            </div>
        </div>
    );
}