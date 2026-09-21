import Link from "next/link";

export default function OverviewAccount() {
    const accountData = [
        {
            id: 1,
            title: "Active Students",
            description: "1,210 active (38 inactive)",
            percentage: "92%",
            dot: "bg-blue-600",
        },
        {
            id: 2,
            title: "Active Teachers",
            description: "84 active (2 inactive)",
            percentage: "6%",
            dot: "bg-blue-200",
        },
        {
            id: 3,
            title: "Administrators",
            description: "4 active",
            percentage: "2%",
            dot: "bg-blue-100 border border-slate-300",
        },
    ];
    return (
        <div className="bg-white rounded-xl shadow-sm p-[27px] h-full">

            {/* Header */}
            <div className="flex flex-row justify-between">
                <p className="font-semibold text-black">
                    Account Overview
                </p>

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
                        1.3k
                    </p>

                    <p className="text-sm text-slate-500">
                        Total Account
                    </p>

                </div>

                <div>
                    {/* Account Statistics */}
                    <div className="mt-8 flex flex-col gap-7">

                        {accountData.map((account) => (
                            <div
                                key={account.id}
                                className="flex items-center gap-5"
                            >
                                {/* Dot */}
                                <div
                                    className={`h-3 w-3 shrink-0 rounded-full ${account.dot}`}
                                />

                                {/* Description */}
                                <div className="flex-1">
                                    <p className="text-[20px] font-medium text-slate-900">
                                        {account.title}
                                    </p>

                                    <p className="text-[15px] text-slate-500">
                                        {account.description}
                                    </p>
                                </div>

                                {/* Percentage */}
                                <p className="text-[20px] font-bold text-slate-900">
                                    {account.percentage}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}