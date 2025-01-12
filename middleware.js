import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("token");

  const isLoginPage = request.nextUrl.pathname === "/login";
  const protectedRoutes = ["/Equipments", "/Employees", "/Reports", "/users", "/Home", "/Activities", "/Peripherals","/unauthorized"];
  const protectedRoutesUser = ["/Reports", "/Home", "/AsignedActivities","/unauthorized"];

  if (!jwt) {
    if (!isLoginPage) {
      // If there is no JWT and the user is not on the login page, redirect to login
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isLoginPage) {
      // If the user is already logged in, redirect them to the home page
      return NextResponse.redirect(new URL("/Home", request.url));
    }

    try {
      const { payload } = await jwtVerify(jwt.value, new TextEncoder().encode("secret"));
      const userRole = payload.role;

      // Protect routes based on the user role
      switch (userRole) {
        case "admin":
          // Admin should not access routes meant for regular users
          if (!protectedRoutes.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
          }
          break;

        case "user":
          // User should not access routes meant for admins
          if (!protectedRoutesUser.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
          }
          break;

        default:
          // Default case if the role is unknown or unauthorized
          return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

    } catch (error) {
      // If there's an error verifying the JWT, redirect to the login page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow the request to proceed to the next middleware or route handler
  return NextResponse.next();
}

export const config = {
  matcher: ["/Home","/Equipments", "/Employees", "/login", "/Reports", "/unauthorized", "/users", "/AsignedActivities", "/Peripherals", "/Activities"],
};
