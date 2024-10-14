import { NextResponse } from "next/server";
import { config as config1 } from "dotenv";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["fa", "en"];
let defaultLocale = "fa";

function getLocale(request) {
  if (request.cookies.get("Language")) {
    let lan = request.cookies.get("Language").value;
    return lan;
  }

  let headers = {
    "accept-language":
      request.headers["accept-language"] ||
      "en-US;q=0.8,fa-IR;q=0.9,fa;q=0.7,en;q=0.6",
  };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};

// export const config = {
//   matcher: "/[lang]/dashboard",
// };

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  let user = request.cookies.get("userName")?.value;

  //redirect to login page
  let dashboard = locales.find(
    (locale) =>
      pathname.startsWith(`/${locale}/dashboard/`) ||
      pathname.startsWith(`/dashboard/`)
  );
  if (!user && dashboard)
    return NextResponse.redirect(
      new URL(`/login?path=${pathname}`, request.url)
    );
  // else if(user && dashboard)
  //   checkAuthorization();

  let locale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (locale) {
    let response = NextResponse.next();
    response.cookies.set("Language", locale);
    console.log("1", pathname);
    return response;
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) ||
      pathname === `/${locale}` ||
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next")
  );
  console.log("2", pathname);
  if (pathnameHasLocale) return;

  console.log("3", pathname);
  // Redirect if there is no locale
  locale = getLocale(request);
  // console.log("middleware " + locale);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // console.log(request.nextUrl.pathname);

  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);

  //   if (request.nextUrl.pathname.startsWith("/about")) {
  //     return NextResponse.rewrite(new URL("/about-2", request.url));
  //   }
  //   if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //     return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  //   }
  /*
  console.log("before authenticated");
  if (request.nextUrl.pathname.startsWith("/dashboard", 3)) {
    if (!request.cookies.get("userName")) {
      return NextResponse.redirect(
        new URL(`/${process.env.LANGUAGE}/login`, request.url)
      );
      // return new NextResponse(
      //   JSON.stringify({ success: false, message: "authentication failed" }),
      //   { status: 401, headers: { "content-type": "application/json" } }
      // );
    }
  }
  */
}
