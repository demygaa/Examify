import Link from "next/link"
import { ListPlus } from "lucide-react";
type DraftExamdashboardProps = {
    id: number
    judul: string
    ket: string
}
export default function DraftSoalDashboard({
    id,
    ket,
    judul
}: DraftExamdashboardProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 py-3 border-b border-slate-200">
            <div className="flex flex-row gap-2 sm:gap-3 items-center">
                <ListPlus
                    size={28}
                    style={{ 
                        backgroundColor : "#F1F5F9",
                        color: "#64748B"
                    }}
                    className="p-1.5 rounded-xl flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-lg sm:text-[20px] font-semibold text-black line-clamp-1">{judul}</p>
                    <p className="text-xs sm:text-[15px] text-slate-500">{ket}</p>
                </div>
            </div>

            <Link href={`guru/banksoal/${id}`} className="text-blue-700 font-semibold text-sm whitespace-nowrap self-start sm:self-auto">Pertinjau Soal</Link>
        </div>
    );
}