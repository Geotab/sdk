/* eslint-disable @typescript-eslint/naming-convention */
import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconCodeBox = React.forwardRef<SVGSVGElement, LogoProps>(({ color = "currentColor", ...props }, forwardedRef) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
        <path
            d="M8.33301 7.91683L6.24967 10.0002L8.33301 12.0835M11.6663 7.91683L13.7497 10.0002L11.6663 12.0835M3.33301 3.3335H16.6663V16.6668H3.33301V3.3335Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
));

IconCodeBox.displayName = "IconCodeBox";
