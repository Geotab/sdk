/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useState, ReactNode } from "react";

interface MenuContextType {
    activeSiteSection: string;
    setActiveSiteSection: (activeSiteSection: string) => void;
}

const MenuContext = createContext<MenuContextType>({
    activeSiteSection: "",
    setActiveSiteSection: () => {}
});

interface MenuProviderProps {
    children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
    const [activeSiteSection, setActiveSiteSection] = useState<string>("");

    return <MenuContext.Provider value={{ activeSiteSection, setActiveSiteSection }}>{children}</MenuContext.Provider>;
};

export default MenuContext;
