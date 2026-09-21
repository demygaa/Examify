import { type LucideIcon } from "lucide-react";
type StatisticHistoryProps = {
    title: string,
    value: string,
    icon: LucideIcon
    className?: string
}

export default function StatisticHistory ({
    title,
    value,
    icon: Icon,
    className
} : StatisticHistoryProps) {
    return (
        <div className={`bg-white border rounded-xl px-[27px] py-[20px] w-full  flex flex-row justify-between items-center ${className ?? "border-slate-200"} `}>
            <div className="flex flex-col gap-3">
                <p className="text-[15px] text-slate-700 font-semibold ">
                    {title}
                </p>
                <p className="text-[20px] text-blue-700 font-bold">{value}</p>
            </div>
            <div className="bg-blue-300 p-[10px] rounded-xl">
                <Icon 
                    color="blue"
                    size={20}
                />
            </div>
        </div>
    );
}