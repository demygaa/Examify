import { Timer, CheckCircle } from "lucide-react";
import TimerExam from "./Timer";

export default function HeaderPengerjaan() {
    return (
        <div className="border-b-2 border-slate-300 flex flex-row justify-between items-center p-[15px]">
            <div className="text-black">
                <h1 className="text-[22px] font-bold ">Ujian Matematika Aljabar</h1>
                <p className="text-slate">Matematika</p>
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-row px-2 items-center gap-2 bg-blue-100 border border-blue-200 rounded-xl">
                    <CheckCircle 
                        size={20}
                        color="blue"
                    />
                    <p className="text-black text-[15px]">Jawaban Tersimpan Secara Otomatis</p>
                </div>
               <TimerExam />
            </div>
        </div>
    );
}