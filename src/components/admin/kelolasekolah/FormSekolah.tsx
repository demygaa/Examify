"use client";

import { useSchoolForm, type SchoolData } from "./SchoolFormProvider";

export default function SchoolContactForm() {
    const { school, setField, schoolLevel } = useSchoolForm();

    const field = (name: keyof SchoolData) => school?.[name] ?? "";

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
                        value={field("name")}
                        onChange={(e) =>
                            setField("name", e.target.value)
                        }
                        required
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
                        value={field("npsn")}
                        onChange={(e) => setField("npsn", e.target.value)}
                        required
                        maxLength={8}
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
                        value={field("email")}
                        onChange={(e) => setField("email", e.target.value)}
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
                        value={field("phone")}
                        onChange={(e) => setField("phone", e.target.value)}
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
                        value={field("website")}
                        onChange={(e) => setField("website", e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* Address */}
                <div className="col-span-2">
                    <label className="mb-1 block text-xs">
                        Alamat
                    </label>

                    <textarea
                        value={field("address")}
                        onChange={(e) =>
                            setField("address", e.target.value)
                        }
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
                        value={field("city")}
                        onChange={(e) => setField("city", e.target.value)}
                        required
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                {/* Province */}
                <div>
                    <label className="mb-1 block text-xs">
                        Provinsi
                    </label>

                    <select
                        value={field("province")}
                        onChange={(e) =>
                            setField("province", e.target.value)
                        }
                        required
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    >
                        <option>Jawa Timur</option>
                        <option>Jawa Tengah</option>
                        <option>Jawa Barat</option>
                        <option>DKI Jakarta</option>
                        <option>Banten</option>
                        <option>Sumatera Utara</option>
                        <option>Sumatera Barat</option>
                        <option>Sumatera Selatan</option>
                        <option>Bali</option>
                    </select>
                </div>

                {/* Postal Code */}
                <div>
                    <label className="mb-1 block text-xs">
                        Kode Pos
                    </label>

                    <input
                        type="text"
                        value={field("postalCode")}
                        onChange={(e) =>
                            setField("postalCode", e.target.value)
                        }
                        maxLength={5}
                        className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-xs outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs">
                        Tingkat Sekolah
                    </label>

                    <input
                        type="text"
                        value={schoolLevel}
                        readOnly
                        className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
