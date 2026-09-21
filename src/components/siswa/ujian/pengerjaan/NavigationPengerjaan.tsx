
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShowDone from "./ShowDone";

export default function NavigationBottom() {
    const [showDone, setShowDone] = useState(false);
    const router = useRouter();

    const handleDone = () => {
        console.log("Ujian selesai");

        setShowDone(false);

        // pindah ke halaman ujian
        router.push("/siswa/ujian");
    };

    return (
        <>
            <div className="bg-white border-slate-300 border-t px-[15px] grid grid-cols-3 py-4 mt-auto">

                <button
                    className="bg-blue-600 text-white w-fit px-4 py-2 font-semibold rounded-xl"
                >
                    Sebelumnya
                </button>

                <button
                    className="border border-[#943700] bg-white w-[100px] px-4 py-4 rounded-xl ml-auto mr-auto font-semibold text-[#943700]"
                >
                    Tandai
                </button>

                <button
                    className="bg-green-600 text-white w-fit px-4 py-2 font-semibold rounded-xl ml-auto"
                    onClick={() => setShowDone(true)}
                >
                    Selesai
                </button>
            </div>

            <ShowDone
                isOpen={showDone}
                onConfirm={handleDone}
                onCancel={() => setShowDone(false)}
            />
        </>
    );
}

