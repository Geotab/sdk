import * as React from "react";
import { LogoProps } from "@geotab/react-component-library";

export const IconInformation = React.forwardRef<SVGSVGElement, LogoProps>(
    ({ color = "currentColor", ...props }, forwardedRef) => {
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_24627_2991)">
                    <path d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C15.9953 3.584 12.416 0.00466667 8 0ZM8.16667 3.33333C8.71867 3.33333 9.16667 3.78133 9.16667 4.33333C9.16667 4.88533 8.71867 5.33333 8.16667 5.33333C7.61467 5.33333 7.16667 4.88533 7.16667 4.33333C7.16667 3.78133 7.61467 3.33333 8.16667 3.33333ZM9.66667 12.3333H7C6.632 12.3333 6.33333 12.0347 6.33333 11.6667C6.33333 11.2987 6.632 11 7 11H7.5C7.592 11 7.66667 10.9253 7.66667 10.8333V7.83333C7.66667 7.74133 7.592 7.66667 7.5 7.66667H7C6.632 7.66667 6.33333 7.368 6.33333 7C6.33333 6.632 6.632 6.33333 7 6.33333H7.66667C8.40333 6.33333 9 6.93 9 7.66667V10.8333C9 10.9253 9.07467 11 9.16667 11H9.66667C10.0347 11 10.3333 11.2987 10.3333 11.6667C10.3333 12.0347 10.0347 12.3333 9.66667 12.3333Z" fill="#25477B" />
                </g>
                <defs>
                    <clipPath id="clip0_24627_2991">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        );
    }
);

IconInformation.displayName = "IconInformation";
