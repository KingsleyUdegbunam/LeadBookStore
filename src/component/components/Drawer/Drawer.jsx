import "./Drawer.css";
// Drawer.Header = DrawerHeader;
// Drawer.Body = DrawerBody;
// Drawer.Footer = DrawerFooter;

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

// function DrawerHeader({ children }) {
//   return <header className="drawer__header">{children}</header>;
// }

// function DrawerBody({ children }) {
//   return <div className="drawer__body">{children}</div>;
// }

// function DrawerFooter({ children }) {
//   return <footer className="drawer__footer">{children}</footer>;
// }

export default Drawer;
