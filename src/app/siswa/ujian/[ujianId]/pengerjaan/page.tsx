"use client";

import { useState } from "react";
import HeaderPengerjaan from "@/src/components/siswa/ujian/pengerjaan/HeaderPengerjaan";
import QuestionNavigation from "@/src/components/siswa/ujian/pengerjaan/NavigasiSoal";
import NavigationBottom from "@/src/components/siswa/ujian/pengerjaan/NavigationPengerjaan";
import ProgresPengerjaan from "@/src/components/siswa/ujian/pengerjaan/ProgresTask";
import Quest from "@/src/components/siswa/ujian/pengerjaan/Quest";
import { List } from "lucide-react";

export default function Pengerjaan() {
    const [showNav, setShowNav] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderPengerjaan />
            <div className="flex flex-1 flex-col lg:flex-row gap-3 lg:gap-5 items-start justify-center px-2 sm:px-4 lg:px-6 pb-4">
                <div className="w-full lg:flex-1 max-w-3xl">
                    <ProgresPengerjaan />
                    <Quest />
                </div>
                <div className="hidden lg:block">
                    <QuestionNavigation />
                </div>
            </div>
            
            {/* Mobile: Button to open navigation */}
            <button
                onClick={() => setShowNav(true)}
                className="lg:hidden fixed bottom-20 right-4 z-40 bg-blue-600 text-white rounded-full p-3 shadow-lg flex items-center gap-2"
            >
                <List size={20} />
                <span className="text-sm font-semibold">Daftar Soal</span>
            </button>

            {/* Mobile: Navigation drawer */}
            {showNav && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 z-50 bg-black/50"
                        onClick={() => setShowNav(false)}
                    />
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-800">Navigasi Soal</h2>
                            <button
                                onClick={() => setShowNav(false)}
                                className="text-slate-500"
                            >
                                Tutup
                            </button>
                        </div>
                        <div className="p-4">
                            <QuestionNavigation />
                        </div>
                    </div>
                </>
            )}
            
            <NavigationBottom />
        </div>
    );
}