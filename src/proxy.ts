import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserType } from "./lib/roles";

const PUBLIC_PATHS = ["/login", "/error/forbidden", "/error/unauthorized"];

function isAuthorizedPath(pathname: string, allowedPaths: string[]) {
  return allowedPaths.some(
    (allowed) => pathname === allowed || pathname.startsWith(allowed + "/")
  );
}
export default function proxy(request: NextRequest) {
  // const pathname = request.nextUrl.pathname;
  // const access_token = request.cookies.get("ACCESS_TOKEN")?.value;
  // const user_type = request.cookies.get("USER_TYPE")?.value as UserType;
  // const locale =
  //   request.cookies.get("NEXT_LOCALE")?.value || routing.defaultLocale;

  // const publicRoutes = ["/login"];

  // const isPublic = publicRoutes.some(
  //   (route) => pathname === `/${locale}${route}` || pathname === route
  // );

  // Block access to protected pages if not authenticated
  // if (!isPublic) {
  //   const loginUrl = new URL(`/${locale}/login`, request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // const isRootOrLogin =
  //   pathname === "/" || pathname === `/${locale}` || isPublic;

  // if (access_token && user_type && isRootOrLogin) {
  //   let dashboardUrl;

  //   switch (user_type) {
  //     case UserType.SUPER_ADMIN:
  //     case UserType.ADMIN:
  //       dashboardUrl = new URL(`/${locale}/dashboard/overview`, request.url);
  //       break;
  //     case UserType.CALL_SERVICE:
  //     case UserType.ACCOUNTANT:
  //       dashboardUrl = new URL(
  //         `/${locale}/dashboard/umrah-requests/current-requests`,
  //         request.url
  //       );
  //       break;
  //     default:
  //       dashboardUrl = new URL(`/${locale}/error/unauthorized`, request.url);
  //       break;
  //   }

  //   return NextResponse.redirect(dashboardUrl);
  // }
  // const pathWithoutLocale = locale
  //   ? pathname.slice(locale.length + 1)
  //   : pathname;
  // const allowedPaths = roleAccessMap[user_type] || [];
  // if (!isAuthorizedPath(pathWithoutLocale, allowedPaths)) {
  //   return NextResponse.redirect(
  //     new URL(`/${locale || "en"}/error/unauthorized`, request.url)
  //   );
  // }
  const handleI18nRouting = createMiddleware({
    locales: ["en", "ar"],
    defaultLocale: "ar",
  });

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
