import { AboutHeader } from "../../feature/about/AboutHeader";
import { OurStory } from "../../feature/about/OurStory";
import { WeStandFor } from "../../feature/about/WeStandFor";
import { OurCollection } from "../../feature/about/OurCollection";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <>
      <section className="pages-container">
        <AboutHeader />

        <div className="pages-wrapper-variation pages-inline-wrapper pages-wrapper-seperator">
          <OurStory />

          <WeStandFor />
          <OurCollection />
        </div>
      </section>
    </>
  );
}
