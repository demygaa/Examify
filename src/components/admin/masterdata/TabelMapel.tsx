import {  MoreVertical   } from "lucide-react"
const mapel = [
    {
        code: "MAT101",
        nama: "Mathematics Core",
        status: "Active",
        created: "Aug 15, 2023",
    },
    {
        code: "PHY201",
        nama: "Advanced Physics",
        status: "Active",
        created: "Aug 15, 2023",
    },
    {
        code: "ENG102",
        nama: "English Literature",
        status: "Active",
        created: "Aug 16, 2023",
    },
    {
        code: "HIS099",
        nama: "Ancient History (Legacy)",
        status: "Inactive",
        created: "Jan 10, 2022",
    },
    {
        code: "BIO205",
        nama: "Human Biology",
        status: "Active",
        created: "Sep 01, 2023",
    },
];

export default function TableMapel() {
    return (
        <div className="border border-slate-300 overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr className="border-b border-slate-300">
                        <th className="text-left px-6 py-4 text-sm font-semibold">
                            CODE
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold">
                            NAMA MAPEL
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold">
                            STATUS
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold">
                            CREATED
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold">
                            ACTION
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {mapel.map((item) => (
                        <tr
                            key={item.code}
                            className="border-b border-slate-300"
                        >
                            <td className="px-6 py-6">
                                {item.code}
                            </td>

                            <td className="px-6 py-6">
                                {item.nama}
                            </td>

                            <td className="px-6 py-6">
                                <span
                                    className={
                                        item.status === "Active"
                                            ? "bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm"
                                            : "bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
                                    }
                                >
                                    {item.status}
                                </span>
                            </td>

                            <td className="px-6 py-6">
                                {item.created}
                            </td>

                            <td className="px-3 py-3">

                                <button>
                                    <MoreVertical
                                        size={17}
                                        className="text-slate-500"
                                    />
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}