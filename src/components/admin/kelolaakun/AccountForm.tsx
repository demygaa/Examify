"use client"

import { useState, useEffect } from "react";
import { X } from "lucide-react";

type AccountFormProps = {
    onClose: () => void;
};

type Kelas = {
    id: string;
    kelas: string;
    jurusan: string;
};

export default function AccountForm({
    onClose
}: AccountFormProps) {

    const [password, setPassword] = useState("");
    const [role, setRole] = useState("GURU");


    const [kelasData, setKelasData] = useState<Kelas[]>([]);


    const [selectedJurusan, setSelectedJurusan] = useState("");


    const [successMessage, setSuccessMessage] = useState("");
    const [failMassage, setFailMassage] = useState("");

    useEffect(() => {
        async function getKelas() {
            try {
                const response = await fetch("/api/admin/kelas");

                const result = await response.json();

                if (result.success) {
                    setKelasData(result.data);
                }
            } catch (error) {
                console.error("Gagal mengambil data kelas:", error);
            }
        }

        getKelas();
    }, []);

    const jurusanData = [
        ...new Set(
            kelasData.map((item) => item.jurusan)
        )
    ];

    const filteredKelas = kelasData.filter(
        (item) => item.jurusan === selectedJurusan
    );

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            nama: formData.get("nama"),
            role: formData.get("role"),
            password: formData.get("password"),


            nip: formData.get("nip"),
            prodi: formData.get("prodi"),


            nis: formData.get("nis"),
            jurusan: formData.get("jurusan"),
            kelas: formData.get("kelas"),


            username: formData.get("username"),
        };

        console.log("DATA YANG DIKIRIM:", data);

        const response = await fetch(
            "/api/admin/accounts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        const result = await response.json();

        console.log("HASIL:", result);

        if (result.success) {
            setSuccessMessage("Akun berhasil ditambahkan");

            setTimeout(() => {setSuccessMessage("")}, 1500);

            return;
        } else if (!result.success) {
            setFailMassage("Akun Gagal Ditambahkan");

            setTimeout(() => {setFailMassage("")}, 1500)
        }


    }

    return (
        <form
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onSubmit={handleSubmit}
        >
            <div className="bg-white shadow-sm rounded-xl p-[27px] w-[600px] h-fit flex flex-col gap-[20px] border border-slate-300">


                <div className="flex justify-between items-center">
                    <p className="text-black font-semibold">
                        Tambahkan Akun Pengguna
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        <X
                            strokeWidth={3}
                            color="blue"
                        />
                    </button>
                </div>

                <div className="flex gap-2 flex-col">
                    <label className="font-semibold">
                        Nama Pengguna
                    </label>

                    <input
                        type="text"
                        placeholder="Masukan Nama Pengguna"
                        name="nama"
                        className="px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400"
                    />
                </div>

                <div className="flex gap-3 items-center">
                    <label className="font-semibold">
                        Role Pengguna
                    </label>

                    <select
                        name="role"
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value);


                            setSelectedJurusan("");
                        }}
                    >
                        <option value="GURU">
                            Guru
                        </option>

                        <option value="SISWA">
                            Siswa
                        </option>

                        <option value="ADMIN">
                            Admin
                        </option>
                    </select>
                </div>


                {role === "GURU" && (
                    <>

                        <div className="flex gap-2 flex-col">
                            <label className="font-semibold">
                                NIP
                            </label>

                            <input
                                type="text"
                                placeholder="Masukan NIP Guru"
                                name="nip"
                                className="px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400"
                            />
                        </div>


                        <div className="flex gap-3 items-center">
                            <label className="font-semibold">
                                Matapelajaran
                            </label>

                            <select name="prodi">
                                <option value="Matematika">
                                    Matematika
                                </option>

                                <option value="Bahasa Indonesia">
                                    Bahasa Indonesia
                                </option>

                                <option value="Ilmu Pengetahuan Alam">
                                    Ilmu Pengetahuan Alam
                                </option>
                            </select>
                        </div>
                    </>
                )}



                {role === "SISWA" && (
                    <>

                        <div className="flex gap-2 flex-col">
                            <label className="font-semibold">
                                NIS
                            </label>

                            <input
                                type="text"
                                name="nis"
                                placeholder="Masukan NIS Siswa"
                                className="px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        <div className="flex gap-3 items-center">
                            <label className="font-semibold">
                                Jurusan
                            </label>

                            <select
                                name="jurusan"
                                value={selectedJurusan}
                                onChange={(e) =>
                                    setSelectedJurusan(
                                        e.target.value
                                    )
                                }
                                className="px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400"
                            >
                                <option value="">
                                    Pilih Jurusan
                                </option>

                                {jurusanData.map((jurusan) => (
                                    <option
                                        key={jurusan}
                                        value={jurusan}
                                    >
                                        {jurusan}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="flex gap-3 items-center">
                            <label className="font-semibold">
                                Kelas
                            </label>

                            <select
                                name="kelas"
                                disabled={!selectedJurusan}
                                className="px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400"
                            >
                                <option value="">
                                    Pilih Kelas
                                </option>

                                {filteredKelas.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.kelas}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}



                {role === "ADMIN" && (
                    <div className="flex gap-2 flex-col">
                        <label className="font-semibold">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Masukan Username Admin"
                            name="username"
                            className="px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                )}


                <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Masukan Password"
                        name="password"
                        className="px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>
                {successMessage && (
                    <p className="text-green-700 font-medium">
                        {successMessage}
                    </p>
                )}

                {failMassage && (
                    <p className="text-red-700 font-medium">
                        {failMassage}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg"

                >
                    Simpan
                </button>

            </div>
        </form>
    );
}