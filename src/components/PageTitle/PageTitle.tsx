import { IconChevronRightSmall } from "@geotab/react-component-library";
import './pageTitle.scss';

export interface PageTitleProps {
    title: string;
    breadCrumbItems: string[];
}

interface BreadCrumbProps {
    name: string;
    isLastOne: boolean;
}

function BreadCrumb({ name, isLastOne }: BreadCrumbProps) {
    return (
        <div className="breadCrumbContainer__atom">
            <span>{name}</span>
            {isLastOne ? <IconChevronRightSmall className="breadCrumbContainer__chevron" /> : null}
        </div>
    );
}

export default function PageTitle({ title, breadCrumbItems }: PageTitleProps) {
    return (
        <div className="pageTitle">
            <div className="breadCrumbContainer">
                {
                    breadCrumbItems.map((item, index) => <BreadCrumb name={item} isLastOne={index < breadCrumbItems.length - 1} key={item.toLowerCase().replace(/\s/g, "")} />)
                }
            </div>
            <h1 className="pageTitle__h1">{title}</h1>
        </div>
    );
}