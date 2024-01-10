import { IconChevronRightSmall } from "@geotab/react-component-library";
import './pageTitle.scss';

interface BreadCrumbProps {
    name: string;
    isLastOne: boolean;
}

export default function BreadCrumb({ name, isLastOne }: BreadCrumbProps): JSX.Element {
    return (
        <div className="breadCrumbContainer__atom">
            <span>{name}</span>
            {isLastOne ? <IconChevronRightSmall className="breadCrumbContainer__chevron" /> : null}
        </div>
    );
}