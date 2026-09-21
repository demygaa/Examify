import {
    AlertTriangle,
    EyeOff,
    Calculator,
} from "lucide-react";

type Activity = {
    id: number;
    title: string;
    icon: "tab" | "face" | "app";
};

type Props = {
    data: Activity[];
};

export default function SecurityTimeline({ data }: Props) {
    
    return (
        <div className="bg-white border border-slate-300 rounded-xl shadow-sm p-5">
            <div className="relative">

                {/* Garis timeline */}
                <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-slate-300" />

                <div className="flex flex-col gap-6">
                    {data.map((activity) => {

                        const Icon =
                            activity.icon === "tab"
                                ? AlertTriangle
                                : activity.icon === "face"
                                    ? EyeOff
                                    : Calculator;

                        return (
                            <div
                                key={activity.id}
                                className="relative flex items-center gap-3"
                            >
                                {/* Icon */}
                                <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                                    <Icon
                                        size={12}
                                        className="text-red-500"
                                    />
                                </div>

                                {/* Aktivitas */}
                                <p className="text-red-600 font-semibold text-[13px]">
                                    {activity.title}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}