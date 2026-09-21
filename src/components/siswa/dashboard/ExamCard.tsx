import React from "react";
import Link from "next/link";
import { Clock, Timer, type LucideIcon } from "lucide-react";

type ExamCardProps = {
    id?: number;
    icon: LucideIcon;
    mapel: string;
    title: string;
    schedule: string;
    timer: number;
};

export default function ExamCard({
    id,
    icon: Icon,
    mapel,
    title,
    schedule,
    timer,
}: ExamCardProps) {
    return (
        <div className="bg-white border border-slate-200 w-[346px] h-[287px] p-[15px] rounded-xl">
            
          
            <div className="flex w-full justify-between items-center">
                <div className="rounded-full bg-blue-50 p-2">
                    <Icon size={25} />
                </div>

                <p className="text-[12px] text-slate-400 font-bold bg-gray-100 p-[5px] rounded-xl">
                    {mapel}
                </p>
            </div>

          
            <div className="flex flex-col mt-[20px] gap-[10px]">
                <h1 className="text-[18px] text-black font-bold">
                    {title}
                </h1>

                <div className="flex items-center gap-[8px]">
                    <Clock size={25} />
                    <p className="text-[15px] text-slate-800">
                        {schedule}
                    </p>
                </div>

                <div className="flex items-center gap-[8px]">
                    <Timer size={25} />
                    <p className="text-[15px] text-slate-800">
                        {timer} Menit
                    </p>
                </div>
            </div>

         
            <Link
                href={`/siswa/ujian/${id}`}
                className="mt-12 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
                Mulai Ujian
            </Link>
        </div>
    );
}