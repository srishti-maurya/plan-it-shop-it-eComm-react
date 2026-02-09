import {
  HeroSection,
  CollectionSection,
  GenreSection,
  ChoiceSection,
} from "./components";

export function HomePage() {
  return (
    <div className="pb-16">
      <HeroSection />
      <CollectionSection />
      <GenreSection />
      <ChoiceSection />
    </div>
  );
}
