import { NextResponse } from "next/server";
import { TOKEN_NAME } from "@/src/lib/auth";

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: "Logout berhasil",
    });

    response.cookies.delete(TOKEN_NAME);

    return response;
}