import { Search, RotateCcw } from "lucide-react";

export type MapelStatusFilter = "all" | "active" | "inactive";

type HeaderTableMapelProps = {
    search: string;
    onSearchChange: (value: string) => void;
    status: MapelStatusFilter;
    onStatusChange: (value: MapelStatusFilter) => void;
    onReset: () => void;
};

export default function HeaderTableMapel({
    search,
    onSearchChange,
    status,
    onStatusChange,
    onReset,
}: HeaderTableMapelProps) {
    return (
        <div>
            <div className="flex flex-row justify-between items-center p-[10px] ">
                <div className="relative w-[270px]">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search mapel..."
                        className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none"
                    />
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <select
                        value={status}
                        onChange={(e) =>
                            onStatusChange(e.target.value as MapelStatusFilter)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
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
        </div>
    );
}
