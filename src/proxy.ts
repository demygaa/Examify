import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, TOKEN_NAME, roleHome, Role } from "@/src/lib/auth";

const roleByPathname: { prefix: string; role: Role }[] = [
    { prefix: "/admin", role: "ADMIN" },
    { prefix: "/guru", role: "GURU" },
    { prefix: "/siswa", role: "SISWA" },
];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === "/" || pathname.startsWith("/login")) {
        const token = request.cookies.get(TOKEN_NAME)?.value;

        if (token) {
            try {
                const payload = verifyToken(token);
                return NextResponse.redirect(
                    new URL(roleHome[payload.role], request.url)
                );
            } catch {
                // token invalid -> biarkan di halaman login
            }
        }

        return NextResponse.next();
    }

    const protectedRoute = roleByPathname.find((r) =>
        pathname.startsWith(r.prefix)
    );

    if (!protectedRoute) {
        return NextResponse.next();
    }

    const token = request.cookies.get(TOKEN_NAME)?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        const payload = verifyToken(token);

        if (payload.role !== protectedRoute.role) {
            return NextResponse.redirect(
                new URL(roleHome[payload.role], request.url)
            );
        }

        return NextResponse.next();
    } catch {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete(TOKEN_NAME);
        return response;
    }
}

export const config = {
    matcher: ["/", "/login/:path*", "/admin/:path*", "/guru/:path*", "/siswa/:path*"],
};