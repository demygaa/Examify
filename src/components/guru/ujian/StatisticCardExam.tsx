import { title } from "process";

type examPageCardProps = {
    title: string
    value: string
}

export default function ExamPageCard({
    title,
    value
} : examPageCardProps) {
    return (
        <div className="bg-white p-[15px] flex flex-col gap-2 rounded-xl w-full shadow-sm border border-slate-300">
            <p className="text-slate-400 font-semibold text-[15px]">{title}</p>
            <p  className="text-[30px] text-black font-semibold">{value}</p>
        </div>
    );
}