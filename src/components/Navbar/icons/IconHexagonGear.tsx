import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconHexagonGear = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ color = "currentColor", ...props }, forwardedRef) => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path
          d="M9.99967 2.5L16.6664 6.24996V13.75L9.99967 17.4999L3.33301 13.7502L3.33301 6.24993L9.99967 2.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M12.4997 10C12.4997 11.3807 11.3804 12.5 9.9997 12.5C8.61898 12.5 7.4997 11.3807 7.4997 10C7.4997 8.61929 8.61898 7.5 9.9997 7.5C11.3804 7.5 12.4997 8.61929 12.4997 10Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

IconHexagonGear.displayName = "IconHexagonGear";
