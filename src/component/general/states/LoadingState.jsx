import "./LoadingState.css";

export const LoadingState = () => {
  return (
    <div className="loading-state" role="status" aria-label="Loading">
      <span className="loading-spinner" />
    </div>
  );
};
