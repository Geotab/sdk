import { IconClipboard, IconServer, IconChevronRightSmall } from "@geotab/react-component-library";
import { SearchResult } from "minisearch";
import { Link } from "react-router-dom";
import { pullText } from "./utils/searchUtils";

import "./SearchModal.scss";

//["MYG", "Guides", "Concepts"]
const makeBreadCrumb = (crumbs: string[]): JSX.Element[] => {
    let elements: JSX.Element[] = [
        <span key="bc-span-0">{crumbs[0]}</span>
    ];
    for (let i: number = 1; i < crumbs.length; i++) {
        elements.push(< IconChevronRightSmall key={`bc-icon-${i}`} />);
        elements.push(<span key={`bc-span-${i}`}>{crumbs[i]}</span>);
    }
    return elements;
};

export default function ResultsList(props: { results: SearchResult[] }): JSX.Element {
    return (
        <div className="custom-styling-for-results">
            <ul className="horizontal-results-list">
                {props.results.map((item) => (
                    <div key={`search-${item.id}`} className="results-item-container">
                        <li >
                            <div className="results-icon-container">
                                {item.category === "guide" ? <IconClipboard /> : <IconServer />}
                            </div>
                            <div className="result-search-name">
                                <span className="result-item-title">
                                    <Link to={item.link}>{item.title}</Link>
                                </span>
                                <div className="result-item-group">
                                    {makeBreadCrumb(item.breadCrumb)}
                                </div>
                                <div>{pullText(item.id, item.terms[0])}</div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );

}