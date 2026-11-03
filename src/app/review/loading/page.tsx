import type { Metadata } from "next";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Loading State Preview",
  robots: { index: false, follow: false },
};

// Shows the route loading state on its own, since real loads are usually too quick to see
export default function LoadingPreviewPage() {
  return <Loading />;
}
