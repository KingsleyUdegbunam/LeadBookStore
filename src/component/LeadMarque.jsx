import "./LeadMarque.css";
export function LeadMarque({ text }) {
  return (
    <div className="slider-text">
      <span>Lead {text}</span>
      <span>✦</span>
    </div>
  );
}
