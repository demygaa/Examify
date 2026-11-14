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
        <div className="bg-white text-black p-3 sm:p-[27px] gap-3 sm:gap-4 flex flex-col rounded-xl shadow-sm">
            <span className="p-1 sm:p-2 bg-blue-200 text-blue-700 font-semibold rounded-xl w-fit text-xs sm:text-sm">{mapel}</span>
            <div>
                <p className="text-2xl sm:text-[35px] font-semibold line-clamp-2">{judul}</p>
                <p className="text-sm sm:text-[20px] text-slate-400">{soal}</p>
            </div>

            <hr
                className="text-slate-400"
            />
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <div className="flex flex-row gap-1.5 sm:gap-2 items-center">
                        <NotebookIcon size={16} className="sm:w-4 sm:h-4" />
                        <p className="text-xs sm:text-sm">Sudah digunakan {value}</p>
                    </div>
                    <div className="flex flex-row gap-1.5 sm:gap-2 items-center">
                        <Clock size={16} className="sm:w-4 sm:h-4" />
                        <p className="text-xs sm:text-sm">Terakhir diubah {recent}</p>
                    </div>
                </div>
                <Link href={'/guru/banksoal'} className="text-blue-700 font-semibold text-sm self-start sm:self-auto">Lihat pertinjau</Link>
            </div>
        </div>
    );
}