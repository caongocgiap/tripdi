import { lazy, Suspense } from "react";
import { BannerSection } from "./sections/BannerSection";
import { AboutMeSection } from "./sections/AboutMeSection";
import { visitedProvinces } from "@/assets/data/VisitedProvinces";
import { Spinner } from "@/components/ui/spinner";

const SummarySection = lazy(() => import("./sections/SummarySection").then(module => ({ default: module.SummarySection })));
const MyTripSection = lazy(() => import("./sections/MyTripSection").then(module => ({ default: module.MyTripSection })));

export default function UserPage() {
  return (
    <main className="max-w">
      <BannerSection
        title="Chuyến đi của tớ"
        subtitle="Lưu lại từng khoảnh khắc trên mỗi lần tớ được đi"
      />
      <AboutMeSection />

      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Spinner className="w-10 h-10" /></div>}>
        <SummarySection visited={visitedProvinces} />
      </Suspense>

      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Spinner className="w-10 h-10" /></div>}>
        <MyTripSection />
      </Suspense>
    </main>
  );
}