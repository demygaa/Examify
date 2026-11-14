import HeaderGuru from "@/src/components/guru/HeaderGuru";
import ExamPageCard from "@/src/components/guru/ujian/StatisticCardExam";
import ExamStartCard from "@/src/components/guru/ujian/CardExam";
import SearchCard from "@/src/components/guru/banksoal/Search";
export default function ExamPage() {
    const examsdraft = [
        {
            id: "1",
            status: "BERLANGSUNG",
            judul: "Ujian Tengah Semester Matematika",
            kelas: "X RPL 1",
            soal: "40",
            time: "90",
        },
        {
            id: "2",
            status: "TERJADWAL",
            judul: "Kuis Algoritma & Pemrograman",
            kelas: "X RPL 2",
            soal: "20",
            time: "08",
        },
        {
            id: "3",
            status: "TERJADWAL",
            judul: "Kuis Algoritma & Pemrograman",
            kelas: "X RPL 2",
            soal: "20",
            time: "08",
        },
        {
            id: "4",
            status: "TERJADWAL",
            judul: "Kuis Algoritma & Pemrograman",
            kelas: "X RPL 2",
            soal: "20",
            time: "08",
        },
        {
            id: "5",
            status: "TERJADWAL",
            judul: "Kuis Algoritma & Pemrograman",
            kelas: "X RPL 2",
            soal: "20",
            time: "08",
        },
        {
            id: "7",
            status: "TERJADWAL",
            judul: "Kuis Algoritma & Pemrograman",
            kelas: "X RPL 2",
            soal: "20",
            time: "08",
        },
    ];
    return (
        <div className="flex flex-col">
            <HeaderGuru
                title="Ujian"
                description="Kelola status dan jadwal ujian yang telah Anda buat."
                name="Ahmad"
                prodi="Matematika"
            />
            <div  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[12px] sm:gap-[20px] w-full mt-[20px]">
                <ExamPageCard
                    title="Total Ujian"
                    value="12"
                />
                <ExamPageCard
                    title="Draft"
                    value="3"
                />
                <ExamPageCard
                    title="Terjadwal"
                    value="4"
                />
                <ExamPageCard
                    title="Sedang Aktif"
                    value="1"
                />
                <ExamPageCard
                    title="Selesai"
                    value="3"
                />
            </div>
            <div className="mt-[20px]">
                <SearchCard />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]">
                {examsdraft.map((exam) => (
                    <ExamStartCard
                        key={exam.id}
                        id={exam.id}
                        status={exam.status}
                        judul={exam.judul}
                        kelas={exam.kelas}
                        soal={exam.soal}
                        time={exam.time}
                    />
                ))}
            </div>
        </div>
    );
}