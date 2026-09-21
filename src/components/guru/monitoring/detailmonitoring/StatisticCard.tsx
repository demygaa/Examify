type CardStatiscMonitoringProps = {
    judul: string
    value: string
}
export default function CardStatisticMonitoring({
    judul,
    value
} : CardStatiscMonitoringProps) {
    return (
        <div className="bg-white text-black flex flex-col gap-3 p-[27px] w-full rounded-xl shadow-sm border border-slate-300">
            <p className="font-semibold text-[15px] text-slate-500">{judul}</p>
            <p className="text-[35px] font-semibold">{value}</p>
        </div>
    );
}