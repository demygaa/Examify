"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wrench } from "lucide-react";

export default function MaintenancePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);

        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } finally {
            router.replace("/");
            router.refresh();
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F0F1FD] px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-300 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Wrench size={30} />
                </div>

                <h1 className="mt-5 text-xl font-bold text-slate-900">
                    Sistem Sedang Dalam Pemeliharaan
                </h1>

                <p className="mt-2 text-sm text-slate-600">
                    Kami sedang melakukan pemeliharaan. Silakan coba beberapa
                    saat lagi. Hanya administrator yang dapat mengakses sistem
                    untuk sementara waktu.
                </p>

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="mt-6 w-full rounded-md bg-blue-700 py-2.5 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60"
                >
                    {loading ? "Memproses..." : "Keluar"}
                </button>
            </div>
        </div>
    );
}
