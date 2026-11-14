"use client";

import { useSchoolForm } from "./SchoolFormProvider";

export default function SchoolFormActions() {
    const { updateSchool, reset, saving, error } = useSchoolForm();

    return (
        <div className="flex justify-end gap-2">
            {error && (
                <p className="text-xs text-red-600 mt-2">
                    {error}
                </p>
            )}

            <button
                type="button"
                disabled={saving}
                onClick={() => {
                    void reset();
                }}
                className="rounded-md border border-slate-300 px-5 py-2 text-xs disabled:opacity-50"
            >
                Cancel
            </button>

            <button
                type="button"
                disabled={saving}
                onClick={() => {
                    void updateSchool();
                }}
                className="rounded-md bg-blue-600 px-5 py-2 text-xs text-white disabled:opacity-60"
            >
                {saving ? "Menyimpan..." : "Save Changes"}
            </button>
        </div>
    );
}
