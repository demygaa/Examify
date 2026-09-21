import StatisticCard from "@/src/components/siswa/dashboard/StatisticCard";
import TabelNotDone from "@/src/components/siswa/history/notdone/ExamNotDone";
import NotDoneHeader from "@/src/components/siswa/history/notdone/NotDoneHeader";
import { Notebook, Timer } from "lucide-react";

export default function PageNotDone() {
    return (
        <div>
            <NotDoneHeader />

            <div className="flex flex-row gap-[30px] mb-[30px]">
                <StatisticCard
                    title="Total belum dikerjakan"
                    value="04"
                    icon={Notebook}
                />
                <StatisticCard
                    title="Mendekati Deadline"
                    value="01"
                    icon={Timer}
                    className="text-[#BA1A1A] bg-[#FFDAD6]"
                />
            </div>


            <TabelNotDone />
        </div>
    );
}