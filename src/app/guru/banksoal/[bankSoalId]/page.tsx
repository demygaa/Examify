"use client";

import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Copy,
    Edit,
    Eye,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

export default function PreviewSoalPage() {
    const [mode, setMode] = useState<"guru" | "peserta">("guru");
    const [answer, setAnswer] = useState("B");

    return (
        <div className="min-h-screen bg-[#F7F7FC] p-6">

            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-slate-800">
                        Pratinjau Soal
                    </h1>

                    <p className="mt-1 text-xs text-slate-500">
                        Lihat tampilan soal sebelum dipublikasikan ke peserta didik.
                    </p>
                </div>

                {/* MODE */}
                <div className="flex rounded-lg border border-slate-200 bg-white p-1">
                    <button
                        onClick={() => setMode("guru")}
                        className={`rounded-md px-3 py-2 text-xs font-medium ${
                            mode === "guru"
                                ? "bg-blue-600 text-white"
                                : "text-slate-600"
                        }`}
                    >
                        Mode Guru
                    </button>

                    <button
                        onClick={() => setMode("peserta")}
                        className={`rounded-md px-3 py-2 text-xs font-medium ${
                            mode === "peserta"
                                ? "bg-blue-600 text-white"
                                : "text-slate-600"
                        }`}
                    >
                        Mode Peserta
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="mt-5 grid grid-cols-[1fr_280px] gap-5">

                {/* SOAL */}
                <div>
                    <button className="mb-3 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white">
                        + Soal
                    </button>

                    <div className="rounded-xl border border-slate-200 bg-white p-5">

                        {/* TOP */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="rounded bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-600">
                                    SOAL 1
                                </span>

                                <span className="text-xs text-slate-500">
                                    Dari 10 Soal
                                </span>
                            </div>

                            <MoreHorizontal
                                size={16}
                                className="text-slate-400"
                            />
                        </div>

                        {/* QUESTION */}
                        <div className="mt-5">
                            <h2 className="text-sm font-semibold text-slate-800">
                                Analisis Potongan Kode Berikut
                            </h2>

                            <p className="mt-2 text-xs leading-5 text-slate-600">
                                Dalam algoritma pencarian linear, data diproses
                                satu per satu dari elemen pertama hingga elemen
                                terakhir. Analisis pseudocode di bawah ini untuk
                                menentukan elemen mana yang akan ditemukan pertama
                                kali jika target pencarian adalah nilai 42.
                            </p>
                        </div>

                        {/* CODE */}
                        <div className="mt-4 rounded-lg bg-[#292B35] p-4 font-mono text-[10px] leading-5 text-slate-200">
                            <div className="text-slate-400">
                                PROCEDURE LinearSearch(arr: array of integer)
                            </div>

                            <div className="pl-3">
                                for i ← 1 to length(arr) do
                            </div>

                            <div className="pl-6">
                                if arr[i] = 42 then
                            </div>

                            <div className="pl-9">
                                return i
                            </div>

                            <div className="pl-6">
                                end if
                            </div>

                            <div className="pl-3">
                                end for
                            </div>

                            <div className="pl-3">
                                return -1
                            </div>

                            <div>
                                end procedure
                            </div>
                        </div>

                        {/* IMAGE */}
                        <div className="mt-4">
                            <p className="mb-2 text-[10px] font-semibold uppercase text-slate-500">
                                Alur Logika Pencarian Elemen
                            </p>

                            <div className="flex h-40 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                                <span className="text-xs text-slate-400">
                                    Diagram / gambar soal
                                </span>
                            </div>
                        </div>

                        {/* ANSWER */}
                        <div className="mt-4 space-y-2">

                            {[
                                ["A", "Pencarian dimulai dari indeks terakhir ke pertama"],
                                ["B", "Elemen diperiksa secara berurutan mulai dari indeks 0"],
                                ["C", "Data harus diurutkan terlebih dahulu secara ascending"],
                                ["D", "Pencarian menggunakan metode bagi dua (divide and conquer)"],
                            ].map(([key, text]) => (
                                <button
                                    key={key}
                                    onClick={() => setAnswer(key)}
                                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-xs transition ${
                                        answer === key
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-slate-200 bg-white hover:bg-slate-50"
                                    }`}
                                >
                                    <span
                                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                            answer === key
                                                ? "border-blue-600 bg-blue-600"
                                                : "border-slate-300"
                                        }`}
                                    >
                                        {answer === key && (
                                            <Check
                                                size={10}
                                                className="text-white"
                                            />
                                        )}
                                    </span>

                                    <span className="font-medium text-slate-700">
                                        {key}.
                                    </span>

                                    <span className="text-slate-600">
                                        {text}
                                    </span>
                                </button>
                            ))}

                        </div>

                        {/* NAVIGATION */}
                        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">

                            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
                                <ArrowLeft size={14} />
                                Sebelumnya
                            </button>

                            <div className="flex gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                            </div>

                            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white">
                                Selanjutnya
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="space-y-4">

                    {/* DETAIL */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4">

                        <div className="flex items-center gap-2">
                            <Eye size={15} className="text-blue-600" />

                            <h3 className="text-xs font-semibold text-slate-800">
                                Detail Informasi
                            </h3>
                        </div>

                        <div className="mt-4 space-y-4 text-xs">

                            <div>
                                <p className="text-[10px] text-slate-400">
                                    MATA PELAJARAN
                                </p>

                                <p className="mt-1 font-medium text-slate-700">
                                    Informatika
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-slate-400">
                                    INFORMASI
                                </p>

                                <div className="mt-1 flex gap-1">
                                    <span className="rounded bg-slate-100 px-2 py-1">
                                        X RPL 1
                                    </span>

                                    <span className="rounded bg-slate-100 px-2 py-1">
                                        X RPL 2
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-[10px] text-slate-400">
                                        BOBOT
                                    </p>

                                    <p className="mt-1 font-medium">
                                        10%
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] text-slate-400">
                                        TIPE
                                    </p>

                                    <p className="mt-1 font-medium">
                                        Pilihan Ganda
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ACTION */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4">

                        <h3 className="text-xs font-semibold text-slate-800">
                            Aksi Cepat
                        </h3>

                        <div className="mt-3 space-y-2">

                            <button className="flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
                                <Edit size={13} />
                                Edit Soal
                            </button>

                            <button className="flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
                                <Copy size={13} />
                                Duplikat
                            </button>

                            <button className="flex w-full items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs text-red-500">
                                <Trash2 size={13} />
                                Hapus
                            </button>

                            <button className="w-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white">
                                Publikasikan
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}