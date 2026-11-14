"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export type EditingAccount = {
    id: string;
    nama: string;
    role: "ADMIN" | "GURU" | "SISWA";
    nip?: string;
    nis?: string;
    kelasId?: string;
    username?: string;
    mapelIds?: string[];
};

type AccountFormProps = {
    onClose: () => void;
    onSuccess?: () => void; // opsional, misal untuk refresh tabel akun
    initial?: EditingAccount;
    embedded?: boolean;
};

type Kelas = {
    id: string;
    kelas: string; // kode kelas, contoh X-RPL-1
    jurusan: string; // nama jurusan (teks)
};

type Mapel = {
    id: string;
    kode: string;
    nama: string;
    isActive: boolean;
};

const inputClass =
    "px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400";

export default function AccountForm({
    onClose,
    onSuccess,
    initial,
    embedded = false,
}: AccountFormProps) {
    const isEdit = Boolean(initial);

    const [password, setPassword] = useState("");
    const [role, setRole] = useState(initial?.role ?? "GURU");
    const [loading, setLoading] = useState(false);

    const [kelasData, setKelasData] = useState<Kelas[]>([]);
    const [selectedJurusan, setSelectedJurusan] = useState("");

    const [mapelList, setMapelList] = useState<Mapel[]>([]);
    const [selectedMapelIds, setSelectedMapelIds] = useState<string[]>(
        initial?.mapelIds ?? []
    );

    const [successMessage, setSuccessMessage] = useState("");
    const [failMessage, setFailMessage] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const [kelasResponse, mapelResponse] = await Promise.all([
                    fetch("/api/admin/kelas"),
                    fetch("/api/admin/mapel"),
                ]);

                const kelasResult = await kelasResponse.json();
                const mapelResult = await mapelResponse.json();

                if (kelasResult.success) {
                    setKelasData(kelasResult.data);

                    if (initial?.kelasId) {
                        const kelas = (kelasResult.data as Kelas[]).find(
                            (item) => item.id === initial.kelasId
                        );

                        if (kelas) {
                            setSelectedJurusan(kelas.jurusan);
                        }
                    }
                }

                if (mapelResult.success) {
                    setMapelList(mapelResult.data);
                }
            } catch (error) {
                console.error("Gagal mengambil data form:", error);
            }
        }

        getData();
    }, [initial?.kelasId]);

    // daftar jurusan unik untuk dropdown
    const jurusanData = [...new Set(kelasData.map((item) => item.jurusan))];

    // kelas yang tampil mengikuti jurusan yang dipilih
    const filteredKelas = kelasData.filter(
        (item) => item.jurusan === selectedJurusan
    );

    function toggleMapel(mapelId: string) {
        setSelectedMapelIds((prev) =>
            prev.includes(mapelId)
                ? prev.filter((id) => id !== mapelId)
                : [...prev, mapelId]
        );
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget; // disimpan sebelum await
        const formData = new FormData(form);
        const text = (key: string) => String(formData.get(key) ?? "").trim();

        if (role === "GURU" && selectedMapelIds.length === 0) {
            setFailMessage("Pilih minimal satu mata pelajaran");
            return;
        }

        // field yang dikirim sesuai yang dibaca API
        const data = {
            nama: text("nama"),
            role,
            password,

            // GURU
            nip: text("nip"),
            mapelIds: selectedMapelIds,

            // SISWA
            nis: text("nis"),
            kelas: text("kelas"), // id kelas

            // ADMIN
            username: text("username"),
        };

        setLoading(true);
        setSuccessMessage("");
        setFailMessage("");

        try {
            const response = await fetch(
                isEdit
                    ? `/api/admin/accounts/${initial?.id}`
                    : "/api/admin/accounts",
                {
                    method: isEdit ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                // tampilkan pesan dari server, misal "NIS/NIP/Username sudah terdaftar"
                setFailMessage(result.message ?? "Akun gagal disimpan");
                return;
            }

            setSuccessMessage(
                isEdit
                    ? "Akun berhasil diperbarui"
                    : "Akun berhasil ditambahkan"
            );
            onSuccess?.();

            if (isEdit) {
                setTimeout(() => {
                    onClose();
                }, 800);

                return;
            }

            form.reset();
            setPassword("");
            setSelectedJurusan("");
            setSelectedMapelIds([]);

            setTimeout(() => setSuccessMessage(""), 1500);
        } catch {
            setFailMessage("Terjadi kesalahan jaringan");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className={
                embedded
                    ? "w-full"
                    : "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            }
        >
            <form
                onSubmit={handleSubmit}
                className={
                    embedded
                        ? "bg-white w-full flex flex-col gap-[20px]"
                        : "bg-white shadow-sm rounded-xl p-[27px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto h-fit flex flex-col gap-[20px] border border-slate-300"
                }
            >
                <div className="flex justify-between items-center">
                    <p className="text-black font-semibold">
                        {isEdit ? "Edit Akun Pengguna" : "Tambahkan Akun Pengguna"}
                    </p>

                    {!embedded && (
                        <button type="button" onClick={onClose}>
                            <X strokeWidth={3} color="blue" />
                        </button>
                    )}
                </div>

                <div className="flex gap-2 flex-col">
                    <label className="font-semibold">Nama Pengguna</label>

                    <input
                        type="text"
                        name="nama"
                        required
                        defaultValue={initial?.nama ?? ""}
                        placeholder="Masukan Nama Pengguna"
                        className={inputClass}
                    />
                </div>

                <div className="flex gap-3 items-center">
                    <label className="font-semibold">Role Pengguna</label>

                    <select
                        name="role"
                        value={role}
                        disabled={isEdit}
                        onChange={(e) => {
                            setRole(
                                e.target.value as "ADMIN" | "GURU" | "SISWA"
                            );
                            setSelectedJurusan("");
                        }}
                    >
                        <option value="GURU">Guru</option>
                        <option value="SISWA">Siswa</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                {/* ===== GURU ===== */}
                {role === "GURU" && (
                    <>
                        <div className="flex gap-2 flex-col">
                            <label className="font-semibold">NIP</label>

                            <input
                                type="text"
                                name="nip"
                                required
                                defaultValue={initial?.nip ?? ""}
                                placeholder="Masukan NIP Guru"
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">
                                Matapelajaran (bisa lebih dari satu)
                            </label>

                            <div className="max-h-[180px] overflow-y-auto rounded-xl border border-slate-300 p-2 flex flex-col gap-1">
                                {mapelList.length === 0 ? (
                                    <p className="text-sm text-slate-500">
                                        Belum ada data mapel
                                    </p>
                                ) : (
                                    mapelList.map((mapel) => (
                                        <label
                                            key={mapel.id}
                                            className="flex items-center gap-2 text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                value={mapel.id}
                                                checked={selectedMapelIds.includes(
                                                    mapel.id
                                                )}
                                                onChange={() =>
                                                    toggleMapel(mapel.id)
                                                }
                                            />
                                            {mapel.nama}
                                            {!mapel.isActive && (
                                                <span className="text-xs text-slate-400">
                                                    (nonaktif)
                                                </span>
                                            )}
                                        </label>
                                    ))
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* ===== SISWA ===== */}
                {role === "SISWA" && (
                    <>
                        <div className="flex gap-2 flex-col">
                            <label className="font-semibold">NIS</label>

                            <input
                                type="text"
                                name="nis"
                                required
                                readOnly={isEdit}
                                defaultValue={initial?.nis ?? ""}
                                placeholder="Masukan NIS Siswa"
                                className={inputClass}
                            />
                        </div>

                        <div className="flex gap-3 items-center">
                            <label className="font-semibold">Jurusan</label>

                            {/* hanya untuk memfilter kelas, tidak dikirim ke API */}
                            <select
                                value={selectedJurusan}
                                onChange={(e) =>
                                    setSelectedJurusan(e.target.value)
                                }
                                required
                                className={inputClass}
                            >
                                <option value="">Pilih Jurusan</option>

                                {jurusanData.map((jurusan) => (
                                    <option key={jurusan} value={jurusan}>
                                        {jurusan}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3 items-center">
                            <label className="font-semibold">Kelas</label>

                            {/* key mereset pilihan kelas setiap jurusan berganti */}
                            <select
                                key={selectedJurusan}
                                name="kelas"
                                required
                                defaultValue={initial?.kelasId ?? ""}
                                disabled={!selectedJurusan}
                                className={inputClass}
                            >
                                <option value="">Pilih Kelas</option>

                                {filteredKelas.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.kelas}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                {/* ===== ADMIN ===== */}
                {role === "ADMIN" && (
                    <div className="flex gap-2 flex-col">
                        <label className="font-semibold">Username</label>

                        <input
                            type="text"
                            name="username"
                            required
                            readOnly={isEdit}
                            defaultValue={initial?.username ?? ""}
                            placeholder="Masukan Username Admin"
                            className={inputClass}
                        />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                        Password{isEdit ? " (kosongkan jika tidak diubah)" : ""}
                    </label>

                    <input
                        type="password"
                        name="password"
                        required={!isEdit}
                        autoComplete="new-password"
                        placeholder={
                            isEdit
                                ? "Kosongkan jika tidak diubah"
                                : "Masukan Password"
                        }
                        className={inputClass}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {successMessage && (
                    <p className="text-green-700 font-medium">
                        {successMessage}
                    </p>
                )}

                {failMessage && (
                    <p className="text-red-700 font-medium">{failMessage}</p>
                )}

                <div className={embedded ? "flex gap-3" : ""}>
                    {embedded && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg border border-slate-300 flex-1"
                        >
                            Batal
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 ${
                            embedded ? "flex-1" : ""
                        }`}
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}
