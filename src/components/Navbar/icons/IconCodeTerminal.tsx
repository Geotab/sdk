/* eslint-disable @typescript-eslint/naming-convention */
import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconCodeTerminal = React.forwardRef<SVGSVGElement, LogoProps>(({ color = "currentColor", ...props }, forwardedRef) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
        <path
            d="M6.24967 6.66659L7.70801 8.12492L6.24967 9.58325M9.58301 9.58325H11.2497M3.33301 3.33325H16.6663V16.6666H3.33301V3.33325Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
));

IconCodeTerminal.displayName = "IconCodeTerminal";
