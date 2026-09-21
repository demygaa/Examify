export default function SchoolDescription() {
    return (
        <div className="rounded-lg border border-slate-300 p-4 w-full bg-white shadow-sm">
            <h2 className="text-sm font-semibold">
                Deskripsi Sekolah
            </h2>

            <p className="mt-2 text-xs text-slate-600">
                Provide a brief overview of the institution's history,
                mission, or key specializations.
            </p>

            <textarea
                defaultValue="SMK Negeri 4 Malang is a leading vocational high school specializing in digital technology and creative industries. Established with a commitment to excellence, it provides top-tier education in software engineering, animation, and multimedia."
                rows={4}
                className="mt-3 w-full resize-none rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
            />
        </div>
    );
}