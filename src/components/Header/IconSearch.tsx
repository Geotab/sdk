import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconSearch = React.forwardRef<SVGSVGElement, LogoProps>(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 5.86963C7.68629 5.86963 5 8.55592 5 11.8696C5 15.1833 7.68629 17.8696 11 17.8696C14.3137 17.8696 17 15.1833 17 11.8696C17 8.55592 14.3137 5.86963 11 5.86963ZM3 11.8696C3 7.45135 6.58172 3.86963 11 3.86963C15.4183 3.86963 19 7.45135 19 11.8696C19 13.7183 18.3729 15.4206 17.3199 16.7753L20.7071 20.1625C21.0976 20.553 21.0976 21.1862 20.7071 21.5767C20.3166 21.9672 19.6834 21.9672 19.2929 21.5767L15.9056 18.1895C14.551 19.2425 12.8487 19.8696 11 19.8696C6.58172 19.8696 3 16.2879 3 11.8696Z"
        fill="black"
      />
    </svg>
  );
});

IconSearch.displayName = "IconSearch";
