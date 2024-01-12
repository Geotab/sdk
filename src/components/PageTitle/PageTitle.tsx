import BreadCrumbTrail from "../BreadCrumbTrail/BreadCrumbTrail";
import "./pageTitle.scss";

export interface PageTitleProps {
    title: string;
    breadCrumbItems: string[];
}

interface BreadCrumbProps {
    name: string;
    isLastOne: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function BreadCrumb({ name, isLastOne }: BreadCrumbProps): JSX.Element {
    return (
        <div className="breadCrumbContainer__atom">
            <span>{name}</span>
            {isLastOne ? <IconChevronRightSmall className="breadCrumbContainer__chevron" /> : null}
        </div>
    );
}

export default function PageTitle({ title, breadCrumbItems }: PageTitleProps): JSX.Element {
    return (
        <div className="pageTitle">
            <BreadCrumbTrail crumbs={breadCrumbItems} />
            <h1 className="pageTitle__h1">{title}</h1>
        </div>
    );
}
