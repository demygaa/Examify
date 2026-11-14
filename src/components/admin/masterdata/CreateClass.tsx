"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ClassData } from "@/src/components/admin/masterdata/TableClass";

type Guru = {
    id: string;
    nama: string;
    nip: string | null;
    waliKelas: { id: string; kelasId: string; kodeKelas: string } | null;
};

type CreateClassProps = {
    onClose: () => void;
    onCreated?: () => void;
    initial?: ClassData;
};

export default function CreateClass(
    { onClose, onCreated, initial }: CreateClassProps
) {
    const [successMessage, setSuccessMessage] = useState("");
    const [failMessage, setFailMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [guruList, setGuruList] = useState<Guru[]>([]);
    const [waliKelasId, setWaliKelasId] = useState(
        initial?.waliKelasId ?? ""
    );

    const isEdit = Boolean(initial);

    const inputClass =
        "px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400";

    useEffect(() => {
        async function getGuru() {
            try {
                const response = await fetch("/api/admin/guru");
                const result = await response.json();

                if (result.success) {
                    setGuruList(result.data);
                }
            } catch (error) {
                console.error("Gagal mengambil data guru:", error);
            }
        }

        getGuru();
    }, []);

    const guruOptions = guruList.filter((guru) => {
        if (!guru.waliKelas) return true;
        if (initial?.id && guru.waliKelas.kelasId === initial.id) return true;

        return guru.id === waliKelasId;
    });

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setFailMessage("");

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            kelas: formData.get("kelas"),
            kode_kelas: String(formData.get("kode_kelas")).toUpperCase(),
            jurusan: String(formData.get("jurusan")).toUpperCase(),
            kodejur: String(formData.get("kodejur")).toUpperCase(),
            waliKelasId: waliKelasId || null,
        };

        try {
            const response = await fetch(
                isEdit
                    ? `/api/admin/kelas/${initial?.id}`
                    : "/api/admin/kelas",
                {
                    method: isEdit ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Gagal menyimpan data");
            }

            setSuccessMessage(
                isEdit
                    ? "Kelas berhasil diperbarui"
                    : "Kelas berhasil ditambahkan"
            );
            onCreated?.();

            if (isEdit) {
                setTimeout(() => {
                    onClose();
                }, 800);

                return;
            }

            form.reset();
            setWaliKelasId("");

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
                        {isEdit ? "Edit Kelas" : "Tambahkan Kelas"}
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
                    <label className="font-semibold">Kelas</label>

                    <select
                        name="kelas"
                        required
                        defaultValue={initial?.tingkat ?? "X"}
                        className={inputClass}
                    >
                        <option value="X">X</option>
                        <option value="XI">XI</option>
                        <option value="XII">XII</option>
                    </select>
                </div>

                <div className="flex gap-2 flex-col">
                    <label className="font-semibold">Kode Kelas</label>

                    <input
                        type="text"
                        name="kode_kelas"
                        defaultValue={initial?.kodeKelas ?? ""}
                        placeholder="KODE WAJIB KAPITAL"
                        className={inputClass}
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <label className="font-semibold">Jurusan</label>

                    <input
                        type="text"
                        name="jurusan"
                        defaultValue={initial?.jurusan ?? ""}
                        placeholder="Contoh Rekayasa Perangkat Lunak"
                        className={inputClass}
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <label className="font-semibold">Kode Jurusan</label>

                    <input
                        type="text"
                        name="kodejur"
                        defaultValue={initial?.kodeJurusan ?? ""}
                        placeholder="Contoh RPL"
                        className={inputClass}
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <label className="font-semibold">Wali Kelas</label>

                    <select
                        name="waliKelasId"
                        value={waliKelasId}
                        onChange={(e) => setWaliKelasId(e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Belum ditentukan</option>
                        {guruOptions.map((guru) => (
                            <option key={guru.id} value={guru.id}>
                                {guru.nama}
                                {guru.nip ? ` - ${guru.nip}` : ""}
                            </option>
                        ))}
                    </select>
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
                              : "Simpan Kelas"}
                    </button>
                </div>
            </form>
        </div>
    )
}
