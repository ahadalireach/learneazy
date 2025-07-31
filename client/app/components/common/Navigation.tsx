"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

interface NavigationProps {
  isMobile: boolean;
}

const Navigation: FC<NavigationProps> = ({ isMobile }) => {
  const pathname = usePathname();
  const activeItem = navItemsData.findIndex((item) => item.url === pathname);

  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData.map((item, index) => (
          <Link
            href={item.url}
            key={item.url}
            className={`${
              activeItem === index
                ? "text-blue-500 dark:text-blue-500"
                : "dark:text-white text-black"
            } text-[18px] px-6 font-Poppins font-[400] cursor-pointer hover:text-blue-400 dark:hover:text-blue-500 transition-colors`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link
              href="/"
              className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
            >
              Learneazy
            </Link>
          </div>
          {navItemsData.map((item, index) => (
            <Link
              href={item.url}
              key={item.url}
              className={`${
                activeItem === index
                  ? "text-blue-500"
                  : "dark:text-white text-black"
              } block py-5 text-[18px] px-6 font-Poppins font-[400] cursor-pointer hover:text-blue-400 transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navigation;
