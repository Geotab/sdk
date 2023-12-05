import React, { createContext, useState, ReactNode } from "react";

interface CodeSampleLightDarkModeContextType {
    lightMode: boolean;
    setLightMode: (lightMode: boolean) => void;
}

const CodeSampleLightDarkModeContext = createContext<CodeSampleLightDarkModeContextType>({
    lightMode: false,
    setLightMode: () => { },
});

interface CodeSampleLightDarkModeProviderProps {
    children: ReactNode;
}

export const CodeSampleLightDarkModeProvider: React.FC<CodeSampleLightDarkModeProviderProps> = ({ children }) => {
    const [lightMode, setLightMode] = useState<boolean>(false);

    return (
        <CodeSampleLightDarkModeContext.Provider value={{ lightMode, setLightMode }}>
            {children}
        </CodeSampleLightDarkModeContext.Provider>
    );
};

export default CodeSampleLightDarkModeContext;