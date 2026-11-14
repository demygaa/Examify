"use client";

import { useState } from "react";
import ExamHistoryFilter from "./ExamHistoryFilter";
import ExamHistoryPagination from "./ExamPagenation";

type Exam = {
    id: number;
    judul: string;
    mapel: string;
    tanggal: string;
    status: string;
};

type Props = {
    exams: Exam[];
};

export default function ExamHistoryTable({ exams }: Props) {

    const [selectedMapel, setSelectedMapel] = useState("Semua Subjek");

    const [selectedSort, setSelectedSort] = useState("Terbaru");


    
    const [currentPage, setCurrentPage] = useState(1);

   
    const itemsPerPage = 4;



    let filteredExams =
        selectedMapel === "Semua Subjek"
            ? [...exams]
            : exams.filter(
                (exam) => exam.mapel === selectedMapel
            );


   

    if (selectedSort === "Terbaru") {
        filteredExams.reverse();
    }

    if (selectedSort === "Terlama") {
        filteredExams.sort(
            (a, b) => a.id - b.id
        );
    }


  
    const totalPages = Math.ceil(
        filteredExams.length / itemsPerPage
    );



    const startIndex =
        (currentPage - 1) * itemsPerPage;


    const currentExams = filteredExams.slice(
        startIndex,
        startIndex + itemsPerPage
    );


    return (
        <div className="mt-6 lg:mt-[30px] overflow-x-auto rounded-xl border border-slate-300 bg-white">

           
            <ExamHistoryFilter
                selectedMapel={selectedMapel}
                selectedSort={selectedSort}

                onMapelChange={(value) => {
                    setSelectedMapel(value);


                    setCurrentPage(1);
                }}

                onSortChange={(value) => {
                    setSelectedSort(value);

                   
                    setCurrentPage(1);
                }}
            />


        
            <table className="w-full min-w-[500px] sm:min-w-[600px]">

                <thead>
                        <tr className="bg-slate-50 text-black">

                            <th className="px-3 sm:px-5 py-2.5 sm:py-4 text-left text-xs sm:text-sm">
                                JUDUL UJIAN
                            </th>

                            <th className="px-2 sm:px-5 py-2.5 sm:py-4 text-left text-xs sm:text-sm">
                                SUBJEK
                            </th>

                            <th className="px-2 sm:px-5 py-2.5 sm:py-4 text-left text-xs sm:text-sm">
                                TANGGAL
                            </th>

                            <th className="px-2 sm:px-5 py-2.5 sm:py-4 text-left text-xs sm:text-sm">
                                STATUS
                            </th>

                        </tr>
                </thead>


                <tbody>

                  
                    {currentExams.map((exam) => (

                        <tr
                            key={exam.id}
                            className="border-t border-slate-200 text-black"
                        >

                            <td className="px-3 sm:px-5 py-3 sm:py-4">

                                <p className="font-bold text-sm sm:text-base line-clamp-2">
                                    {exam.judul}
                                </p>

                                <p className="text-xs sm:text-sm text-slate-500">
                                    ID: EX-{exam.id}
                                </p>

                            </td>


                            <td className="px-2">

                                <p className="w-fit rounded-full bg-blue-200 px-2 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-blue-700">
                                    {exam.mapel}
                                </p>

                            </td>


                            <td className="px-2 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                                {exam.tanggal}
                            </td>


                            <td className="px-2 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm">
                                {exam.status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>


       

            <ExamHistoryPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredExams.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />

        </div>
    );
}