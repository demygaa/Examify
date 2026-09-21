import CardLibrary from "@/src/components/guru/banksoal/Card";
import CardSoal from "@/src/components/guru/banksoal/CardSoal";
import Link from "next/link";
import HeaderGuru from "@/src/components/guru/HeaderGuru";
import { Archive, CheckCircle2, ListPlus } from "lucide-react";
import SearchCard from "@/src/components/guru/banksoal/Search";
import FastResume from "@/src/components/guru/banksoal/Resume";
import LastActivity from "@/src/components/guru/banksoal/LastActivity";


export default function BankSoalPage() {
    const examscard = [
        {
            id: "2",
            mapel: "Matematika",
            judul: "Ujian Matematikan Aljabar",
            soal: "Tentukan nilai x yang memenuhi persamaan kuadrat $2x^2 - 4x + 6 = 0$ menggunakan rumus ABC dan berikan penjelasan mengenai determinannya...",
            value: "89",
            recent: "2009 08 13",

        },
        {
            id: "3",
            mapel: "Matematika",
            judul: "Ujian Matematikan Aljabar",
            soal: "Tentukan nilai x yang memenuhi persamaan kuadrat $2x^2 - 4x + 6 = 0$ menggunakan rumus ABC dan berikan penjelasan mengenai determinannya...",
            value: "89",
            recent: "2009 08 13",

        },
        {
            id: "4",
            mapel: "Matematika",
            judul: "Ujian Matematikan Aljabar",
            soal: "Tentukan nilai x yang memenuhi persamaan kuadrat $2x^2 - 4x + 6 = 0$ menggunakan rumus ABC dan berikan penjelasan mengenai determinannya...",
            value: "89",
            recent: "2009 08 13",

        }
    ]
    const fastresume = [
        {
            totalExam: "23",
            activeExam: "Ujian Matematika",
            peserta: "200"
        }
    ]
    return (

        <div>
            <HeaderGuru
                title="Bank Soal"
                description="Kelola seluruh soal yang telah Anda buat untuk evaluasi pembelajaran."
                name="Ahmad"
                prodi="Matematika"
            />
            <div className="flex justify-end mt-[20px] mb-[20px]">
                <Link href={'/guru/banksoal/createsoal'} className="px-3 py-2 bg-blue-700 text-center font-semibold rounded-xl text-white">Tambah Ujian</Link>
            </div>
            <div className="flex flex-row gap-[20px]">
                <div className="mt-[20px] flex-1 flex flex-col gap-[20px]">
                    <div className="flex-row flex flex-1 gap-[20px]">
                        <CardLibrary
                            icon={Archive}
                            title="Total Soal"
                            value="20"
                            style={{
                                backgroundColor: "rgba(0 ,74, 198, 0.1)",
                                color: "#004AC6"

                            }}
                        />
                        <CardLibrary
                            icon={ListPlus}
                            title="Draft Soal"
                            value="20"
                            style={{
                                backgroundColor: "rgba(80, 95, 118 0.4)",
                                color: "rgb(80, 95, 118)"

                            }}
                        />
                        <CardLibrary
                            icon={CheckCircle2}
                            title="Aktif"
                            value="20"
                            style={{
                                backgroundColor: "rgba(148, 55, 0, 0.2)",
                                color: "rgb(148, 55, 0)"

                            }}
                        />
                    </div>
                    <SearchCard />
                    <div className="flex flex-col gap-4">
                        {examscard.map((examcd) => (
                            <CardSoal
                                key={examcd.id}
                                id={examcd.id}
                                mapel={examcd.mapel}
                                judul={examcd.judul}
                                soal={examcd.soal}
                                value={examcd.value}
                                recent={examcd.recent}
                            />
                        ))}

                    </div>
                </div>
                <div className="w-[300px] shrink-0 ml-[20px] sticky top-[20px]">
                    {fastresume.map((resume) => (
                        <FastResume 
                           key={resume.peserta}
                           peserta={resume.peserta}
                           totalExam={resume.totalExam}
                           activeExam={resume.activeExam}
                        />
                    ))}
                    <LastActivity />
                </div>
            </div>

        </div>
    );
}