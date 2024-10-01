"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDictionary, useUser } from "@/app/hooks";

const Navbar = ({ lang }) => {
  let router = useRouter();
  let dictionary = useDictionary();
  let pathname = usePathname();
  let navHTML = <></>;

  const handleLogout = () => {
    document.cookie = "token=; path=/; Max-Age=0";
    document.cookie = "userName=; path=/; Max-Age=0";
    // console.log(window.location);

    router.refresh(); //push(window.location.pathname.toString());
  };
  if (useUser())
    navHTML = (
      <>
        <li>
          <Link href={`/dashboard/cartable`}>{dictionary.layout.cartable}</Link>
        </li>
        <li>
          <button onClick={handleLogout}>{dictionary.layout.logout}</button>
        </li>
      </>
    );
  else
    navHTML = (
      <>
        <li>
          <Link href={`/register`}>{dictionary.layout.register}</Link>
        </li>
        <li>
          <Link href={`/login`}>{dictionary.layout.login}</Link>
        </li>
      </>
    );

  return (
    <div className="navbar bg-base-100 absolute inset-x-0 top-0">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          {dictionary.layout.header}
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navHTML}
          <li>
            <details>
              <summary>{dictionary.layout.language}</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <Link href={`/en${pathname.replace(`/${lang}`, "") || ""}`}>
                    {dictionary.layout.english}
                  </Link>
                </li>
                <li>
                  <Link href={`/fa${pathname.replace(`/${lang}`, "") || ""}`}>
                    {dictionary.layout.farsi}
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
