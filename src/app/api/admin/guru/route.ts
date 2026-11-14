import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const guru = await prisma.karyawan.findMany({
      where: { jenis: "GURU" },
      include: {
        mapel: { include: { mapel: true } },
        waliKelas: { include: { kelas: true } },
      },
      orderBy: { nama: "asc" },
    });

    const data = guru.map((g) => ({
      id: g.id,
      nama: g.nama,
      nip: g.nip,
      mapel: g.mapel.map((m) => ({
        id: m.mapel.id,
        kode: m.mapel.kode,
        nama: m.mapel.nama,
      })),
      waliKelas: g.waliKelas
        ? {
            id: g.waliKelas.id,
            kelasId: g.waliKelas.kelasId,
            kodeKelas: g.waliKelas.kelas.kodeKelas,
          }
        : null,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("ERROR GET GURU:", error);

    return NextResponse.json(
      { success: false, message: "Gagal mengambil data guru" },
      { status: 500 }
    );
  }
}
