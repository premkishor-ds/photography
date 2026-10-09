import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "./JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schema";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", url: "/" }, ...items];
  const breadcrumbSchema = generateBreadcrumbSchema(allItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center flex-wrap gap-2 text-xs font-sans text-[#7B6955]">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={item.url} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 text-[#D7C7B2] shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    className="font-medium text-[#121212] tracking-wide"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-[#121212] transition-colors tracking-wide flex items-center gap-1"
                  >
                    {index === 0 && <Home className="w-3 h-3" aria-hidden="true" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
