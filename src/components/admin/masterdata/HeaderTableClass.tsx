"use client";

import { Search, RotateCcw } from "lucide-react";

type ClassTableHeaderProps = {
    search: string;
    onSearchChange: (value: string) => void;
    tingkat: string;
    onTingkatChange: (value: string) => void;
    jurusan: string;
    onJurusanChange: (value: string) => void;
    tingkatOptions: string[];
    jurusanOptions: string[];
    onReset: () => void;
};

export default function ClassTableHeader({
    search,
    onSearchChange,
    tingkat,
    onTingkatChange,
    jurusan,
    onJurusanChange,
    tingkatOptions,
    jurusanOptions,
    onReset,
}: ClassTableHeaderProps) {
    return (
        <div className="flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Search */}
            <div className="relative w-full sm:w-[270px]">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search class name..."
                    className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none"
                />
            </div>

            {/* Filter */}
            <div className="flex flex-wrap items-center gap-2">

                <select
                    value={tingkat}
                    onChange={(e) => onTingkatChange(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
                >
                    <option value="">All Grades</option>
                    {tingkatOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <select
                    value={jurusan}
                    onChange={(e) => onJurusanChange(e.target.value)}
                    className="max-w-[200px] rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
                >
                    <option value="">All Majors</option>
                    {jurusanOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={onReset}
                    className="flex items-center gap-1 px-2 py-2 text-sm"
                >
                    <RotateCcw size={14} />
                    Reset
                </button>

            </div>

        </div>
    );
}
