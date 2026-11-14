"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { MapelData } from "@/src/components/admin/masterdata/TabelMapel";

type CreateMapelProps = {
    onClose: () => void;
    onCreated?: () => void;
    initial?: MapelData;
};

export default function CreateMapel({
    onClose,
    onCreated,
    initial,
}: CreateMapelProps) {
    const [successMessage, setSuccessMessage] = useState("");
    const [failMessage, setFailMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const isEdit = Boolean(initial);

    const inputClass =
        "px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setFailMessage("");

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            kode_mapel: String(formData.get("kode_mapel")).toUpperCase(),
            nama_mapel: String(formData.get("nama_mapel")),
        };

        try {
            const response = await fetch(
                isEdit
                    ? `/api/admin/mapel/${initial?.id}`
                    : "/api/admin/mapel",
                {
                    method: isEdit ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Gagal menyimpan data");
            }

            setSuccessMessage(
                isEdit
                    ? "Mapel berhasil diperbarui"
                    : "Mapel berhasil ditambahkan"
            );
            onCreated?.();

            if (isEdit) {
                setTimeout(() => {
                    onClose();
                }, 800);

                return;
            }

            form.reset();

            setTimeout(() => {
                setSuccessMessage("");
            }, 1500);
        } catch (error) {
            setFailMessage((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-sm rounded-xl p-[27px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto h-fit flex flex-col gap-[20px] border border-slate-300"
            >
                <div className="flex justify-between items-center">
                    <p className="text-black font-semibold">
                        {isEdit ? "Edit Mapel" : "Tambahkan Mapel"}
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup"
                    >
                        <X strokeWidth={3} color="blue" />
                    </button>
                </div>

                {successMessage && (
                    <p className="text-green-700 font-medium">
                        {successMessage}
                    </p>
                )}

                {failMessage && (
                    <p className="text-red-700 font-medium">{failMessage}</p>
                )}

                <div className="flex gap-2 flex-col">
                    <label className="font-semibold">Kode Mapel</label>

                    <input
                        type="text"
                        name="kode_mapel"
                        required
                        defaultValue={initial?.kode ?? ""}
                        placeholder="KODE WAJIB KAPITAL"
                        className={inputClass}
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <label className="font-semibold">Mata Pelajaran</label>

                    <input
                        type="text"
                        name="nama_mapel"
                        required
                        defaultValue={initial?.nama ?? ""}
                        placeholder="Contoh Rekayasa Perangkat Lunak"
                        className={inputClass}
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 w-full"
                    >
                        {loading
                            ? "Menyimpan..."
                            : isEdit
                              ? "Simpan Perubahan"
                              : "Simpan Mapel"}
                    </button>
                </div>
            </form>
        </div>
    );
}
