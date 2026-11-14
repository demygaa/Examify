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
        <div className={`bg-white border rounded-xl px-4 sm:px-[27px] py-4 sm:py-[20px] w-full flex flex-row justify-between items-center ${className ?? "border-slate-200"} `}>
            <div className="flex flex-col gap-2 sm:gap-3">
                <p className="text-sm sm:text-[15px] text-slate-700 font-semibold ">
                    {title}
                </p>
                <p className="text-lg sm:text-[20px] text-blue-700 font-bold">{value}</p>
            </div>
            <div className={`p-2 sm:p-[10px] rounded-xl ${className === "border-blue-700" ? "bg-blue-100" : "bg-blue-50"}`}>
                <Icon 
                    color={className === "border-blue-700" ? "#2563eb" : "#3b82f6"}
                    size={18}
                    className="sm:w-5 sm:h-5"
                />
            </div>
        </div>
    );
}