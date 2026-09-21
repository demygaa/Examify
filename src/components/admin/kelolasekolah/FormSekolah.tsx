export default function SchoolContactForm() {
    return (
        <div className="rounded-lg border border-slate-300 p-[27px] w-full bg-white shadow-sm">
            <h2 className="text-sm font-semibold">
                Kontak & Detail
            </h2>

            <div className="my-3 border-t border-slate-300" />

            <div className="grid grid-cols-2 gap-4">
                {/* School Name */}
                <div>
                    <label className="mb-1 block text-xs">
                    Nama Sekolah
                    </label>

                    <input
                        type="text"
                        defaultValue="SMK Negeri 4 Malang"
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* NPSN */}
                <div>
                    <label className="mb-1 block text-xs">
                        NPSN
                    </label>

                    <input
                        type="text"
                        defaultValue="20533678"
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="mb-1 block text-xs">
                        Email Sekolah
                    </label>

                    <input
                        type="email"
                        defaultValue="info@smkn4malang.sch.id"
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="mb-1 block text-xs">
                        Nomer Telepon Sekolah
                    </label>

                    <input
                        type="text"
                        defaultValue="+62 341 411082"
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* Website */}
                <div className="col-span-2">
                    <label className="mb-1 block text-xs">
                        Website
                    </label>

                    <input
                        type="text"
                        defaultValue="https://smkn4malang.sch.id"
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* Address */}
                <div className="col-span-2">
                    <label className="mb-1 block text-xs">
                        Alamat
                    </label>

                    <textarea
                        defaultValue="Jl. Tanimbar No.22, Kasin, Kec. Klojen"
                        rows={2}
                        className="w-full resize-none rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* City */}
                <div>
                    <label className="mb-1 block text-xs">
                        Kota
                    </label>

                    <input
                        type="text"
                        defaultValue="Malang"
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* Province */}
                <div>
                    <label className="mb-1 block text-xs">
                        Provinsi
                    </label>

                    <select
                        defaultValue="Jawa Timur"
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    >
                        <option>Jawa Timur</option>
                        <option>Jawa Tengah</option>
                        <option>Jawa Barat</option>
                    </select>
                </div>

                {/* Postal Code */}
                <div>
                    <label className="mb-1 block text-xs">
                        Kode Pos
                    </label>

                    <input
                        type="text"
                        defaultValue="65117"
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}