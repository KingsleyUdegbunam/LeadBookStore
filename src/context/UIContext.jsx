import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [openAccountDrawer, setOpenAccountDrawer] = useState(false);

  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);

  return (
    <UIContext.Provider
      value={{
        openAccountDrawer,
        setOpenAccountDrawer,
        openSearchDrawer,
        setOpenSearchDrawer,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const UseUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
};
