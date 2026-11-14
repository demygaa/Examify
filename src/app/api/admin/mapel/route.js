import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mapel = await prisma.mataPelajaran.findMany({
      include: {
        _count: {
          select: { guru: true },
        },
      },
      orderBy: { kode: "asc" },
    });

    const data = mapel.map((m) => ({
      id: m.id,
      kode: m.kode,
      nama: m.nama,
      isActive: m.isActive,
      createdAt: m.createdAt.toISOString(),
      jumlahGuru: m._count.guru,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("ERROR GET MAPEL:", error);

    return NextResponse.json(
      { success: false, message: "Gagal mengambil data mapel" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { kode_mapel, nama_mapel } = body;

    if (typeof kode_mapel !== "string" || typeof nama_mapel !== "string") {
      return NextResponse.json(
        { success: false, message: "Data harus berupa teks" },
        { status: 400 }
      );
    }

    const kode = kode_mapel.trim().toUpperCase();
    const nama = nama_mapel.trim();

    if (!kode || !nama) {
      return NextResponse.json(
        { success: false, message: "Kode dan nama mapel wajib diisi" },
        { status: 400 }
      );
    }

    const result = await prisma.mataPelajaran.create({
      data: { kode, nama },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Data mapel berhasil ditambahkan",
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Kode mapel sudah terdaftar" },
        { status: 409 }
      );
    }

    console.error("ERROR TAMBAH MAPEL:", error);

    return NextResponse.json(
      { success: false, message: "Gagal menambahkan data mapel" },
      { status: 500 }
    );
  }
}
