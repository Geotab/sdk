import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconStar = React.forwardRef<SVGSVGElement, LogoProps>(({ color = "currentColor", ...props }, forwardedRef) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
            <path
                d="M9.99967 1.6665L12.3971 6.67128L17.9163 7.39599L13.8788 11.2138L14.8924 16.6665L9.99967 14.0213L5.10691 16.6665L6.12051 11.2138L2.08301 7.39599L7.60222 6.67128L9.99967 1.6665Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

IconStar.displayName = "IconStar";
