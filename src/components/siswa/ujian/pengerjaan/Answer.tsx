"use client";

import { CheckCircle2 } from "lucide-react";

type AnswerOptionProps = {
    label: string;
    answer: string;
    selected?: boolean;
};

export default function AnswerOption({
    label,
    answer,
    selected = false,
}: AnswerOptionProps) {
    return (
        <button
            type="button"
            className={`w-full h-[60px] rounded-xl border-2 px-3 flex items-center gap-3 text-left transition
                ${
                    selected
                        ? "border-blue-600"
                        : "border-slate-300 hover:border-blue-400"
                }
            `}
        >
            {/* Label A/B/C/D/E */}
            <div
                className={`w-[30px] h-[30px] rounded-md flex items-center justify-center font-semibold text-sm
                    ${
                        selected
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-slate-300 text-slate-600"
                    }
                `}
            >
                {label}
            </div>

            {/* Jawaban */}
            <span className="text-[15px] text-slate-700">
                {answer}
            </span>

            {/* Icon ketika dipilih */}
            {selected && (
                <CheckCircle2
                    size={21}
                    className="ml-auto text-blue-600"
                />
            )}
        </button>
    );
}