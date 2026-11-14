import { LucideIcon } from "lucide-react";
import { CSSProperties } from "react";

type StatisticCardGuruProps = {
    icon: LucideIcon
    status: string 
    title: string
    value: string
    style?: CSSProperties
 
}

export default function StatisticCardGuru({
    icon: Icon,
    status,    
    title,
    value,
    style,
    
}: StatisticCardGuruProps) {
    return (
        <div className="flex flex-col bg-white p-3 sm:p-[15px] w-full rounded-xl shadow-lg">
            <div className={`flex items-center justify-between rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 gap-2`}>
                <Icon size={32} 
                    style={style}
                    className="p-2 sm:p-2 rounded-full flex-shrink-0"
                />
                <p
                    className="font-semibold px-2 py-1 rounded-xl text-xs sm:text-[15px] whitespace-nowrap"
                    style={style}
                >{status}</p>
            </div>

            <div className="text-black flex flex-col gap-1 sm:gap-2 mt-2">
                <p className="text-xs sm:text-[15px] text-slate-400 font-semibold">{title}</p>
                <p className="text-lg sm:text-[20px] font-semibold">{value}</p>
            </div>

        </div>
    );
}