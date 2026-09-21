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
        <div className="mt-[30px] overflow-hidden rounded-xl border border-slate-300 bg-white">

           
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


        
            <table className="w-full">

                <thead>
                    <tr className="bg-slate-50 text-black">

                        <th className="px-5 py-4 text-left">
                            JUDUL UJIAN
                        </th>

                        <th className="px-5 py-4 text-left">
                            SUBJEK
                        </th>

                        <th className="px-5 py-4 text-left">
                            TANGGAL
                        </th>

                        <th className="px-5 py-4 text-left">
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

                            <td className="px-5 py-4">

                                <p className="font-bold">
                                    {exam.judul}
                                </p>

                                <p className="text-sm text-slate-500">
                                    ID: EX-{exam.id}
                                </p>

                            </td>


                            <td>

                                <p className="w-fit rounded-full bg-blue-200 px-2 py-2 font-semibold text-blue-700">
                                    {exam.mapel}
                                </p>

                            </td>


                            <td className="px-5 py-4">
                                {exam.tanggal}
                            </td>


                            <td className="px-5 py-4">
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