"use client";

import { useState } from "react";
import {
    ChevronDown,
    Info,
    Plus,
    X,
} from "lucide-react";

export default function CustomizeExam() {
    const [mapelOpen, setMapelOpen] = useState(false);
    const [tahunOpen, setTahunOpen] = useState(false);
    const [semesterOpen, setSemesterOpen] = useState(false);

    const [mapel, setMapel] = useState("Informatika - Rekayasa Perangkat Lunak");
    const [tahun, setTahun] = useState("2023/2024");
    const [semester, setSemester] = useState("Ganjil");

    const [kelas, setKelas] = useState([
        "X RPL 1",
        "X RPL 2",
    ]);

    const [durasi, setDurasi] = useState("60");

    const mapelOptions = [
        "Informatika - Rekayasa Perangkat Lunak",
        "Matematika",
        "Bahasa Indonesia",
        "Bahasa Inggris",
    ];

    const tahunOptions = [
        "2023/2024",
        "2024/2025",
        "2025/2026",
        "2026/2027",
    ];

    const semesterOptions = [
        "Ganjil",
        "Genap",
    ];

    const kelasOptions = [
        "X RPL 1",
        "X RPL 2",
        "X RPL 3",
        "XI RPL 1",
        "XI RPL 2",
    ];

    const tambahKelas = (kelasBaru: string) => {
        if (!kelas.includes(kelasBaru)) {
            setKelas([...kelas, kelasBaru]);
        }
    };

    const hapusKelas = (kelasHapus: string) => {
        setKelas(kelas.filter((item) => item !== kelasHapus));
    };

    return (
        <div className="w-full rounded-2xl border border-slate-300 bg-white p-7 shadow-sm">

            {/* Header */}
            <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                    <Info
                        size={22}
                        className="text-blue-600"
                    />
                </div>

                <h2 className="text-[17px] font-semibold text-slate-900">
                    Sesuaikan Soal
                </h2>
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">

                {/* Mata Pelajaran */}
                <div className="relative">
                    <label className="mb-3 block text-[15px] font-semibold text-slate-800">
                        Mata Pelajaran
                    </label>

                    <button
                        type="button"
                        onClick={() => setMapelOpen(!mapelOpen)}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-[#F8F8FF] px-4 py-3 text-left text-[14px] text-slate-800"
                    >
                        <span>{mapel}</span>

                        <ChevronDown
                            size={17}
                            className={`transition-transform ${
                                mapelOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {mapelOpen && (
                        <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                            {mapelOptions.map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() => {
                                        setMapel(item);
                                        setMapelOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Kelas */}
                <div>
                    <label className="mb-3 block text-[15px] font-semibold text-slate-800">
                        Kelas
                    </label>

                    <div className="flex min-h-[49px] flex-wrap items-center gap-2 rounded-xl border border-slate-300 bg-[#F8F8FF] px-2 py-2">

                        {kelas.map((item) => (
                            <span
                                key={item}
                                className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-[12px] font-medium text-white"
                            >
                                {item}

                                <button
                                    type="button"
                                    onClick={() => hapusKelas(item)}
                                >
                                    <X size={13} />
                                </button>
                            </span>
                        ))}

                        {/* Tambah */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    const nextClass = kelasOptions.find(
                                        (item) => !kelas.includes(item)
                                    );

                                    if (nextClass) {
                                        tambahKelas(nextClass);
                                    }
                                }}
                                className="flex items-center gap-1 rounded-full border border-blue-300 px-3 py-1.5 text-[12px] font-medium text-blue-600 hover:bg-blue-50"
                            >
                                <Plus size={14} />
                                Tambah
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tahun Ajaran */}
                <div className="relative">
                    <label className="mb-3 block text-[15px] font-semibold text-slate-800">
                        Tahun Ajaran
                    </label>

                    <button
                        type="button"
                        onClick={() => setTahunOpen(!tahunOpen)}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-[#F8F8FF] px-4 py-3 text-[14px] text-slate-800"
                    >
                        {tahun}

                        <ChevronDown
                            size={17}
                            className={`transition-transform ${
                                tahunOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {tahunOpen && (
                        <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                            {tahunOptions.map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() => {
                                        setTahun(item);
                                        setTahunOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>


                <div className="relative">
                    <label className="mb-3 block text-[15px] font-semibold text-slate-800">
                        Semester
                    </label>

                    <button
                        type="button"
                        onClick={() => setSemesterOpen(!semesterOpen)}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-[#F8F8FF] px-4 py-3 text-[14px] text-slate-800"
                    >
                        {semester}

                        <ChevronDown
                            size={17}
                            className={`transition-transform ${
                                semesterOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {semesterOpen && (
                        <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                            {semesterOptions.map((item) => (
                                <button
                                    type="button"
                                    key={item}
                                    onClick={() => {
                                        setSemester(item);
                                        setSemesterOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-sm hover:bg-slate-100"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            
                <div>
                    <label className="mb-3 block text-[15px] font-semibold text-slate-800">
                        Bab / Materi Pokok
                    </label>

                    <input
                        type="text"
                        placeholder="Contoh: Algoritma Pemrograman Dasar"
                        className="w-full rounded-xl border border-slate-300 bg-[#F8F8FF] px-4 py-3 text-[14px] text-slate-800 outline-none placeholder:text-slate-500 focus:border-blue-500"
                    />
                </div>

                
                <div>
                    <label className="mb-3 block text-[15px] font-semibold text-slate-800">
                        Durasi Ujian
                    </label>

                    <div className="flex items-center rounded-xl border border-slate-300 bg-[#F8F8FF]">
                        <input
                            type="number"
                            value={durasi}
                            onChange={(e) => setDurasi(e.target.value)}
                            className="w-full bg-transparent px-4 py-3 text-[14px] text-slate-800 outline-none"
                        />

                        <span className="px-4 text-[13px] text-slate-500">
                            Menit
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}