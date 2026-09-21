import AlertCard from "@/src/components/siswa/dashboard/AlertCard";
import AlertForm from "@/src/components/siswa/ujian/joinexam/AlertForm";
import CustemerServiceCard from "@/src/components/siswa/ujian/joinexam/CustemerServiceCard";
import JoinHeader from "@/src/components/siswa/ujian/joinexam/HeaderJoin";
import StartExam from "@/src/components/siswa/ujian/joinexam/StartExam";

export  default function JoinExam() {
    return (
        <div className="bg-[#F0F1FD] w-screen h-screen">
            <JoinHeader />

            <div className="flex flex-col items-center">
                <div className="text-black">
                    <p className="text-center text-[20px] font-bold">Konfirmasi Pelaksanaan Ujian</p>
                    <p className="text-slate-600">Harap periksa kembali detail ujian dan baca peraturan dengan seksama sebelum memulai.</p>
                </div>
                <div className="flex flex-row gap-5">
                    <AlertForm />
                    <div>
                        <StartExam />
                        <CustemerServiceCard />
                    </div>
                </div>
                
            </div>


        </div>
    );
}