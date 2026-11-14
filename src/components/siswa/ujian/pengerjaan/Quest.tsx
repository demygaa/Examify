"use client"
import { Info } from "lucide-react";
import AnswerOption from "./Answer";
export default function Quest() {
    const options = [
        {
            label: "A",
            answer: "21",
        },
        {
            label: "B",
            answer: "24",
        },
        {
            label: "C",
            answer: "25",
        },
        {
            label: "D",
            answer: "26",
        },
        {
            label: "E",
            answer: "28",
        },
    ];
    return (
        <div className="bg-white p-4 sm:p-[20px] mt-4 sm:mt-[20px] rounded-xl">
            <div className="flex flex-row justify-between items-center">
                <p className="bg-blue-200 text-blue-700 font-semibold px-2.5 sm:px-3 py-1 w-fit rounded-xl border border-slate-300 text-sm sm:text-base">Pertanyaan 12</p>
                <div className="flex flex-row gap-1.5 sm:gap-3 items-center">
                    <Info
                        size={18}
                        className="sm:w-5 sm:h-5 text-slate-500"
                    />
                    <p className="text-slate-500 text-xs sm:text-sm">Laporkan Masalah</p>
                </div>
            </div>
            <div className="w-full mt-4 sm:mt-[20px]">
                <p className="min-w-0 text-black text-base sm:text-[18px] lg:text-[20px]">Jika diketahui fungsi f(x) = 2x + 3 dan g(x) = x² - 1, maka nilai dari komposisi
                    fungsi (g ∘ f)(1) adalah...</p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-[20px]">
                {options.map((option) => (
                    <AnswerOption
                        key={option.label}
                        label={option.label}
                        answer={option.answer}
                        selected={option.label === "B"}
                    />
                ))}
            </div>
        </div>
    );
}