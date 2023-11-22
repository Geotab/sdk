import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const FooterDivider = React.forwardRef<SVGSVGElement, LogoProps>(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="16"
      viewBox="0 0 2 16"
      fill="none"
    >
      <path d="M1 0V16" stroke="#D8DEE9" />
    </svg>
  );
});

FooterDivider.displayName = "FooterDivider";
