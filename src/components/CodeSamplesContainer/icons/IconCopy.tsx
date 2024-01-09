import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconCopy = React.forwardRef<SVGSVGElement, LogoProps>(({ color = "currentColor", ...props }, forwardedRef) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 3C7 2.44772 7.44772 2 8 2H15C15.2652 2 15.5196 2.10536 15.7071 2.29289L20.7071 7.29289C20.8946 7.48043 21 7.73478 21 8V18C21 18.5523 20.5523 19 20 19H18V21C18 21.5523 17.5523 22 17 22H5C4.44772 22 4 21.5523 4 21V6C4 5.44772 4.44772 5 5 5H7V3ZM7 7H6V20H16V19H8C7.44772 19 7 18.5523 7 18V7ZM19 17V9H15C14.4477 9 14 8.55228 14 8V4H9V17H19ZM16 5.41421L17.5858 7H16V5.41421Z"
                fill={color}
            />
        </svg>
    );
});

IconCopy.displayName = "IconCopy";
