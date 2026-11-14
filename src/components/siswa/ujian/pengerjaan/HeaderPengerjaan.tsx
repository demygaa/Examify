import { Timer, CheckCircle } from "lucide-react";
import TimerExam from "./Timer";

export default function HeaderPengerjaan() {
    return (
        <div className="border-b-2 border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-[15px] gap-3">
            <div className="text-black">
                <h1 className="text-lg sm:text-[22px] font-bold ">Ujian Matematika Aljabar</h1>
                <p className="text-slate-600 text-sm sm:text-base">Matematika</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="hidden sm:flex flex-row px-2 items-center gap-2 bg-blue-100 border border-blue-200 rounded-xl">
                    <CheckCircle 
                        size={18}
                        color="blue"
                    />
                    <p className="text-black text-xs sm:text-[15px]">Jawaban Tersimpan Secara Otomatis</p>
                </div>
               <TimerExam />
            </div>
        </div>
    );
}