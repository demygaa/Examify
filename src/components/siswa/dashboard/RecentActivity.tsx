type Activity = {
    title: string;
};

const activities = [
    {
        title: "Ujian Matematika Selesai",
    },
    {
        title: "Ujian Bahasa Indonesia Selesai",
    },
    {
        title: "Ujian Pemrograman Web Selesai",
    },
];

export default function RecentActivity() {
    return (
        <div className="w-full p-4">
            {activities.map((activity, index) => (
                <div key={index} className="relative flex gap-5">
                    
                    <div className="relative flex w-6 shrink-0 justify-center">
                        
                        {index !== activities.length - 1 && (
                            <div className="absolute top-6 bottom-[-8px] w-[2px] bg-slate-300" />
                        )}

                        <div className="relative z-10 h-6 w-6 rounded-full border-[3px] border-white bg-blue-600 ring-1 ring-slate-300" />
                    </div>

                    <div className="pb-8">
                        <p className="text-[15px] font-medium text-slate-800">
                            {activity.title}
                        </p>
                    </div>

                </div>
            ))}
        </div>
    );
}