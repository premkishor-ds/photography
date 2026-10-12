import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Studio Management Console",
  description: "Administrative console for booking inquiries, portfolio curation, and studio settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
