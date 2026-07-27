import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Shared chrome for the public marketing + ordering pages.
// Staff POS and admin will live outside this group with their own layouts.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
