"use client";

import { useSchoolForm } from "./SchoolFormProvider";

export default function SchoolDescription() {
    const { school, setField } = useSchoolForm();

    return (
        <div className="rounded-lg border border-slate-300 p-4 w-full bg-white shadow-sm">
            <h2 className="text-sm font-semibold">
                Deskripsi Sekolah
            </h2>

            <p className="mt-2 text-xs text-slate-600">
                Provide a brief overview of the institution&apos;s history,
                mission, or key specializations.
            </p>

            <textarea
                value={school?.description ?? ""}
                onChange={(e) => setField("description", e.target.value)}
                rows={4}
                className="mt-3 w-full resize-none rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
            />
        </div>
    );
}
