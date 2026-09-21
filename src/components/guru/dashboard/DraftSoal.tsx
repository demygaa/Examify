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
        <div className="flex flex-row justify-between items-center border-b border-slate-200 gap-3">
            <div className="flex flex-row gap-3 items-center">
                <ListPlus
                    size={40}
                    style={{ 
                        backgroundColor : "#F1F5F9",
                        color: "64748B"
                    }}
                    className="p-2 rounded-xl"
                />
                <div className="flex flex-col gap-2">
                    <p className="text-[20px] font-semibold text-black">{judul}</p>
                    <p className="text-[15px] text-slate-500">{ket}</p>
                </div>
            </div>

            <Link href={`guru/banksoal/${id}`} className="text-blue-700 font-semibold">Pertinjau Soal</Link>
        </div>
    );
}