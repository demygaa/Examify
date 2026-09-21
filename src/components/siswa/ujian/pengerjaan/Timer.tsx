import { Timer } from "lucide-react";
export default function TimerExam() {
    return (
        <div className="bg-black bg-slate-500 rounded-xl p-[10px] flex flex-row items-center gap-2">
            <Timer 
                size={30}
                color="blue"
            />
            <p className="font-semibold text-white">01:29:59</p>
        </div>
    );
}