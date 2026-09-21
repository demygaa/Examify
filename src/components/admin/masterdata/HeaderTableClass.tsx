"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

type ClassTableHeaderProps = {
    search: string;
    onSearchChange: (value: string) => void;
};

export default function ClassTableHeader({
    search,
    onSearchChange,
}: ClassTableHeaderProps) {
    return (
        <div className="flex items-center justify-between border-b border-slate-200 p-3">

            {/* Search */}
            <div className="relative w-[270px]">
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
            <div className="flex items-center gap-2">

                <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    All Statuses
                </button>

                <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    All Grades
                </button>

                <button className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    <SlidersHorizontal size={15} />
                    Filter
                </button>

                <button className="flex items-center gap-1 px-2 py-2 text-sm">
                    <RotateCcw size={14} />
                    Reset
                </button>

            </div>

        </div>
    );
}