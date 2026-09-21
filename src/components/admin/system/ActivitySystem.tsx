import { ClipboardList } from "lucide-react";

type Activity = {
    id: number;
    timestamp: string;
    eventType: string;
    description: string;
    status: "Success" | "Failed";
};

type RecentActivityProps = {
    data: Activity[];
};

export default function RecentActivity({
    data,
}: RecentActivityProps) {
    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm w-full">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-300 px-5 py-4">

                <div className="flex items-center gap-2">
                    <ClipboardList
                        size={25}
                        color="blue"
                    />

                    <p className="text-black font-semibold text-[18px]">
                        Aktivitas Sistem Terbaru
                    </p>
                </div>

                <button className="text-blue-700 font-semibold text-[14px]">
                    Lihat Semua Log
                </button>

            </div>

            {/* Table */}
            <table className="w-full">

                <thead>
                    <tr className="bg-blue-50 border-b border-slate-300 text-slate-600 text-[13px]">
                        <th className="text-left px-5 py-3">
                            Waktu
                        </th>

                        <th className="text-left px-5 py-3">
                            Jenis Aktivitas
                        </th>

                        <th className="text-left px-5 py-3">
                            Deskripsi
                        </th>

                        <th className="text-left px-5 py-3">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((activity) => (
                        <tr
                            key={activity.id}
                            className="border-b border-slate-200 last:border-b-0"
                        >

                            <td className="px-5 py-4 text-sm">
                                {activity.timestamp}
                            </td>

                            <td className="px-5 py-4 font-medium text-sm">
                                {activity.eventType}
                            </td>

                            <td className="px-5 py-4 text-slate-600 text-sm">
                                {activity.description}
                            </td>

                            <td className="px-5 py-4">
                                <span
                                    className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                        activity.status === "Success"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {activity.status === "Success"
                                        ? "Berhasil"
                                        : "Gagal"}
                                </span>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}