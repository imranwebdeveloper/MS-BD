"use client";

import Link from "next/link";

const AsideLink: React.FC<{
  title: string;
  href: string;
  icon?: JSX.Element;
}> = ({ title, href, icon }): JSX.Element => {
  return (
    <li className="cursor-pointer py-2">
      <Link
        className={`"text-[#5f63f2] " : undefined} flex items-center gap-4 `}
        href={href}
      >
        <span>{icon}</span>
        {title}
      </Link>
    </li>
  );
};

export default AsideLink;
