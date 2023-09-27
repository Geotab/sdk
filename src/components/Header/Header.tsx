
import React, { useState } from 'react';
import { MenuContext } from '../../menuContext';

export default function Header() {
    const [active, setActive] = useState("myGeotab");

    return (
        <MenuContext.Provider value={active}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                width: "50%",
                margin: "auto"
            }}>
                <div onClick={() => setActive("myGeotab")}>myGeotab</div>
                <div onClick={() => setActive("myAdmin")}>myAdmin</div>
                <div onClick={() => setActive("Drive")}>Drive</div>
                <div onClick={() => setActive("Hardware")}>Hardware</div>
            </div>
        </MenuContext.Provider>
    );
};