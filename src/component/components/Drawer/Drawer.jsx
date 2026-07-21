import "./Drawer.css";
function Drawer({ isOpen, onClose, position = "right", children }) {
  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? "drawer-backdrop--open" : ""}`}
        onClick={onClose}
      />
      <aside
        className={`drawer ${isOpen ? "drawer--open" : ""} drawer--${position}`}
      >
        {children}
      </aside>
    </>
  );
}

export default Drawer;
