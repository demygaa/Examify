"use client";

import { useCallback, useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { SCHOOL_LEVEL } from "@/src/lib/constants";

export type SchoolData = {
    id: string;
    name: string;
    npsn: string;
    logoUrl: string | null;
    description: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
    city: string;
    province: string;
    postalCode: string | null;
    createdAt: string;
    updatedAt: string;
};

export const EMPTY_SCHOOL: SchoolData = {
    id: "",
    name: "",
    npsn: "",
    logoUrl: null,
    description: null,
    email: null,
    phone: null,
    website: null,
    address: null,
    city: "",
    province: "",
    postalCode: null,
    createdAt: "",
    updatedAt: "",
};

type SchoolFormContextValue = {
    school: SchoolData;
    loading: boolean;
    saving: boolean;
    error: string | null;
    setField: (name: keyof SchoolData, value: string | null) => void;
    updateSchool: () => Promise<void>;
    reset: () => Promise<void>;
    schoolLevel: string;
};

const SchoolFormContext = createContext<SchoolFormContextValue | null>(null);

export default function SchoolFormProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [school, setSchool] = useState<SchoolData>(EMPTY_SCHOOL);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSchool = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/admin/school", { cache: "no-store" });
            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message ?? "Gagal mengambil data sekolah");
            }

            if (json.data) {
                setSchool(json.data);
            } else {
                setSchool(EMPTY_SCHOOL);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
            setSchool(EMPTY_SCHOOL);
        } finally {
            setLoading(false);
        }
    }, []);

    // Muat data saat komponen pertama kali dipasang.
    useEffect(() => {
        let cancelled = false;

        async function init() {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch("/api/admin/school", {
                    cache: "no-store",
                });
                const json = await res.json();

                if (cancelled) return;

                if (!res.ok || !json.success) {
                    setError(json.message ?? "Gagal mengambil data sekolah");
                    setSchool(EMPTY_SCHOOL);
                } else {
                    setSchool(json.data ?? EMPTY_SCHOOL);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Terjadi kesalahan jaringan"
                    );
                    setSchool(EMPTY_SCHOOL);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void init();

        return () => {
            cancelled = true;
        };
    }, []);

    const setField = useCallback(
        (name: keyof SchoolData, value: string | null) => {
            setSchool((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const updateSchool = useCallback(async () => {
        setSaving(true);
        setError(null);

        // Validasi field wajib sebelum kirim.
        if (!school.name.trim()) {
            setError("Nama sekolah wajib diisi");
            setSaving(false);
            return;
        }

        if (!school.npsn.trim()) {
            setError("NPSN wajib diisi");
            setSaving(false);
            return;
        }

        if (!/^\d{8}$/.test(school.npsn.trim())) {
            setError("NPSN harus 8 digit angka");
            setSaving(false);
            return;
        }

        if (!school.city.trim()) {
            setError("Kota wajib diisi");
            setSaving(false);
            return;
        }

        if (!school.province.trim()) {
            setError("Provinsi wajib diisi");
            setSaving(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/school", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(school),
            });
            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message ?? "Gagal menyimpan data sekolah");
            }

            setSchool(json.data ?? school);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan");
        } finally {
            setSaving(false);
        }
    }, [school, router]);

    const reset = useCallback(async () => {
        await fetchSchool();
    }, [fetchSchool]);

    const value: SchoolFormContextValue = {
        school,
        loading,
        saving,
        error,
        setField,
        updateSchool,
        reset,
        schoolLevel: SCHOOL_LEVEL,
    };

    return (
        <SchoolFormContext.Provider value={value}>
            {children}
        </SchoolFormContext.Provider>
    );
}

export function useSchoolForm(): SchoolFormContextValue {
    const ctx = useContext(SchoolFormContext);

    if (!ctx) {
        throw new Error("useSchoolForm harus digunakan di dalam SchoolFormProvider");
    }

    return ctx;
}
