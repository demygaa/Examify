import { LucideIcon, NotebookIcon, Clock } from "lucide-react"
import Link from "next/link";
type CardSoalProps = {
    id: string
    mapel: string
    judul: string
    soal: string
    value: string
    recent: string
}

export default function CardSoal({
    id,
    mapel,
    judul,
    soal,
    value,
    recent,
}: CardSoalProps) {
    return (
        <div className="bg-white text-black p-[27px] gap-4 flex flex-col rounded-xl shadow-sm">
            <span className="p-2 bg-blue-200 text-blue-700 font-semibold rounded-xl w-fit">{mapel}</span>
            <div>
                <p className="text-[35px] font-semibold">{judul}</p>
                <p className="text-[20px] text-slate-400">{soal}</p>
            </div>

            <hr
                className="text-slate-400"
            />
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                    <div className="flex flex-row gap-2 items-center">
                        <NotebookIcon />
                        <p>Sudah digunakan {value}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <Clock />
                        <p>Terakhir diubah {recent}</p>
                    </div>
                </div>
                <Link href={'/guru/banksoal'} className="text-blue-700 font-semibold">Lihat pertinjau</Link>
            </div>



        </div>
    );
}