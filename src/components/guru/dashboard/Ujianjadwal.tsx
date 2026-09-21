type UjianScheduleProps = {
    id: number
    nama: string
    kelas: string
    schedule: string
    durasi: string
    status: string
}

export default function UjianRow({
    nama,
    kelas,
    schedule,
    durasi,
    status
}: UjianScheduleProps) {

    const isActived = status === "BERLANGSUNG"
    return (
        <tr className="border-b border-slate-100 text-left text-slate-700 hover:bg-slate-50 transition-colors">
            <td className="p-4 font-semibold">{nama}</td>
            <td className="py-3">{kelas}</td>
            <td className="py-3">{schedule}</td>
            <td className="py-3">{durasi} Menit</td>
            <td className="py-3">
                {isActived
                ?
                <span className="bg-blue-50 text-[10px] text-blue-600 px-3 py-2 rounded-full font-semibold">
                    {status}
                </span>
                :
                <span className="bg-slate-50 text-[10px] text-slate-600 px-3 py-2 rounded-full font-semibold">
                    {status}
                </span>


                }
                
            </td>
        </tr>
    );
}