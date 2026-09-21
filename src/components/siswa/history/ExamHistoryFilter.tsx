"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

type ExamHistoryFilterProps = {
    selectedMapel: string;
    selectedSort: string;
    onMapelChange: (value: string) => void;
    onSortChange: (value: string) => void;
};

export default function ExamHistoryFilter({
    selectedMapel,
    selectedSort,
    onMapelChange,
    onSortChange,
}: ExamHistoryFilterProps) {

    const [mapelOpen, setMapelOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const mapelOptions = [
        "Semua Subjek",
        "Matematika",
        "Bahasa Indonesia",
        "Sains",
    ];

    const sortOptions = [
        "Terbaru",
        "Terlama",
    ];

    return (
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

            {/* FILTER MAPEL */}
            <div className="relative">

                <button
                    onClick={() => {
                        setMapelOpen(!mapelOpen);
                        setSortOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-800"
                >
                    <SlidersHorizontal
                        size={18}
                        className="text-blue-600"
                    />

                    {selectedMapel}

                    <ChevronDown size={15} />
                </button>

                {mapelOpen && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">

                        {mapelOptions.map((mapel) => (
                            <button
                                key={mapel}
                                onClick={() => {
                                    onMapelChange(mapel);
                                    setMapelOpen(false);
                                }}
                                className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 ${
                                    selectedMapel === mapel
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-700"
                                }`}
                            >
                                {mapel}
                            </button>
                        ))}

                    </div>
                )}

            </div>


            {/* SORT */}
            <div className="relative">

                <button
                    onClick={() => {
                        setSortOpen(!sortOpen);
                        setMapelOpen(false);
                    }}
                    className="flex items-center gap-6 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700"
                >
                    {selectedSort}

                    <ChevronDown size={15} />
                </button>

                {sortOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-32 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">

                        {sortOptions.map((sort) => (
                            <button
                                key={sort}
                                onClick={() => {
                                    onSortChange(sort);
                                    setSortOpen(false);
                                }}
                                className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 ${
                                    selectedSort === sort
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-700"
                                }`}
                            >
                                {sort}
                            </button>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}