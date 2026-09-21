import React from "react";
import RecentActivity from "./RecentActivity";

export default function ActivityCard() {
    return (
        <div className="bg-white w-full h-full ml-[30px]  border border-slate-200 rounded-xl">
            <div className="border border-slate-200 rounded-xl flex justify-center items-center h-[60px] rounded-bl-[0px] rounded-br-[0px]">
                <p className="text-[20px] font-bold text-black">
                    Aktivitas Terbaru
                </p>
            </div>
            
            <RecentActivity />
        </div>
    );
}