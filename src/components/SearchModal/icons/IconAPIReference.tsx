import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const APIReferenceIcon = React.forwardRef<SVGSVGElement, LogoProps>(
  () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
      >
        <path
          d="M6.56252 6.12501C10.1869 6.12501 13.125 4.8658 13.125 3.3125C13.125 1.7592 10.1869 0.5 6.56252 0.5C2.93815 0.5 1.42492e-05 1.7592 1.42492e-05 3.3125C1.42492e-05 4.8658 2.93815 6.12501 6.56252 6.12501Z"
          fill="#4E677E"
        />
        <path
          d="M0 5.1875V8.00001C0 9.55335 2.93814 10.8125 6.56251 10.8125C10.1869 10.8125 13.125 9.55335 13.125 8.00001V5.1875C13.125 6.7408 10.1869 8.00001 6.56251 8.00001C2.93814 8.00001 0 6.7408 0 5.1875Z"
          fill="#4E677E"
        />
        <path
          d="M0 9.87501V12.6875C0 14.2409 2.93814 15.5 6.56251 15.5C10.1869 15.5 13.125 14.2409 13.125 12.6875V9.87501C13.125 11.4284 10.1869 12.6875 6.56251 12.6875C2.93814 12.6875 0 11.4284 0 9.87501Z"
          fill="#4E677E"
        />
      </svg>
    );
  }
);

APIReferenceIcon.displayName = "APIReferenceIcon";
