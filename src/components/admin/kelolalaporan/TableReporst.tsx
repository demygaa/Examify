import {
    Eye,
    GraduationCap,
    ShieldCheck,
    User,
} from "lucide-react";
import { useState } from "react";
import LaporanDetailDrawer from "@/src/components/admin/kelolalaporan/LaporanDetailDrawer";

export type Reports = {
    id: string;
    laporan: string;
    dikirim: string;
    terkirim: string;
    status: "Pending" | "Proses" | "Selesai";
    role: "Siswa" | "Guru" | "Admin";
    kategori: "Akun" | "Ujian" | "Server";
};

type Props = {
    data: Reports[];
    onChanged?: () => void;
};

export default function TableReports({ data, onChanged }: Props) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="overflow-x-auto px-[10px]">
            <table className="w-full">
                <thead>
                    <tr className="h-9 border-b border-slate-300 text-left text-[9px] uppercase text-slate-600">
                        <th>Laporan</th>
                        <th>Dikirim</th>
                        <th>Kategori</th>
                        <th>Terkirim</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((report) => {
                        const Icon =
                            report.role === "Siswa"
                                ? GraduationCap
                                : report.role === "Guru"
                                ? User
                                : ShieldCheck;

                        const Status =
                            report.status === "Pending"
                                ? "rounded bg-orange-100 px-2 py-1 text-[9px] text-orange-700"
                                : report.status === "Proses"
                                ? "rounded bg-blue-100 px-2 py-1 text-[9px] text-blue-700"
                                : "rounded bg-emerald-100 px-2 py-1 text-[9px] text-emerald-700";

                        return (
                            <tr
                                key={report.id}
                                className="h-14 border-b border-slate-300 text-xs"
                            >
                                <td>
                                    <p className="font-medium">
                                        {report.laporan}
                                    </p>
                                </td>

                                <td>
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            size={28}
                                            className="rounded-full bg-slate-200 p-1.5 text-slate-600"
                                        />

                                        <div>
                                            <p className="font-medium">
                                                {report.dikirim}
                                            </p>

                                            <p className="text-[9px] text-slate-500">
                                                {report.role}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <span className="rounded bg-slate-200 px-2 py-1 text-[9px] text-slate-600">
                                        {report.kategori}
                                    </span>
                                </td>

                                <td>
                                    {report.terkirim}
                                </td>

                                <td>
                                    <span className={Status}>
                                        {report.status}
                                    </span>
                                </td>

                                <td>
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            aria-label={`Lihat detail ${report.laporan}`}
                                            onClick={() =>
                                                setSelectedId(report.id)
                                            }
                                            className="text-slate-500 hover:text-slate-700"
                                        >
                                            <Eye size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="py-10 text-center text-sm text-slate-500"
                            >
                                Tidak ada laporan
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <LaporanDetailDrawer
                id={selectedId}
                onClose={() => setSelectedId(null)}
                onChanged={onChanged}
            />
        </div>
    );
}
