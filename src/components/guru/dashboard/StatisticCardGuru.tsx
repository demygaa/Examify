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
        <div className="flex flex-col bg-white p-[15px] w-full rounded-xl shadow-lg">
            <div className={`flex items-center justify-between rounded-lg px-3 py-2`}>
                <Icon size={40} 
                    style={style}
                    className="p-2 rounded-full"
                    
                />
                <p
                    className="font-semibold p-2 rounded-xl text-[15px]"
                    style={style}

                >{status}</p>
            </div>

            <div className="text-black flex flex-col gap-2">
                <p className="text-[15px] text-slate-400 font-semibold">{title}</p>
                <p className="text-[20px] font-semibold">{value}</p>
            </div>

        </div>
    );
}