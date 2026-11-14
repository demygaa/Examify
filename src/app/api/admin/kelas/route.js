import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const kelas = await prisma.kelas.findMany({
      include: {
        jurusan: true,
        waliKelas: { include: { karyawan: true } },
        _count: {
          select: {

            siswa: { where: { tahunAjaran: { isActive: true } } },
          },
        },
      },
      orderBy: { kodeKelas: "asc" },
    });

    const data = kelas.map((k) => ({
      id: k.id,
      kelas: k.kodeKelas,
      jurusan: k.jurusan.nama,
      tingkat: k.tingkat,
      kodeKelas: k.kodeKelas,
      kodeJurusan: k.jurusan.kode,
      jumlahSiswa: k._count.siswa,
      waliKelasId: k.waliKelas?.karyawanId ?? null,
      waliKelasNama: k.waliKelas?.karyawan.nama ?? null,
      waliKelasNip: k.waliKelas?.karyawan.nip ?? null,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("ERROR GET KELAS:", error);

    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kelas" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();


    const { kelas, jurusan, kode_kelas, kodejur, waliKelasId } = body;

    if (!kelas || !jurusan || !kode_kelas || !kodejur) {
      return NextResponse.json(
        { success: false, message: "Data Harus lengkap" },
        { status: 400 }
      )
    }

    const kodeKelas = kode_kelas.trim().toUpperCase();

    if (waliKelasId) {
      const guru = await prisma.karyawan.findFirst({
        where: { id: waliKelasId, jenis: "GURU" },
      });

      if (!guru) {
        return NextResponse.json(
          { success: false, message: "Wali kelas tidak ditemukan" },
          { status: 400 }
        );
      }

      const sudahMenjadiWali = await prisma.waliKelas.findUnique({
        where: { karyawanId: waliKelasId },
      });

      if (sudahMenjadiWali) {
        return NextResponse.json(
          { success: false, message: "Guru sudah menjadi wali kelas lain" },
          { status: 409 }
        );
      }
    }

    const result = await prisma.$transaction(async (tx) => {

      const jurusanData = await tx.jurusan.upsert({
        where: { kode: kodejur },
        update: {},
        create: { kode: kodejur, nama: jurusan.trim() },
      });


      const kelasData = await tx.kelas.create({
        data: {
          tingkat: kelas,
          kodeKelas: kodeKelas,
          jurusanId: jurusanData.id,
          waliKelas: waliKelasId
            ? { create: { karyawanId: waliKelasId } }
            : undefined,
        },
      });

      return { jurusan: jurusanData, kelas: kelasData };
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data kelas berhasil ditambahkan",
        data: result
      },
      { status: 201 }
    )
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Kode kelas sudah terdaftar" },
        { status: 409 }
      );
    }

    console.error("ERROR POST KELAS:", error);

    return NextResponse.json(
      { success: false, message: "Gagal menambahkan data kelas" },
      { status: 500 }
    );
  }
}