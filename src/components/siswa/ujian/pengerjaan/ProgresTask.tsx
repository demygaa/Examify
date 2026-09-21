export default function ProgresPengerjaan() {
    return (
        <div className="bg-white p-[20px] text-black flex flex-col gap-4 rounded-xl w-[700px]">
            <h1 className="font-semibold text-[18px] ">Progres Ujian</h1>
            <div className="flex flex-row gap-4 ">
                <div className="h-2 w-full rounded-full bg-slate-200">
                    <div
                        className="h-4 rounded-full bg-blue-600 w-[100px]"
                    />
                </div>
                <p className="text-black w-[300px]">12 soal dari 40 soal (12%)</p>
            </div>


        </div>
    );
}