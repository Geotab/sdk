import React, { createContext, useState, ReactNode } from "react";

interface MenuContextType {
  active: string;
  setActive: (active: string) => void;
}

const MenuContext = createContext<MenuContextType>({
  active: "",
  setActive: () => {},
});

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [active, setActive] = useState<string>("");

  return (
    <MenuContext.Provider value={{ active, setActive }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
