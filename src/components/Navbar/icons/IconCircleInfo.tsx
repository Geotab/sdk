import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconCircleInfo = React.forwardRef<SVGSVGElement, LogoProps>(({ color = "currentColor", ...props }, forwardedRef) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
            <path
                d="M9.16667 9.16667H10V13.3333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect x="9.33301" y="6" width="1.33333" height="1.33333" rx="0.666667" fill={color} stroke={color} strokeWidth="0.5" />
        </svg>
    );
});

IconCircleInfo.displayName = "IconCircleInfo";
