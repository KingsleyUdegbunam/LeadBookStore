import { Link } from "react-router-dom";
import { CollectionCard } from "../../component/about/CollectionCard";
import "./OurCollection.css";

export const OurCollection = () => {
  const STORE_COLLECTION = [
    { title: "Lead Me", link: "/shop?collection=lead+me" },
    { title: "Lead Her", link: "/shop?collection=lead+her" },
    { title: "Lead Him", link: "/shop?collection=lead+him" },
    { title: "Lead Them", link: "/shop?collection=lead+them" },
    { title: "Lead Us", link: "/shop?collection=lead+us" },
    { title: "Lead Little Ones", link: "/shop?collection=lead+little+ones" },
    { title: "Lead The Young", link: "/shop?collection=lead+the+young" },
    { title: "Lead With Money", link: "/shop?collection=lead+with+money" },
    { title: "Lead The World", link: "/shop?collection=lead+the+world" },
    { title: "Lead With Legacy", link: "/shop?collection=lead+with+legacy" },
    {
      title: "Lead With Imagination",
      link: "/shop?collection=lead+with+imagination",
    },
  ];

  return (
    <section className="about-sections about-subheader desktop-about-contact-grid">
      <div className="our-story-subcontent-1">
        <h2 className="about-header color-brand ">Our collections</h2>
        <p className="about-body-text">
          Leadership looks different for everyone. We've built collections
          around different journeys—not different people.
        </p>
      </div>
      <div className="collections-wrapper">
        {STORE_COLLECTION.map((col, index) => (
          <Link key={index} to={col.link}>
            <CollectionCard collection={col.title} />
          </Link>
        ))}
      </div>
    </section>
  );
};
