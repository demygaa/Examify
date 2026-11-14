"use client";

import { useRef, useState } from "react";
import NextImage from "next/image";
import { useSchoolForm } from "./SchoolFormProvider";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_LOGO_SIZE = 512;
const MAX_DATA_URL_LENGTH = 3_000_000;

function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("Gagal membaca file logo"));
        reader.readAsDataURL(file);
    });
}

async function imageFileToDataUrl(file: File): Promise<string> {
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        throw new Error("Format logo harus PNG, JPG, atau WebP");
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error("Ukuran file logo maksimal 5MB");
    }

    const source = await readFileAsDataUrl(file);

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("File gambar tidak valid"));
        img.src = source;
    });

    const scale = Math.min(
        1,
        MAX_LOGO_SIZE / Math.max(image.width, image.height)
    );
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
        throw new Error("Gagal memproses logo");
    }

    context.drawImage(image, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/png");

    if (dataUrl.length > MAX_DATA_URL_LENGTH) {
        throw new Error("Ukuran logo terlalu besar setelah diproses");
    }

    return dataUrl;
}

export default function SchoolLogoCard() {
    const { school, schoolLevel, setField, saving } = useSchoolForm();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [logoError, setLogoError] = useState("");
    const [processing, setProcessing] = useState(false);

    async function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];
        event.target.value = "";

        if (!file) return;

        setLogoError("");
        setProcessing(true);

        try {
            const dataUrl = await imageFileToDataUrl(file);
            setField("logoUrl", dataUrl);
        } catch (error) {
            setLogoError(
                error instanceof Error ? error.message : "Gagal memproses logo"
            );
        } finally {
            setProcessing(false);
        }
    }

    return (
        <div className="w-[400px] rounded-lg border border-slate-300 p-4 bg-white shadow-sm p-[27px] h-fit">
            {/* Logo */}
            <div className="flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-slate-500">
                    <NextImage
                        src={school?.logoUrl ?? "/logo.png"}
                        alt="Logo sekolah"
                        width={80}
                        height={80}
                        unoptimized
                        className="h-20 w-20 object-contain"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-center gap-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                />

                <button
                    type="button"
                    disabled={saving || processing}
                    className="rounded-md bg-blue-600 px-4 py-1.5 text-xs text-white disabled:opacity-60"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {processing ? "Memproses..." : "Ganti Logo"}
                </button>

                <button
                    type="button"
                    disabled={saving || processing || !school?.logoUrl}
                    onClick={() => {
                        setField("logoUrl", null);
                        setLogoError("");
                    }}
                    className="rounded-md border border-slate-300 px-4 py-1.5 text-xs disabled:opacity-50"
                >
                    Hapus
                </button>
            </div>

            {logoError && (
                <p className="mt-2 text-center text-xs text-red-600">
                    {logoError}
                </p>
            )}

            <p className="mt-2 text-center text-[10px] text-slate-500">
                Perubahan logo disimpan saat klik Save Changes.
            </p>

            <div className="my-4 border-t border-slate-300" />

            {/* School Information */}
            <div className="space-y-4 text-xs">
                <div>
                    <p className="mb-1 font-semibold text-black">
                        NAMA SEKOLAH
                    </p>
                    <p>{school?.name ?? "-"}</p>
                </div>

                <div>
                    <p className="mb-1 font-semibold text-black">
                        NPSN
                    </p>
                    <p>{school?.npsn ?? "-"}</p>
                </div>

                <div>
                    <p className="mb-1 font-semibold text-black">
                        TINGKAT SEKOLAH
                    </p>

                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-[10px] text-indigo-700">
                        {schoolLevel}
                    </span>
                </div>
            </div>
        </div>
    );
}
