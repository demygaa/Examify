import SecurityTimeline from "./RecentData";

export default function RecentReports() {
    const activities = [
        {
            id: 1,
            title: "Bagus berpindah tab browser",
            icon: "tab",
        },
        {
            id: 2,
            title: "Deteksi wajah tidak ditemukan",
            icon: "face",
        },
        {
            id: 3,
            title: "Membuka aplikasi lain",
            icon: "app",
        },
        
    ];
    return (
        <div className="bg-white w-[350px] border border-slate-300 shadow-sm rounded-xl">
            <div className="flex justify-between items-center border-b border-slate-300 p-[10px]">
                <p className="text-[20px] font-semibold">Aktivitas</p>
                <button className="text-blue-700 font-semibold text-[15px]">Lihat Semua</button>
            </div>
            <div className="p-[10px]">
                <SecurityTimeline data={activities}/>
            </div>

        </div>
    );
}