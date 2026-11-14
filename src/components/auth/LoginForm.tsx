"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, UserRound, GraduationCap, ShieldCheck, Loader2 } from "lucide-react";

type LoginRole = "siswa" | "guru";

const roleMeta: Record<LoginRole, { label: string; identifierLabel: string; identifierPlaceholder: string }> = {
    siswa: {
        label: "Siswa",
        identifierLabel: "Nomor Induk Siswa (NIS)",
        identifierPlaceholder: "Masukkan NIS Anda",
    },
    guru: {
        label: "Guru",
        identifierLabel: "Nomor Induk Pegawai (NIP)",
        identifierPlaceholder: "Masukkan NIP Anda",
    },
};

export default function LoginForm() {
    const router = useRouter();
    const [role, setRole] = useState<LoginRole>("siswa");
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const activeRole = roleMeta[role];

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
                    role: role.toUpperCase(),
                    identifier: identifier.trim(),
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

    const roleButtons: { key: LoginRole; icon: React.ReactNode }[] = [
        { key: "siswa", icon: <GraduationCap size={18} /> },
        { key: "guru", icon: <UserRound size={18} /> },
    ];

    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

           
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Masuk ke Akun Anda
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Silakan pilih peran dan masukkan kredensial Anda.
                </p>
            </div>

       
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Masuk sebagai
                </label>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">

                    {roleButtons.map(({ key, icon }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                setRole(key);
                                setError("");
                            }}
                            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition ${
                                role === key
                                    ? "bg-white text-blue-700 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            {icon}
                            {roleMeta[key].label}
                        </button>
                    ))}

                </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>

              
                <div>
                    <label
                        htmlFor="identifier"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        {activeRole.identifierLabel}
                    </label>

                    <input
                        id="identifier"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={activeRole.identifierPlaceholder}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

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

            
                <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300"
                        />

                        Ingat saya
                    </label>
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

            
                <button
                    type="submit"
                    disabled={loading || !identifier || !password}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading && <Loader2 size={18} className="animate-spin" />}
                    {loading ? "Memproses..." : "Masuk"}
                </button>

              
                

            </form>
        </div>
    );
}