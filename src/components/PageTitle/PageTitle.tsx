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

export default function PageTitle({ title, breadCrumbItems }: PageTitleProps): JSX.Element {
    return (
        <div className="pageTitle">
            <BreadCrumbTrail crumbs={breadCrumbItems} />
            <h1 className="pageTitle__h1">{title}</h1>
        </div>
    );
}
