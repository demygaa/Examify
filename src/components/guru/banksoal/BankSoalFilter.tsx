"use client";

import { ArrowDownUp, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export type SortOrder = "newest" | "oldest";

type BankSoalFilterProps = {
    query: string;
    onQueryChange: (value: string) => void;
    selectedMapel: string;
    onMapelChange: (value: string) => void;
    mapelOptions: string[];
    sortOrder: SortOrder;
    onSortOrderChange: (value: SortOrder) => void;
};

export default function BankSoalFilter({
    query,
    onQueryChange,
    selectedMapel,
    onMapelChange,
    mapelOptions,
    sortOrder,
    onSortOrderChange,
}: BankSoalFilterProps) {
    const [mapelOpen, setMapelOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const mapelLabel =
        selectedMapel === "all" ? "Semua Mapel" : selectedMapel;
    const sortLabel = sortOrder === "newest" ? "Terbaru" : "Terlama";

    return (
        <div className="flex w-full flex-col items-stretch gap-3 rounded-xl bg-white p-2.5 shadow-sm sm:p-3 lg:flex-row lg:items-center">
            <div className="relative w-full flex-1">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 sm:h-5 sm:w-5"
                />

                <input
                    type="text"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder="Cari bank soal..."
                    className="w-full rounded-lg border border-slate-300 py-1.5 pl-10 pr-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-blue-500 sm:py-2"
                />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-[180px]">
                    <button
                        type="button"
                        onClick={() => {
                            setMapelOpen((open) => !open);
                            setSortOpen(false);
                        }}
                        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-black sm:px-4 sm:py-2 sm:text-sm"
                    >
                        <span className="truncate">{mapelLabel}</span>

                        <ChevronDown
                            size={14}
                            className={`shrink-0 transition-transform ${
                                mapelOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {mapelOpen && (
                        <div className="absolute left-0 top-full z-20 mt-1 min-w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg sm:mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    onMapelChange("all");
                                    setMapelOpen(false);
                                }}
                                className={`w-full px-3 py-1.5 text-left text-sm hover:bg-slate-100 sm:px-4 sm:py-2 ${
                                    selectedMapel === "all"
                                        ? "font-semibold text-blue-600"
                                        : "text-black"
                                }`}
                            >
                                Semua Mapel
                            </button>

                            {mapelOptions.map((mapel) => (
                                <button
                                    type="button"
                                    key={mapel}
                                    onClick={() => {
                                        onMapelChange(mapel);
                                        setMapelOpen(false);
                                    }}
                                    className={`w-full whitespace-nowrap px-3 py-1.5 text-left text-sm hover:bg-slate-100 sm:px-4 sm:py-2 ${
                                        selectedMapel === mapel
                                            ? "font-semibold text-blue-600"
                                            : "text-black"
                                    }`}
                                >
                                    {mapel}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative min-w-[150px]">
                    <button
                        type="button"
                        onClick={() => {
                            setSortOpen((open) => !open);
                            setMapelOpen(false);
                        }}
                        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-black sm:px-4 sm:py-2 sm:text-sm"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowDownUp size={14} className="text-slate-400" />
                            {sortLabel}
                        </span>

                        <ChevronDown
                            size={14}
                            className={`shrink-0 transition-transform ${
                                sortOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {sortOpen && (
                        <div className="absolute right-0 top-full z-20 mt-1 min-w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg sm:mt-2">
                            {(
                                [
                                    ["newest", "Terbaru"],
                                    ["oldest", "Terlama"],
                                ] as const
                            ).map(([value, label]) => (
                                <button
                                    type="button"
                                    key={value}
                                    onClick={() => {
                                        onSortOrderChange(value);
                                        setSortOpen(false);
                                    }}
                                    className={`w-full whitespace-nowrap px-3 py-1.5 text-left text-sm hover:bg-slate-100 sm:px-4 sm:py-2 ${
                                        sortOrder === value
                                            ? "font-semibold text-blue-600"
                                            : "text-black"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
