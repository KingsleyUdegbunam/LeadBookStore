import "./LeadCarousel.css";
export function LeadCarousel({ text }) {
  return (
    <div className="slider-text">
      <span>Lead {text}</span>
      <span>✦</span>
    </div>
  );
}
