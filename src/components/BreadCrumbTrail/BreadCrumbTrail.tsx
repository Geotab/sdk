import { IconChevronRightSmall } from "@geotab/react-component-library";
import "./breadCrumbTrail.scss";

interface BreadCrumbProps {
    name: string;
    isLastOne: boolean;
}

function BreadCrumb({ name, isLastOne }: BreadCrumbProps): JSX.Element {
    return (
        <div className="breadCrumbContainer__atom">
            <span>{name}</span>
            {isLastOne ? <IconChevronRightSmall className="breadCrumbContainer__chevron" /> : null}
        </div>
    );
}

export default function BreadCrumbTrail(props: { crumbs: string[] }): JSX.Element {
    return (
        <div className="breadCrumbContainer">
            {props.crumbs.map((crumb: string, index: number) => (
                <BreadCrumb name={crumb} isLastOne={index < props.crumbs.length - 1} key={crumb.toLowerCase().replace(/\s/g, "")} />
            ))}
        </div>
    );
}
