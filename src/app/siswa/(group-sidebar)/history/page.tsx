import HeaderHistory from "@/src/components/siswa/history/HeaderHistory";
import StatisticHistory from "@/src/components/siswa/history/StatisticHistory";
import React from "react";
import { CheckCircle, ChartBar } from "lucide-react";
import ExamHistoryFilter from "@/src/components/siswa/history/ExamHistoryFilter";
import Link from "next/link";
import ExamHistoryTable from "@/src/components/siswa/history/TabelResult";


export default function HistoryPage() {
    const exams = [
        {
            id: 1,
            judul: "Kuis Teks Eksposisi",
            mapel: "Bahasa Indonesia",
            tanggal: "12 Okt 2023",
            status: "Sudah",
        },
        {
            id: 2,
            judul: "UTS Matematika Dasar",
            mapel: "Matematika",
            tanggal: "08 Okt 2023",
            status: "Sudah",
        },
        {
            id: 3,
            judul: "Latihan Biologi Sel",
            mapel: "Sains",
            tanggal: "25 Sep 2023",
            status: "Sudah",
        },
        {
            id: 4,
            judul: "Latihan Biologi Sel",
            mapel: "Sains",
            tanggal: "25 Sep 2023",
            status: "Sudah",
        },
        {
            id: 5,
            judul: "Latihan Biologi Sel",
            mapel: "Sains",
            tanggal: "25 Sep 2023",
            status: "Sudah",
        },
        {
            id: 6,
            judul: "Latihan Biologi Sel",
            mapel: "Sains",
            tanggal: "25 Sep 2023",
            status: "Sudah",
        },
    ];
    return (
        <div>
            <HeaderHistory />
            <div className="flex w-full gap-[30px]">
                <StatisticHistory
                    title="Total Ujian Selesai"
                    value="12"
                    icon={CheckCircle}
                />

                <Link href={"/siswa/history/notdone"} className="w-2/2">
                    <StatisticHistory
                        title="Bellum Dikerjakan"
                        value="12"
                        icon={ChartBar}
                        className="border-blue-700"
                    />
                </Link>
            </div>
            <ExamHistoryTable exams={exams} />
        </div>
    );
}