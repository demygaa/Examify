import React from "react";

type ExamPresentProps = {
    present: string;
};

export default function ExamPresent({
    present,
}: ExamPresentProps) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl w-full p-[27px] mt-[30px] flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <p className="text-black font-sm text-slate-700">
                    KEHADIRAN</p>

                <p className="text-[30px] font-bold text-black">
                    {present}</p>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                    className="h-4 rounded-full bg-blue-600"
                    style={{ width: present }}
                />
            </div>
        </div>
    );
}