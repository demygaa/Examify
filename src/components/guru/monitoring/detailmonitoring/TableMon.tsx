type TableMonProps = {
    id: number
    nama: string
    nomor: string
    waktu: string
    status: "Aktif" | "Selesai" | "Offline"
    skor: string
}
type dataPeserta = {
    data: TableMonProps[]
}
export default function TableMon({
    data
}: dataPeserta) {


    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr className="text-slate-500 border-b border-slate-300 py-[15px]">
                        <th className="text-left flex ml-[15px] flex py-[15px]">Nama Peserta</th>
                        <th className="text-center">No.soal</th>
                        <th className="text-center">Sisa Waktu</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Skor</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((peserta) => {
                        const statusP = peserta.status === "Aktif"
                            ? "bg-blue-100 px-2 py-1 text-blue-700"
                            : peserta.status === "Selesai"
                                ? "bg-green-100 px-2 py-1 text-green-700"
                                : "bg-red-100 px-2 py-1 text-red-700"
                        return (
                            <tr className="text-black hover:bg-slate-100" key={peserta.id}>
                                <td className="font-semibold text-[15px] flex ml-[15px] py-[15px]">{peserta.nama}</td>
                                <td className="text-slate-600 font-semibold text-center">{peserta.nomor}</td>
                                <td className="text-slate-600 font-semibold text-center">{peserta.waktu}</td>
                                <td className="flex items-center justify-center"><div className={`w-fit items-center rounded-full font-semibold text-[15px] justify-center flex ${statusP}`}>
                                        {peserta.status}
                                </div></td>
                                <td className="text-slate-800 font-semibold text-center">{peserta.skor}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    );
}