import {
  HeroSection,
  CollectionSection,
  GenreSection,
  ChoiceSection,
  RecentlyViewedSection,
  ContinueBrowsingSection,
} from "./components";

export function HomePage() {
  return (
    <div className="pb-16">
      <HeroSection />
      <RecentlyViewedSection />
      <ContinueBrowsingSection />
      <CollectionSection />
      <GenreSection />
      <ChoiceSection />
    </div>
  );
}
