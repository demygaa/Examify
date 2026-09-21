"use client"

import { Search, ChevronDown, } from "lucide-react";


type Props = {
    search: string;
    onSearchChange: (value: string) => void;
};
export default function HeaderReportTable({
    search,
    onSearchChange,
} : Props) {
    return (
        <div className="flex items-center gap-2 border-b border-slate-300 p-3 justify-between">
            <div className="relative w-[400px] flex rounded-xl">
                <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    placeholder="Search by name, NIS, NIP..."
                    className="h-8 w-full rounded border border-slate-300 pl-8 pr-3 text-[15px] outline-none focus:border-blue-500"
                />
            </div>
            <FilterButton text="Status" />
        </div>
    );
}

function FilterButton({ text }: { text: string }) {
    return (
        <button className="flex h-8 min-w-[66px] items-center justify-between gap-2 rounded border border-slate-300 px-3 text-[15px] rounded-xl">
            {text}

            <ChevronDown size={20} />
        </button>
    );
}