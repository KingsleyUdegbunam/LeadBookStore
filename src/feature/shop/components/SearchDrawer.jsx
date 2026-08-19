import { useEffect, useRef } from "react";
import Drawer from "../../../component/components/Drawer/Drawer";
import { HeaderSearchResult } from "../../header/HeaderSearchResult";

export const SearchDrawer = ({ isOpen, onClose }) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, [isOpen]);

  return (
    <Drawer position="top" isOpen={isOpen} onClose={onClose}>
      <HeaderSearchResult
        isOpen={isOpen}
        searchInputRef={searchInputRef}
        onClose={onClose}
      />
    </Drawer>
  );
};
