import { Nav } from "../../index";

import {
  SectionHero,
  SectionCollection,
  SectionGenre,
  SectionChoice,
} from "./components";

export function Home() {
  return (
    <div className="home">
      <Nav />
      <SectionHero />
      <SectionCollection />
      <SectionGenre />
      <SectionChoice />
    </div>
  );
}
