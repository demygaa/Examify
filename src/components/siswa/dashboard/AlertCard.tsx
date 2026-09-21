import React from "react";
import { Info, Shield, Wifi, Battery, Cctv } from 'lucide-react';


export default function AlertCard() {
    return (
        <div className="mt-[30px] bg-blue-100 p-10 rounded-xl border border-slate-200">
            <div className="flex flex-row items-center gap-[10px]">
                <Info size={30}
                    color="red"
                />
                <h1
                    className="text-[20px] text-black font-bold"
                >
                    Aturan Penting Ujian
                </h1>
            </div>
            <div className="mt-[20px] flex flex-row items-center gap-4">
                <Shield size={20}
                    color="blue"
                />
                <p className="text-[15px] text-black text-slate-800">
                    Jaga integritas akademik; segala bentuk kecurangan akan mengakibatkan
                    diskualifikasi otomatis.
                </p>

            </div>
            <div className="mt-[20px] flex flex-row items-center gap-4">
                <Wifi size={20}
                    color="blue"
                />
                <p className="text-[15px] text-black text-slate-800">
                    Pastikan koneksi internet stabil minimal 5Mbps sebelum menekan tombol "Mulai".
                </p>
            </div>
            <div className="mt-[20px] flex flex-row items-center gap-4">
                <Battery size={20}
                    color="blue"
                />
                <p className="text-[15px] text-black text-slate-800">
                    Pastikan Baterai mencukupi dalam jangka waktu mengerjakan ujian.
                </p>
            </div>
            <div className="mt-[20px] flex flex-row items-center gap-4">
                <Cctv size={20}
                    color="blue"
                />
                <p className="text-[15px] text-black text-slate-800">
                    Sistem proctoring akan memantau aktivitas layar dan kamera selama ujian
                    berlangsung.
                </p>
            </div>

        </div>
    );
}