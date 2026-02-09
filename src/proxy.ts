import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let role;

    const { data } = await userService.getSession();

    if (data) {
        isAuthenticated = true;
        role = data?.data?.user?.role;
    }

    //* User in not authenticated at all
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    //* User is authenticated and role = ADMIN
    //* User can visit admin dashboard
    if (role === Roles.admin && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    //* User is authenticated and role = seller
    //* User can not visit admin-dashboard
    if (role === Roles.seller && pathname.startsWith("/seller")) {
        return NextResponse.redirect(new URL("/seller/dashboard", request.url));
    }

    //* User is authenticated and role = customer
    //* User can not visit seller or admin dashboard
    if (role === Roles.customer) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/admin",
        "/admin/:path*",
        "/seller",
        "/seller/:path*",
    ],
};
