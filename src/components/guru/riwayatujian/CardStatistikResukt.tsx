import { LucideIcon } from "lucide-react";

type CardStatisticResultProps = {
    title: string;
    icon: LucideIcon;
    value: string;
    progres?: number;
};

export default function CardStatisticResult({
    title,
    icon: Icon,
    value,
    progres,
}: CardStatisticResultProps) {

    const isActive = progres !== undefined;

    return (
        <div className="bg-white p-[20px] rounded-xl shadow-sm border border-slate-300 w-full">

            <div className="flex flex-row justify-between">
                <p className="text-slate-300 text-[15px]">
                    {title}
                </p>

                <Icon
                    size={40}
                    color="blue"
                    className="bg-blue-100 p-2 rounded-full"
                />
            </div>

            <p className="text-[30px] font-bold">
                {value}
            </p>

            {isActive && (
                <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${progres}%` }}
                    />
                </div>
            )}

        </div>
    );
}