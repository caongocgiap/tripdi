import { lazy, Suspense } from "react";
import { BannerSection } from "./sections/BannerSection";
import { AboutMeSection } from "./sections/AboutMeSection";
import { visitedProvinces } from "@/assets/data/VisitedProvinces";
import { Spinner } from "@/components/ui/spinner";

const SummarySection = lazy(() =>
  import("./sections/SummarySection").then((module) => ({
    default: module.SummarySection,
  })),
);
const AlbumSection = lazy(() =>
  import("./sections/AlbumSection").then((module) => ({
    default: module.AlbumSection,
  })),
);
const FuturePlanSection = lazy(() =>
  import("./sections/FuturePlanSection").then((module) => ({
    default: module.FuturePlanSection,
  })),
);
const OutroSection = lazy(() =>
  import("./sections/OutroSection").then((module) => ({
    default: module.OutroSection,
  })),
);

export default function UserPage() {
  return (
    <main className="max-w">
      <BannerSection />
      <AboutMeSection />

      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Spinner className="w-10 h-10" />
          </div>
        }
      >
        <SummarySection visited={visitedProvinces} />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Spinner className="w-10 h-10" />
          </div>
        }
      >
        <FuturePlanSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Spinner className="w-10 h-10" />
          </div>
        }
      >
        <AlbumSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <Spinner className="w-10 h-10" />
          </div>
        }
      >
        <OutroSection />
      </Suspense>
    </main>
  );
}