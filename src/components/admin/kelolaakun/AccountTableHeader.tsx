"use client";

import {
    Search,
    ChevronDown,
} from "lucide-react";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
};

export default function AccountTableHeader({
    search,
    onSearchChange,
}: Props) {
    return (
        <div className="flex items-center gap-2 border-b border-slate-300 p-3">
            {/* Search */}
            <div className="relative flex-1">
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    placeholder="Search by name, NIS, NIP..."
                    className="h-7 w-full rounded border border-slate-300 pl-8 pr-3 text-xs outline-none focus:border-blue-500"
                />
            </div>

            

            {/* Status */}
            <FilterButton text="Status" />

            {/* Class */}
            <FilterButton text="Class" />

          
        </div>
    );
}

function FilterButton({ text }: { text: string }) {
    return (
        <button className="flex h-7 min-w-[66px] items-center justify-between gap-2 rounded border border-slate-300 px-3 text-xs">
            {text}

            <ChevronDown size={12} />
        </button>
    );
}