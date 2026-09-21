"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
                body: JSON.stringify({
                    role: "ADMIN",
                    identifier: username.trim(),
                    password,
                }),
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                setError(result.message ?? "Login gagal. Silakan coba lagi.");
                return;
            }

            router.push(result.data.redirectTo);
            router.refresh();
        } catch {
            setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Login Admin
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Masuk sebagai administrator untuk mengelola sistem.
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Username */}
                <div>
                    <label
                        htmlFor="username"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Username Admin
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Masukkan username Anda"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan kata sandi"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm text-black outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading || !username || !password}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading && <Loader2 size={18} className="animate-spin" />}
                    {loading ? "Memproses..." : "Masuk"}
                </button>

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft size={16} />
                    Kembali ke login Siswa / Guru
                </Link>

            </form>
        </div>
    );
}