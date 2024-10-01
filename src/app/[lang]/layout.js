import dynamic from "next/dynamic";
import { getDictionary } from "../../dictionaries";
import { AppProvider } from "./app-provider";
import "./globals.css";

const Navbar = dynamic(() => import("../components/navbar.js"), { ssr: false });

export const metadata = {
  title: "Authentication",
  description: "Generated by create next app",
};

// export async function generateStaticParams() {
//   return [{ lang: "en" }, { lang: "fa" }];
// }

export default async function RootLayout({ children, params }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang} dir={params.lang === "fa" ? "rtl" : "ltr"}>
      <body>
        <AppProvider dictionary={dictionary}>
          <Navbar lang={params.lang} />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
