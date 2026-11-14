
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
            <div className="bg-white border-slate-300 border-t px-3 sm:px-[15px] grid grid-cols-3 py-3 sm:py-4 mt-auto gap-2">

                <button
                    className="bg-blue-600 text-white w-full sm:w-fit px-3 sm:px-4 py-2 font-semibold rounded-xl text-sm sm:text-base"
                >
                    Sebelumnya
                </button>

                <button
                    className="border border-[#943700] bg-white w-full sm:w-[100px] px-2 sm:px-4 py-2 sm:py-4 rounded-xl mx-auto font-semibold text-[#943700] text-sm sm:text-base"
                >
                    Tandai
                </button>

                <button
                    className="bg-green-600 text-white w-full sm:w-fit px-3 sm:px-4 py-2 font-semibold rounded-xl ml-auto text-sm sm:text-base"
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

