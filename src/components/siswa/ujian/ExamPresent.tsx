import React from "react";

type ExamPresentProps = {
    present: string;
};

export default function ExamPresent({
    present,
}: ExamPresentProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl w-full p-4 sm:p-[27px] mt-4 lg:mt-[30px] flex flex-col justify-between h-[160px] sm:h-[180px]">
            <div className="flex flex-col gap-1 sm:gap-2">
                <p className="text-black text-sm sm:text-base text-slate-700">
                    KEHADIRAN</p>

                <p className="text-2xl sm:text-[30px] font-bold text-black">
                    {present}</p>
            </div>
            <div className="h-1.5 sm:h-2 w-full rounded-full bg-slate-200">
                <div
                    className="h-1.5 sm:h-2 rounded-full bg-blue-600"
                    style={{ width: present }}
                />
            </div>
        </div>
    );
}