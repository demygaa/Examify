import { LucideIcon } from "lucide-react";
import { CSSProperties } from "react";

type MonitoringSraristicCardProps = {
    title: string,
    icon: LucideIcon
    value: string
    className?: string
}

export default function MonitoringStatisticCard({
    title,
    icon: Icon,
    value,
    className
} : MonitoringSraristicCardProps) {
    return (
        <div className="bg-white p-[15px] flex flex-col gap-3 rounded-xl shadow-sm w-full">
            <div className="flex flex-row items-center justify-between">
                <p className="text-slate-700 text-[15px] font-semibold">{title}</p>
                <Icon 
                    size={40}
                    className={className}
                />
            </div>
            <div className="flex flex-row gap-2">
                <p className="text-[35px] font-semibold">{value}</p>
                
            </div>
            
            
        </div>
    );
}