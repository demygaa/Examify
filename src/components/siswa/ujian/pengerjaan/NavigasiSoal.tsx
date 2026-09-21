"use client";

import { useState } from "react";

type QuestionStatus = "answered" | "unanswered" | "review";

const questions: {
    number: number;
    status: QuestionStatus;
}[] = Array.from({ length: 40 }, (_, index) => {
    const number = index + 1;

    return {
        number,
        status:
            [1, 2, 3, 4, 6, 7, 9, 10, 11].includes(number)
                ? "answered"
                : [5, 8].includes(number)
                ? "review"
                : "unanswered",
    };
});

export default function QuestionNavigation() {
    const [currentQuestion, setCurrentQuestion] = useState(12);

    return (
        <div className="w-[275px] rounded-xl border border-slate-300 bg-[#FAF9FF] p-4 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-semibold text-slate-800">
                    Navigasi Soal
                </h2>

                <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-700" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                </div>
            </div>

            {/* Legend */}
            <div className="mt-5 flex items-center gap-3 text-[10px] text-slate-700">
                <div className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-blue-600" />
                    <span>Terjawab</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="h-2 w-2 border border-slate-300 bg-white" />
                    <span>Belum</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-amber-700" />
                    <span>Ragu-ragu</span>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-4 border-slate-300" />

            {/* Question Grid */}
            <div className="grid grid-cols-5 gap-3">
                {questions.map((question) => {
                    const isCurrent =
                        currentQuestion === question.number;

                    return (
                        <button
                            key={question.number}
                            type="button"
                            onClick={() =>
                                setCurrentQuestion(question.number)
                            }
                            className={`
                                relative flex h-[38px] w-[38px]
                                items-center justify-center
                                rounded-md border text-[12px]
                                transition
                                ${
                                    isCurrent
                                        ? "border-blue-500 bg-blue-100 text-blue-700 ring-1 ring-blue-400"
                                        : question.status === "answered"
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : question.status === "review"
                                        ? "border-amber-700 bg-amber-700 text-white"
                                        : "border-slate-300 bg-[#FAF9FF] text-slate-600"
                                }
                            `}
                        >
                            {question.number}

                            {/* tanda kecil untuk ragu-ragu */}
                            {question.status === "review" && (
                                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-white" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}