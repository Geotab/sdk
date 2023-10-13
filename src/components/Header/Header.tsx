
import React, { useState } from 'react';
import { MenuContext } from '../../menuContext';
import { LogoGeotabSDK } from '../Logo/LogoGeotabSDK';

export default function Header(props: any) {
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
                {props.isLandingPage && <LogoGeotabSDK />}
                <div onClick={() => setActive("myGeotab")}>myGeotab</div>
                <div onClick={() => setActive("myAdmin")}>myAdmin</div>
                <div onClick={() => setActive("Drive")}>Drive</div>
                <div onClick={() => setActive("Hardware")}>Hardware</div>
            </div>
        </MenuContext.Provider>
    );
};