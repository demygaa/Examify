import CustomizeExam from "@/src/components/guru/banksoal/createsoal/ConfigureSoal";
import QuestionCard from "@/src/components/guru/banksoal/createsoal/QuestionCard";
import AddQuestion from "@/src/components/guru/banksoal/createsoal/AddQuestion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateExam() {
    const questions = [
        {
            id: 1,
            soal: "Hasil dari 2 + 2 adalah?",
            jawaban: [
                "3",
                "4",
                "5",
                "6",
            ],
            jawabanBenar: 1,
        },
        {
            id: 2,
            soal: "Ibukota Indonesia adalah?",
            jawaban: [
                "Bandung",
                "Surabaya",
                "Jakarta",
                "Malang",
            ],
            jawabanBenar: 2,
        },
    ];
    return (
        <div className="w-full min-w-0">
            <Link href={'/guru/banksoal'} className="flex flex-row gap-2 items-center">
                <ArrowLeft />
                <p>Kembali</p>
            </Link>

            <div className="justify-center items-center flex flex-col mt-[20px]">
                
                <div className="w-full lg:w-[70%]">
                    <CustomizeExam />
                </div>

                
                <div className="flex flex-col gap-4 mt-[20px] w-full lg:w-[70%]">
                    <p className="font-semibold">Daftar Soal</p>

                    {questions.map((question, index) => (
                        <QuestionCard
                            key={question.id}
                            nomor={index + 1}
                            soal={question.soal}
                            jawaban={question.jawaban}
                            jawabanBenar={question.jawabanBenar}
                        />
                    ))}

                    <AddQuestion />
                </div>
            </div>
        </div>
    );
}