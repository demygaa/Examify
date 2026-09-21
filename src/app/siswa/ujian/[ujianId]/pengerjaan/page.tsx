import HeaderPengerjaan from "@/src/components/siswa/ujian/pengerjaan/HeaderPengerjaan";
import QuestionNavigation from "@/src/components/siswa/ujian/pengerjaan/NavigasiSoal";
import NavigationBottom from "@/src/components/siswa/ujian/pengerjaan/NavigationPengerjaan";
import ProgresPengerjaan from "@/src/components/siswa/ujian/pengerjaan/ProgresTask";
import Quest from "@/src/components/siswa/ujian/pengerjaan/Quest";

export default function Pengerjaan() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderPengerjaan />
            <div className="flex flex-1 flex-row gap-5 items-center justify-center">
                <div>
                    <ProgresPengerjaan />
                    <Quest />
                </div>
                <div className="">
                    <QuestionNavigation />
                </div>
            </div>
            <NavigationBottom />
        </div>
    );
}