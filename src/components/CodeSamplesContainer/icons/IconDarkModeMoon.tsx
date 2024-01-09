import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconDarkModeMoon = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ color = "currentColor", ...props }, forwardedRef) => {
    return (
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
          d="M12.0969 2.53045C12.2911 2.86497 12.275 3.28147 12.0555 3.59995C11.3897 4.56606 10.9999 5.73602 10.9999 7.00001C10.9999 10.3137 13.6862 13 16.9999 13C18.264 13 19.434 12.6102 20.4001 11.9443C20.7186 11.7248 21.1351 11.7087 21.4696 11.9028C21.8042 12.097 21.9967 12.4667 21.9641 12.8521C21.5302 17.9747 17.2363 21.9963 12.002 21.9963C6.48014 21.9963 2.00383 17.52 2.00383 11.9981C2.00383 6.76396 6.02523 2.47009 11.1477 2.03605C11.5331 2.0034 11.9028 2.19593 12.0969 2.53045ZM9.42386 4.42442C6.27183 5.49703 4.00383 8.4831 4.00383 11.9981C4.00383 16.4154 7.58471 19.9963 12.002 19.9963C15.5171 19.9963 18.5032 17.7281 19.5758 14.576C18.7671 14.8509 17.9005 15 16.9999 15C12.5816 15 8.99992 11.4183 8.99992 7.00001C8.99992 6.09955 9.14901 5.23304 9.42386 4.42442Z"
          fill={color}
        />
      </svg>
    );
  }
);

IconDarkModeMoon.displayName = "IconDarkModeMoon";