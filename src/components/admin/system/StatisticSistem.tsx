import { Dot, LucideIcon } from "lucide-react";

type StatisticCardSistemProps = {
    judul: string;
    icon: LucideIcon;
    status: string;
    online?: boolean;
};

export default function StatisticCardSistem({
    judul,
    icon: Icon,
    status,
    online = true,
}: StatisticCardSistemProps) {
    return (
        <div className="bg-white border border-slate-300 shadow-sm p-[27px] text-black rounded-xl w-full flex flex-col justify-between">
            <div className="flex flex-row justify-between items-center">
                <p className="font-semibold text-[15px]">{judul}</p>
                <Icon
                    size={25}
                    strokeWidth={2}
                    color={online ? "green" : "red"}
                />
            </div>
            <p className="font-semibold flex flex-row items-center gap-1">
                <Dot
                    className={online ? "text-green-400" : "text-red-400"}
                    size={20}
                    strokeWidth={20}
                />
                {status}
            </p>
        </div>
    );
}
