import Link from "next/link";
import DraftSoalDashboard from "./DraftSoal";
export default function TabelDraft() {

    const draftexams = [
        {
            id: 1,
            judul: "Ujian Tes Matematika",
            ket: "terakhir update 7 jam yang lalu"
        },
        {
            id: 2,
            judul: "Ujian Tes Binggris",
            ket: "terakhir update 7 jam yang lalu"
        }
    ]

    return (
        <div className="bg-white shadow-sm p-[27px] mt-[20px] rounded-xl shadow-sm border border-slate-300">
            <div className="border-b border-slate-400 flex flex-row justify-between mb-[10px]">
                <p className="text-black font-semibold text-[22px]">Draft Soal</p>
                <Link href={'/guru/banksoal'} className="text-blue-700 font-semibold">Lihat Semua Draft</Link>
            </div>
            {draftexams.map((draft) => (
                <DraftSoalDashboard
                    key={draft.id}
                    id={draft.id}
                    judul={draft.judul}
                    ket={draft.ket}
                />
            ))}
        </div>
    );
}