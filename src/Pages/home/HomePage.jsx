import { FeatureSection } from "../../feature/home/components/FeatureSection";
import { filterBooks } from "../../feature/home/utilities";
import "./HomePage.css";
import { Marque } from "../../feature/home/components/Marque";
import { Hero } from "../../component/home/Hero";
import { HomeSection } from "../../component/home/HomeSection";

export default function HomePage() {
  const newArrival = filterBooks("none", "tag", "new arrival");
  const top10BestSellers = filterBooks(10, "tag", "bestseller");
  const first14BusinessBooks = filterBooks(
    14,
    "genre",
    "business & leadership",
  );
  const first14BiographyAndMemoirs = filterBooks(
    14,
    "genre",
    "biography",
    "memoir",
  );
  const first14FictionAndStoryTelling = filterBooks(
    14,
    "genre",
    "fiction & storytelling",
  );
  const first14ChildrenAndYoungAdults = filterBooks(
    14,
    "genre",
    "children's book",
    "young adult",
  );

  return (
    <div className="pages-container">
      <Hero />
      <Marque />

      <div className="pages-wrapper-variation">
        <HomeSection
          header={"New Arrivals"}
          array={newArrival}
          layout="slider"
        />

        <HomeSection
          header={"10 Bestsellers"}
          array={top10BestSellers}
          layout="slider"
        />
      </div>

      <FeatureSection />

      <div className="pages-wrapper-variation">
        <HomeSection
          header={"Business & Leadership"}
          array={first14BusinessBooks}
        />
        <HomeSection
          header={"Biography & Memoirs"}
          array={first14BiographyAndMemoirs}
        />
        <HomeSection
          header={"Fiction & StoryTelling"}
          array={first14FictionAndStoryTelling}
        />
        <HomeSection
          header={"Children & Young Adults"}
          array={first14ChildrenAndYoungAdults}
        />
      </div>
    </div>
  );
}
