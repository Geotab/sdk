import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconDocumentWithMagnifyingGlass = React.forwardRef<SVGSVGElement, LogoProps>(({ color = "currentColor", ...props }, forwardedRef) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
            <path
                d="M15.833 9.16667V2.5H3.33301V17.5H8.74967M6.66634 12.5H7.49967M6.66634 5.83333H12.4997M6.66634 9.16667H9.16634M15.9341 16.7677C14.9578 17.744 13.3749 17.744 12.3986 16.7677C11.4223 15.7914 11.4223 14.2085 12.3986 13.2322C13.3749 12.2559 14.9578 12.2559 15.9341 13.2322C16.9104 14.2085 16.9104 15.7914 15.9341 16.7677ZM15.9341 16.7677L17.4997 18.3333"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

IconDocumentWithMagnifyingGlass.displayName = "IconDocumentWithMagnifyingGlass";
