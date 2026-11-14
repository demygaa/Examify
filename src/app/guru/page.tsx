import CardExamLive from "@/src/components/guru/dashboard/CardExamLive";
import TabelDraft from "@/src/components/guru/dashboard/TabelDraft";
import FastAction from "@/src/components/guru/dashboard/FastAction";
import StatisticCardGuru from "@/src/components/guru/dashboard/StatisticCardGuru";
import HeaderGuru from "@/src/components/guru/HeaderGuru";
import { Calendar, Notebook, User } from "lucide-react";
import TabelUjian from "@/src/components/guru/dashboard/TabelUjian";

export default function GuruDashboard() {
    const exams = [
        {
            id: 2,
            status: "BERLANGSUNG",
            judul: "Matematika",
            timer: "45",
            kelas: "XI MIPA",
            progres: "80%",
            peserta: "23/37"
            
        }
    ]

    

    return (
        <div>
            <HeaderGuru
                title="Selamat datang"
                description="Kelola data ujian dan soal anda"
                name="Ahmad"
                prodi="Matematika"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 lg:mt-[20px]">
                <StatisticCardGuru
                    icon={Notebook}
                    status="3 sedang aktif"
                    title="Ujian Saya"
                    value="18"
                    style={{
                        backgroundColor: "#FFF7ED",
                        color: "#EA580C"
                    }}
                />
                <StatisticCardGuru
                    icon={User}
                    status="Aktif Hari Ini"
                    title="Total Peserta Ujian Saya"
                    value="360"
                    style={{
                        backgroundColor: "#ECFDF5",
                        color: "#059669"
                    }}
                />
                <StatisticCardGuru
                    icon={Calendar}
                    status="2 Akan Dimulai"
                    title="Ujian Saya Hari Ini"
                    value="4"
                    style={{
                        backgroundColor: "#EEF2FF",
                        color: "#4F46E5"
                    }}
                />
            </div>
            
            <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-[20px] mt-4 lg:mt-[20px]">
                <div className="w-full lg:flex-1">
                    {exams.map((exam) => (
                        <CardExamLive 
                            key={exam.id}
                            id={exam.id}
                            status={exam.status}
                            judul={exam.judul}
                            kelas={exam.kelas}
                            progres={exam.progres}
                            timer={exam.timer}
                            peserta={exam.peserta}
                        />
                    ))}
                    <TabelDraft />
                    <TabelUjian />
                    
                </div>
                <div className="w-full lg:w-[400px] shrink-0">
                    <p className="text-black font-semibold text-sm sm:text-base">Aksi cepat</p>
                    <FastAction />
                </div>
            </div>
        </div>
    );
}