import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID mapel tidak valid" },
        { status: 400 }
      );
    }

    const mapel = await prisma.mataPelajaran.findUnique({
      where: { id },
      include: {
        _count: {
          select: { guru: true },
        },
      },
    });

    if (!mapel) {
      return NextResponse.json(
        { success: false, message: "Mapel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: mapel.id,
        kode: mapel.kode,
        nama: mapel.nama,
        isActive: mapel.isActive,
        createdAt: mapel.createdAt.toISOString(),
        jumlahGuru: mapel._count.guru,
      },
    });
  } catch (error) {
    console.error("ERROR GET DETAIL MAPEL:", error);

    return NextResponse.json(
      { success: false, message: "Gagal mengambil data mapel" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID mapel tidak valid" },
        { status: 400 }
      );
    }

    const data = {};

    if (body.kode_mapel !== undefined) {
      if (typeof body.kode_mapel !== "string") {
        return NextResponse.json(
          { success: false, message: "Kode mapel harus berupa teks" },
          { status: 400 }
        );
      }

      const kode = body.kode_mapel.trim().toUpperCase();

      if (!kode) {
        return NextResponse.json(
          { success: false, message: "Kode mapel wajib diisi" },
          { status: 400 }
        );
      }

      data.kode = kode;
    }

    if (body.nama_mapel !== undefined) {
      if (typeof body.nama_mapel !== "string") {
        return NextResponse.json(
          { success: false, message: "Nama mapel harus berupa teks" },
          { status: 400 }
        );
      }

      const nama = body.nama_mapel.trim();

      if (!nama) {
        return NextResponse.json(
          { success: false, message: "Nama mapel wajib diisi" },
          { status: 400 }
        );
      }

      data.nama = nama;
    }

    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        return NextResponse.json(
          { success: false, message: "Status mapel harus berupa boolean" },
          { status: 400 }
        );
      }

      data.isActive = body.isActive;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { success: false, message: "Tidak ada data yang diubah" },
        { status: 400 }
      );
    }

    const result = await prisma.mataPelajaran.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      message: "Data mapel berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Kode mapel sudah terdaftar" },
        { status: 409 }
      );
    }

    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Mapel tidak ditemukan" },
        { status: 404 }
      );
    }

    console.error("ERROR UPDATE MAPEL:", error);

    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data mapel" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID mapel tidak valid" },
        { status: 400 }
      );
    }

    await prisma.mataPelajaran.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Data mapel berhasil dihapus",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Mapel tidak ditemukan" },
        { status: 404 }
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        { success: false, message: "Mapel masih digunakan guru" },
        { status: 409 }
      );
    }

    console.error("ERROR HAPUS MAPEL:", error);

    return NextResponse.json(
      { success: false, message: "Gagal menghapus data mapel" },
      { status: 500 }
    );
  }
}
