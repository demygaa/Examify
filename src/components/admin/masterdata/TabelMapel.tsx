"use client";

import { useState } from "react";
import { Eye, Pencil, RotateCcw, Trash2 } from "lucide-react";
import MapelDetailDrawer from "@/src/components/admin/masterdata/MapelDetailDrawer";

export type MapelData = {
    id: string;
    kode: string;
    nama: string;
    isActive: boolean;
    createdAt: string;
    jumlahGuru: number;
};

type TableMapelProps = {
    data: MapelData[];
    onEdit?: (item: MapelData) => void;
    onToggleStatus?: (item: MapelData) => void;
};

function formatTanggal(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function TableMapel({
    data,
    onEdit,
    onToggleStatus,
}: TableMapelProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <>
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
                            <th className="text-center px-6 py-4 text-sm font-semibold">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-8 text-center text-sm text-slate-500"
                                >
                                    Belum ada data mapel
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-slate-300"
                                >
                                    <td className="px-6 py-6">
                                        {item.kode}
                                    </td>

                                    <td className="px-6 py-6">
                                        {item.nama}
                                    </td>

                                    <td className="px-6 py-6">
                                        <span
                                            className={
                                                item.isActive
                                                    ? "bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm"
                                                    : "bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
                                            }
                                        >
                                            {item.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-6">
                                        {formatTanggal(item.createdAt)}
                                    </td>

                                    <td className="px-3 py-3">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                type="button"
                                                aria-label={`Lihat detail ${item.kode}`}
                                                onClick={() =>
                                                    setSelectedId(item.id)
                                                }
                                                className="text-slate-500 hover:text-slate-700"
                                            >
                                                <Eye size={17} />
                                            </button>

                                            {onEdit && (
                                                <button
                                                    type="button"
                                                    aria-label={`Edit ${item.kode}`}
                                                    onClick={() => onEdit(item)}
                                                    className="text-slate-500 hover:text-blue-700"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            )}

                                            {onToggleStatus &&
                                                (item.isActive ? (
                                                    <button
                                                        type="button"
                                                        aria-label={`Nonaktifkan ${item.kode}`}
                                                        title="Nonaktifkan"
                                                        onClick={() =>
                                                            onToggleStatus(item)
                                                        }
                                                        className="text-slate-500 hover:text-red-600"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        aria-label={`Aktifkan kembali ${item.kode}`}
                                                        title="Aktifkan kembali"
                                                        onClick={() =>
                                                            onToggleStatus(item)
                                                        }
                                                        className="text-slate-500 hover:text-emerald-600"
                                                    >
                                                        <RotateCcw size={16} />
                                                    </button>
                                                ))}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <MapelDetailDrawer
                id={selectedId}
                onClose={() => setSelectedId(null)}
            />
        </>
    );
}
