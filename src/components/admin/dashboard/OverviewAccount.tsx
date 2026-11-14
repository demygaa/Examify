import Link from "next/link";

export type AccountOverviewItem = {
    title: string;
    active: number;
    inactive: number;
    percentage: number;
};

type OverviewAccountProps = {
    total: number;
    items: AccountOverviewItem[];
};

const DOT_CLASSES = [
    "bg-blue-600",
    "bg-blue-300",
    "bg-blue-100 border border-slate-300",
];

function formatTotal(total: number): string {
    if (total >= 1000) {
        return `${(total / 1000).toFixed(1).replace(".0", "")}k`;
    }

    return String(total);
}

export default function OverviewAccount({
    total,
    items,
}: OverviewAccountProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-[27px] h-full">
            {/* Header */}
            <div className="flex flex-row justify-between">
                <p className="font-semibold text-black">Account Overview</p>

                <Link
                    href="/admin/kelolaakun"
                    className="text-blue-700 font-semibold text-[15px]"
                >
                    Lihat Semua
                </Link>
            </div>

            {/* Content */}
            <div className="flex flex-row items-center justify-center py-[115px] gap-[20px]">
                <div className="flex h-[180px] w-[180px] flex-col items-center justify-center rounded-full border-8 border-slate-300">
                    <p className="text-black font-semibold text-[40px]">
                        {formatTotal(total)}
                    </p>

                    <p className="text-sm text-slate-500">Total Account</p>
                </div>

                <div>
                    {/* Account Statistics */}
                    <div className="mt-8 flex flex-col gap-7">
                        {items.map((item, index) => (
                            <div
                                key={item.title}
                                className="flex items-center gap-5"
                            >
                                {/* Dot */}
                                <div
                                    className={`h-3 w-3 shrink-0 rounded-full ${
                                        DOT_CLASSES[index] ?? DOT_CLASSES[0]
                                    }`}
                                />

                                {/* Description */}
                                <div className="flex-1">
                                    <p className="text-[20px] font-medium text-slate-900">
                                        {item.title}
                                    </p>

                                    <p className="text-[15px] text-slate-500">
                                        {item.active} aktif
                                        {item.inactive > 0
                                            ? ` (${item.inactive} nonaktif)`
                                            : ""}
                                    </p>
                                </div>

                                {/* Percentage */}
                                <p className="text-[20px] font-bold text-slate-900">
                                    {item.percentage}%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
