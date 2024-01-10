/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconLightModeSun = React.forwardRef<SVGSVGElement, LogoProps>(
    ({ color = "currentColor", ...props }, forwardedRef) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            ref={forwardedRef}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 1V4H11V1H13ZM4.93016 3.51584L7.05437 5.64005L5.64016 7.05427L3.51594 4.93005L4.93016 3.51584ZM20.4841 4.93005L18.3598 7.05427L16.9456 5.64005L19.0698 3.51584L20.4841 4.93005ZM14.8284 9.17157C13.2663 7.60948 10.7337 7.60948 9.17157 9.17157C7.60948 10.7337 7.60948 13.2663 9.17157 14.8284C10.7337 16.3905 13.2663 16.3905 14.8284 14.8284C16.3905 13.2663 16.3905 10.7337 14.8284 9.17157ZM7.75736 7.75736C10.1005 5.41421 13.8995 5.41421 16.2426 7.75736C18.5858 10.1005 18.5858 13.8995 16.2426 16.2426C13.8995 18.5858 10.1005 18.5858 7.75736 16.2426C5.41421 13.8995 5.41421 10.1005 7.75736 7.75736ZM1 11H4V13H1V11ZM20 11H23V13H20V11ZM7.05437 18.36L4.93016 20.4842L3.51594 19.07L5.64016 16.9458L7.05437 18.36ZM18.3598 16.9458L20.4841 19.07L19.0698 20.4842L16.9456 18.36L18.3598 16.9458ZM13 20V23H11V20H13Z"
                fill={color}
            />
        </svg>
    )
);

IconLightModeSun.displayName = "IconLightModeSun";
