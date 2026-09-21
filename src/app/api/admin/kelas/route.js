import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const kelas = await prisma.kelas.findMany();

    return NextResponse.json({
      success: true,
      data: kelas,
    });
  } catch (error) {
    console.error("ERROR GET KELAS:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data kelas",
        error: String(error),
      },
      { status: 500 }
    );
  }
}