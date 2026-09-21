import { MoreVertical } from "lucide-react";

export type ClassData = {
    id: number;
    name: string;
    room: string;
    grade: string;
    major: string;
    students: number;
    status: "Active" | "Inactive";
    createdAt: string;
};

type ClassTableProps = {
    data: ClassData[];
};

export default function ClassTable({
    data,
}: ClassTableProps) {
    return (
        <table className="w-full text-left">

            <thead>
                <tr className="border-b border-slate-300 bg-slate-50 text-[11px]">
                    <th className="px-3 py-3">CLASS NAME</th>
                    <th className="px-3 py-3">GRADE LEVEL</th>
                    <th className="px-3 py-3">MAJOR/STREAM</th>
                    <th className="px-3 py-3">STUDENTS</th>
                    <th className="px-3 py-3">STATUS</th>
                    <th className="px-3 py-3">CREATED DATE</th>
                    <th className="px-3 py-3">ACTIONS</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item) => (
                    <tr
                        key={item.id}
                        className="border-b border-slate-200"
                    >

                        <td className="px-3 py-3">
                            <p className="text-sm">
                                {item.name}
                            </p>

                            <p className="text-xs text-slate-500">
                                {item.room}
                            </p>
                        </td>

                        <td className="px-3 py-3 text-sm">
                            {item.grade}
                        </td>

                        <td className="px-3 py-3 text-sm">
                            {item.major}
                        </td>

                        <td className="px-3 py-3 text-center text-sm">
                            {item.students}
                        </td>

                        <td className="px-3 py-3">

                            <span
                                className={`rounded-full px-3 py-1 text-xs ${
                                    item.status === "Active"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-slate-100 text-slate-500"
                                }`}
                            >
                                ● {item.status}
                            </span>

                        </td>

                        <td className="px-3 py-3 text-sm">
                            {item.createdAt}
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
    );
}