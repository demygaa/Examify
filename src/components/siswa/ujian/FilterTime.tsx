"use client";

import { useState } from "react";

type FilterOption = {
    label: string;
    value: string;
};

type FilterTime = {
    options: FilterOption[];
    onChange?: (value: string) => void;
};

export default function ExamFilter({
    options,
    onChange,
}: FilterTime) {
    const [active, setActive] = useState(options[0]?.value);

    const handleChange = (value: string) => {
        setActive(value);
        onChange?.(value);
    };

    return (
        <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-300 bg-slate-100 p-1.5">
            {options.map((option) => {
                const isActive = active === option.value;

                return (
                    <button
                        key={option.value}
                        onClick={() => handleChange(option.value)}
                        className={`rounded-lg px-6 py-2.5 text-[15px] font-semibold transition ${
                            isActive
                                ? "bg-white text-blue-700 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}