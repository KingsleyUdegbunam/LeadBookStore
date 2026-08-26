import { LeadCarousel } from "../LeadCarousel";
import "./MarqueGroup.css";

const MarqueGroup = ({ primary }) => {
  !primary && (
    <div aria-hidden className="marque-group">
      <LeadCarousel text="Me" />
      <LeadCarousel text="Him" />
      <LeadCarousel text="Her" />
      <LeadCarousel text="Them" />
      <LeadCarousel text="Us" />
      <LeadCarousel text="Little Ones" />
      <LeadCarousel text="The Young" />
      <LeadCarousel text="with Money" />
      <LeadCarousel text="the World" />
      <LeadCarousel text="with Legacy" />
      <LeadCarousel text="with Imagination" />
    </div>
  );
  return (
    <div className="marque-group">
      <LeadCarousel text="Me" />
      <LeadCarousel text="Him" />
      <LeadCarousel text="Her" />
      <LeadCarousel text="Them" />
      <LeadCarousel text="Us" />
      <LeadCarousel text="Little Ones" />
      <LeadCarousel text="The Young" />
      <LeadCarousel text="with Money" />
      <LeadCarousel text="the World" />
      <LeadCarousel text="with Legacy" />
      <LeadCarousel text="with Imagination" />
    </div>
  );
};

export default MarqueGroup;
