"use client";

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

type SearchCardPropsFilter = {
    selectedYear?: string;
    onYearChange: (value: string) => void;
};

export default function SearchCard({
    selectedYear,
    onYearChange,
}: SearchCardPropsFilter) {
    const [yearOpen, setYearOpen] = useState(false);

    const yearOption = [
        "2023-2024",
        "2024-2025",
        "2025-2026",
    ];

    return (
        <div className="bg-white rounded-xl p-3 flex items-center justify-between gap-4 shadow-sm">

            {/* Search */}
            <div className="relative flex-1">
                <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    placeholder="Cari..."
                    className="w-full border border-slate-300 rounded-lg py-2 pl-10 pr-3 outline-none text-black placeholder:text-slate-400 focus:border-blue-500"
                />
            </div>

            {/* Dropdown Tahun */}
            <div className="relative w-[300px]">
                <button
                    type="button"
                    onClick={() => setYearOpen(!yearOpen)}
                    className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-2 text-black text-right"
                >
                    {selectedYear}
                    <ChevronDown
                        size={15}
                        className={`transition-transform ${
                            yearOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {yearOpen && (
                    <div className="absolute right-0 top-full mt-2 z-10 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden min-w-[140px]">
                        {yearOption.map((year) => (
                            <button
                                type="button"
                                key={year}
                                onClick={() => {
                                    onYearChange(year);
                                    setYearOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-black hover:bg-slate-100"
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}