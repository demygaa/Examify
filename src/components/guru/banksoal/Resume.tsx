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
}: FastResumeProps) {
    return (
        <div className="bg-white p-3 rounded-xl shadow-sm mt-4 sm:mt-[20px] border border-slate-300 flex flex-col">
            <div className="flex items-center gap-2 text-black">
                <Info 
                    size={18}
                    className="sm:w-5 sm:h-5"
                    color="blue"
                />
                <p className="text-sm sm:text-[13px] font-semibold">Informasi Ringkas</p>
            </div>
            <div className="text-black flex flex-col gap-1.5 sm:gap-2 mt-4 sm:mt-[20px]">
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-xs sm:text-sm font-semibold">Total Ujian</p>
                    <p className="text-base sm:text-[16px]">{totalExam}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-xs sm:text-sm font-semibold">Ujian Aktif</p>
                    <p className="text-base sm:text-[16px]">{activeExam}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-xs sm:text-sm font-semibold">Peserta Ujian</p>
                    <p className="text-base sm:text-[16px]">{peserta}</p>
                </div>

            </div>
        </div>
    );
}