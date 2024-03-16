"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UpperNavbar from "../upper-navbar";

type Props = {
  orgName: string;
  projectName: string;
};

export default function OrgNavbar({ orgName, projectName }: Props) {
  const pathName = usePathname();
  const baseUrl = `/${orgName}/`;

  const isActive = (pathname: string) => baseUrl + "/" + pathname == pathName;

  const linkStyles = (pathname: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive(pathname) ? "text-red-500" : "text-gray-300 hover:text-white"}`;

  console.log(baseUrl);
  console.log(pathName);
  console.log(baseUrl + "/" + "deployments");
  console.log(isActive("deployments"));

  return (
    <div className="bg-black">
      <UpperNavbar orgName={orgName} projectName={projectName}></UpperNavbar>

      <div className="flex justify-start space-x-4 px-6 py-3">
        <Link href={`/org/${orgName}/projects`} className={linkStyles("")}>
          Projects
        </Link>
        <Link
          href={`/org/${orgName}/monitoring`}
          className={linkStyles("deployments")}
        >
          Monitoring
        </Link>
      </div>
    </div>
  );
}