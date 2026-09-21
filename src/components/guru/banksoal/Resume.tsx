import { Info } from "lucide-react";
type FastResumeProps = {
    totalExam: string
    activeExam: string
    peserta: string
}
export default function FastResume({
    totalExam,
    activeExam,
    peserta
} : FastResumeProps) {
    return (
        <div className="bg-white p-3 rounded-xl shadow-sm mt-[20px] flex flex-col  border border-slate-300">
            <div className="flex flex-row gap-2 items-center text-black">
                <Info 
                    size={20}
                    color="blue"
                />
                <p>Informasi Ringkas</p>
            </div>
            <div className="text-black flex flex-col gap-2 mt-[20px]">
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">Total Ujian</p>
                    <p>{totalExam}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">Ujian Aktif</p>
                    <p>{activeExam}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <p className="font-semibold">Peserta Ujian</p>
                    <p>{peserta}</p>
                </div>

            </div>
        </div>
    );
}