import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [openAccountDrawer, setOpenAccountDrawer] = useState(false);

  return (
    <UIContext.Provider value={{ openAccountDrawer, setOpenAccountDrawer }}>
      {children}
    </UIContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
};
