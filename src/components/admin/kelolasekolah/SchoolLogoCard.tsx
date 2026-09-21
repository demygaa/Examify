export default function SchoolLogoCard() {
    return (
        <div className="w-[400px] rounded-lg border border-slate-300 p-4 bg-white shadow-sm p-[27px] h-fit">
            {/* Logo */}
            <div className="flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-slate-500">
                    <img
                        src="/logo.png"
                        alt="School Logo"
                        className="h-20 w-20 object-contain"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-center gap-2">
                <button
                    type="button"
                    className="rounded-md bg-blue-600 px-4 py-1.5 text-xs text-white"
                >
                    Ganti Logo
                </button>

                <button
                    type="button"
                    className="rounded-md border border-slate-300 px-4 py-1.5 text-xs"
                >
                    Hapus
                </button>
            </div>

            <div className="my-4 border-t border-slate-300" />

            {/* School Information */}
            <div className="space-y-4 text-xs">
                <div>
                    <p className="mb-1 font-semibold text-black" >
                        NAMA SEKOLAH
                    </p>
                    <p>SMK Negeri 4 Malang</p>
                </div>

                <div>
                    <p className="mb-1 font-semibold text-black" >
                        NPSN
                    </p>
                    <p>20533678</p>
                </div>

                <div>
                    <p className="mb-1 font-semibold text-black" >
                        TINGKAT SEKIOLAH
                    </p>

                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-[10px] text-indigo-700">
                        Sekolah Kejuruan Atas
                    </span>
                </div>
            </div>
        </div>
    );
}