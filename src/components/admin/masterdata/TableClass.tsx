import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ClassDetailDrawer from "@/src/components/admin/masterdata/detailclass";

export type ClassData = {
    id: string;
    tingkat: string;
    jurusan: string;
    kodeKelas: string;
    jumlahSiswa: number;
    kodeJurusan: string;
    waliKelasId: string | null;
    waliKelasNama: string | null;
    waliKelasNip: string | null;
};

type ClassTableProps = {
    data: ClassData[];
    onEdit?: (item: ClassData) => void;
    onDelete?: (item: ClassData) => void;
};

export default function ClassTable({
    data,
    onEdit,
    onDelete,
}: ClassTableProps) {

    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <>
            <table className="w-full text-left">

                <thead>
                    <tr className="border-b border-slate-300 bg-slate-50 text-[11px]">
                        <th className="px-3 py-1">NOMOR</th>
                        <th className="px-3 py-3">TINGKAT</th>
                        <th className="px-3 py-3">JURUSAN</th>
                        <th className="px-3 py-3">KODE KELAS</th>
                        <th className="px-3 py-3">WALI KELAS</th>
                        <th className="px-3 py-3 text-center">ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-3 py-8 text-center text-sm text-slate-500"
                            >
                                Belum ada data kelas
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr
                                key={item.id}
                                className="border-b border-slate-200"
                            >
                                <td className="px-3 py-1">
                                    {index + 1}
                                </td>
                                <td className="px-3 py-3">
                                    <p className="text-sm">
                                        {item.tingkat}
                                    </p>
                                </td>

                                <td className="px-3 py-3 text-sm">
                                    {item.jurusan}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                    {item.kodeKelas}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                    {item.waliKelasNama ?? "-"}
                                </td>


                                <td className="px-3 py-3">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            aria-label={`Lihat detail ${item.kodeKelas}`}
                                            onClick={() => setSelectedId(item.id)}
                                            className="text-slate-500 hover:text-slate-700"
                                        >
                                            <Eye size={17} />
                                        </button>

                                        {onEdit && (
                                            <button
                                                type="button"
                                                aria-label={`Edit ${item.kodeKelas}`}
                                                onClick={() => onEdit(item)}
                                                className="text-slate-500 hover:text-blue-700"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        )}

                                        {onDelete && (
                                            <button
                                                type="button"
                                                aria-label={`Hapus ${item.kodeKelas}`}
                                                onClick={() => onDelete(item)}
                                                className="text-slate-500 hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>

                            </tr>
                        ))
                    )}
                </tbody>

            </table>


            <ClassDetailDrawer
                id={selectedId}
                onClose={() => setSelectedId(null)}
            />

        </>
    );
}
