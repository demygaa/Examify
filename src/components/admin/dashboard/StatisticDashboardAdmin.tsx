import { LucideIcon } from "lucide-react";

type StatisticCarDashboardAdminProps = {
    title: string
    icon: LucideIcon
    value: string
}

export default function StatisticCarDashboardAdmin({
    icon: Icon,
    title,
    value
} : StatisticCarDashboardAdminProps) {
    return (
        <div className="bg-white border border-slate-300 shadow-sm p-[27px] text-black rounded-xl w-full">
            <div className="flex flex-row justify-between items-center">
                <p className="font-semibold text-[15px]">{title}</p>
                <Icon 
                    size={40}
                    color="blue"
                    className="bg-blue-100 p-2 rounded-full"
                />
            </div>
            <p className="text-[35px] font-semibold">{value}</p>
        </div>
    );
}