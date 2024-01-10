import BreadCrumb from './BreadCrumb';
import './pageTitle.scss';

export interface PageTitleProps {
    title: string;
    breadCrumbItems: string[];
}

export default function PageTitle({ title, breadCrumbItems }: PageTitleProps) : JSX.Element {
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