import HeaderUjian from "@/src/components/siswa/ujian/HeaderUjian";
import FilterTime from "@/src/components/siswa/ujian/FilterTime"
import React from "react";
import ExamPresent from "@/src/components/siswa/ujian/ExamPresent";
import ExamToday from "@/src/components/siswa/ujian/ExamToday";
import ExamifyCard from "@/src/components/siswa/ujian/ExamifyCard";
import FinishBook from "@/src/components/siswa/ujian/FinishBook";

export default function ujian() {
    const exams = [
        {
            id: 1,
            status: "BERLANGSUNG" as const,
            mapel: "Matematika",
            judul: "Ujian Tengah Semester",
            kelas: "XI RPL 1",
            timer: "90 Menit",
            schedule: "08:00 - 09:30",
        },
        {
            id: 2,
            status: "SCHEDULED" as const,
            mapel: "Bahasa Indonesia",
            judul: "Ujian Bahasa Indonesia",
            kelas: "XI RPL 1",
            timer: "60 Menit",
            schedule: "10:00 - 11:00",
        },
    ]
    return (
        <div>
            <HeaderUjian />
            <div className="flex justify-start sm:justify-end mb-4">
                <FilterTime
                    options={[
                        {
                            label: "Semua",
                            value: "all",
                        },
                        {
                            label: "Berlangsung",
                            value: "ongoing",
                        },
                        {
                            label: "Mendatang",
                            value: "upcoming",
                        },
                    ]}
                />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-[20px] w-full">
                <div className="flex w-full lg:w-1/2">
                    <ExamToday
                        title="UJIAN HARI INI"
                        jumlah={3}
                        nextMapel="Fisika"
                        time="14 Januari"
                    />
                </div>
                <div className="flex w-full lg:w-1/2">
                    <ExamPresent
                        present="100%"
                    />
                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                {exams.map((exam) => (
                    <ExamifyCard
                        key={exam.id}
                        id={exam.id}
                        status={exam.status}
                        mapel={exam.mapel}
                        judul={exam.judul}
                        kelas={exam.kelas}
                        timer={exam.timer}
                        schedule={exam.schedule}
                    />
                ))}
            </div>
            <FinishBook />
        </div>
    );

}