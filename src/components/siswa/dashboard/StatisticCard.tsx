import React from "react";
import Image from "next/image";
import { type LucideIcon } from "lucide-react";

type StatisticCardProps = {
    title: string,
    value: string,
    icon: LucideIcon;
    className?: string,
};

export default function StatisticCard({
    title,
    value,
    icon: Icon,
    className
}: StatisticCardProps) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 w-full h-full">

             <div className={`rounded-full p-3 ${className ?? "bg-blue-50"}`}>
                <Icon
                    size={40}
                    className={`${className ?? "text-blue-600"}`}
                />
            </div>

            <div>
                <p className={`font-600 text-black text-[15px]  `}>
                    {title}
                </p>

                <p className={`text-2xl !bg-white font-bold ${className ?? " text-slate-900"}`}>
                    {value}
                </p>
            </div>

        </div>
    );
}