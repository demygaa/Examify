import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

function getErrorCode(error: unknown): string | undefined {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "string" ? code : undefined;
  }

  return undefined;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID kelas tidak valid" },
        { status: 400 }
      );
    }

    const kelas = await prisma.kelas.findUnique({
      where: { id },
      include: {
        jurusan: true,
        waliKelas: { include: { karyawan: true } },
        siswa: {
          where: { tahunAjaran: { isActive: true } },
        },
      },
    });

    if (!kelas) {
      return NextResponse.json(
        { success: false, message: "Kelas tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: kelas.id,
      tingkat: kelas.tingkat,
      jurusan: kelas.jurusan.nama,
      kode_jurusan: kelas.jurusan.kode,
      kode_kelas: kelas.kodeKelas,
      jumlah_siswa: kelas.siswa.length,
      waliKelasId: kelas.waliKelas?.karyawanId ?? null,
      wali_kelas: kelas.waliKelas
        ? {
            nama: kelas.waliKelas.karyawan.nama,
            nip: kelas.waliKelas.karyawan.nip,
          }
        : null,
    });
  } catch (error) {
    console.error("GET /api/admin/kelas/[id]", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID kelas tidak valid" },
        { status: 400 }
      );
    }

    const { kelas, jurusan, kode_kelas, kodejur, waliKelasId } = body;

    if (!kelas || !jurusan || !kode_kelas || !kodejur) {
      return NextResponse.json(
        { success: false, message: "Data harus lengkap" },
        { status: 400 }
      );
    }

    const kodeKelas = String(kode_kelas).trim().toUpperCase();
    const kodeJur = String(kodejur).trim().toUpperCase();
    const namaJurusan = String(jurusan).trim();

    if (!kodeKelas || !kodeJur || !namaJurusan) {
      return NextResponse.json(
        { success: false, message: "Data harus lengkap" },
        { status: 400 }
      );
    }

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

      if (sudahMenjadiWali && sudahMenjadiWali.kelasId !== id) {
        return NextResponse.json(
          { success: false, message: "Guru sudah menjadi wali kelas lain" },
          { status: 409 }
        );
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const jurusanData = await tx.jurusan.upsert({
        where: { kode: kodeJur },
        update: {},
        create: { kode: kodeJur, nama: namaJurusan },
      });

      const kelasData = await tx.kelas.update({
        where: { id },
        data: {
          tingkat: String(kelas).trim(),
          kodeKelas,
          jurusanId: jurusanData.id,
        },
      });

      if (waliKelasId) {
        await tx.waliKelas.upsert({
          where: { kelasId: id },
          update: { karyawanId: waliKelasId },
          create: { kelasId: id, karyawanId: waliKelasId },
        });
      } else {
        await tx.waliKelas.deleteMany({ where: { kelasId: id } });
      }

      return kelasData;
    });

    return NextResponse.json({
      success: true,
      message: "Data kelas berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    const code = getErrorCode(error);

    if (code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Kode kelas sudah terdaftar" },
        { status: 409 }
      );
    }

    if (code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Kelas tidak ditemukan" },
        { status: 404 }
      );
    }

    console.error("PATCH /api/admin/kelas/[id]", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data kelas" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID kelas tidak valid" },
        { status: 400 }
      );
    }

    await prisma.kelas.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Data kelas berhasil dihapus",
    });
  } catch (error) {
    const code = getErrorCode(error);

    if (code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Kelas tidak ditemukan" },
        { status: 404 }
      );
    }

    if (code === "P2003") {
      return NextResponse.json(
        { success: false, message: "Kelas masih memiliki siswa" },
        { status: 409 }
      );
    }

    console.error("DELETE /api/admin/kelas/[id]", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus data kelas" },
      { status: 500 }
    );
  }
}
