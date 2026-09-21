import { Clock } from "lucide-react";
import { CalendarDays, RefreshCcw } from "lucide-react";
import React from "react";

type ExamTodayProps = {
    jumlah: number,
    nextMapel: string,
    time: string,
    title: string,
}

export default function ExamToday({
    jumlah,
    nextMapel,
    time,
    title
}: ExamTodayProps) {
    return (
        <div className="bg-blue-500 w-full h-[180px] p-[27px] mt-[30px] rounded-xl flex ">
            <div className="flex flex-col justify-between">
                <p
                    className="text-white font-sm text-slate-200"
                >
                    {title}
                </p>

                <p
                    className="text-[35px] text-white font-bold"
                >
                    {jumlah}
                </p>

                <div className="flex font-sm text-white gap-2">
                    <Clock size={20}
                        color="white"
                    />
                    <p>Selanjutnya : {nextMapel} waktu {time}</p>

                </div>
            </div>

            {/* <div className="relative left-[260px] -top-[15%]">
                <CalendarDays size={170}
                    color="white"
                />

                <RefreshCcw
                    size={50}
                    className="absolute left-[65%] -bottom-9 rounded-full bg-white"
                />
            </div> */}

        </div>
    );
}