"use client";

import { useState } from "react";
import {
    CirclePlus,
    Check,
    ListChecks,
    FileText,
    X,
} from "lucide-react";

type QuestionType =
    | "pilihan-ganda"
    | "pilihan-ganda-kompleks"
    | "benar-salah"
    | "esai";

export default function AddQuestion() {

    const [open, setOpen] = useState(false);

    const [selectedType, setSelectedType] =
        useState<QuestionType>("pilihan-ganda");

    const questionTypes = [
        {
            id: "pilihan-ganda" as QuestionType,
            title: "Pilihan Ganda",
            description: "Satu jawaban benar",
            icon: ListChecks,
        },
        {
            id: "pilihan-ganda-kompleks" as QuestionType,
            title: "Pilihan Ganda Kompleks",
            description: "Memiliki lebih dari satu jawaban benar",
            icon: ListChecks,
        },
        {
            id: "benar-salah" as QuestionType,
            title: "Benar / Salah",
            description: "Pilih jawaban benar atau salah",
            icon: Check,
        },
        {
            id: "esai" as QuestionType,
            title: "Esai",
            description: "Jawaban berupa teks",
            icon: FileText,
        },
    ];

    const handleContinue = () => {
        console.log("Tipe soal:", selectedType);

        setOpen(false);

        // Nanti di sini bisa dipakai
        // untuk membuka form soal sesuai tipe.
    };

    return (
        <>
            {/* Tombol Tambah */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex min-h-[100px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white text-sm text-slate-600 hover:bg-slate-50"
            >
                <CirclePlus size={20} />

                <span>
                    Tambah Soal Baru
                </span>
            </button>

            {/* Popup */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

                    <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-xl">

                        {/* Header */}
                        <div className="flex items-start justify-between">

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Tambah Soal
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Pilih tipe soal yang ingin dibuat
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-lg p-2 hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* Pilihan soal */}
                        <div className="mt-5 flex flex-col gap-3">

                            {questionTypes.map((type) => {

                                const Icon = type.icon;

                                const selected =
                                    selectedType === type.id;

                                return (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedType(type.id)
                                        }
                                        className={`flex items-center gap-3 rounded-xl border p-4 text-left ${
                                            selected
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-slate-200"
                                        }`}
                                    >

                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                                            <Icon size={20} />
                                        </div>

                                        <div className="flex-1">

                                            <p className="text-sm font-semibold">
                                                {type.title}
                                            </p>

                                            <p className="text-xs text-slate-500">
                                                {type.description}
                                            </p>

                                        </div>

                                        {/* Radio */}
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                                selected
                                                    ? "border-blue-600"
                                                    : "border-slate-300"
                                            }`}
                                        >
                                            {selected && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                            )}
                                        </div>

                                    </button>
                                );
                            })}

                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex justify-end gap-2">

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                onClick={handleContinue}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                            >
                                Lanjutkan
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}