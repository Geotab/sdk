import { IconClipboard, IconServer, IconChevronRightSmall } from "@geotab/react-component-library";
import { MatchInfo, SearchResult } from "minisearch";
import { Link } from "react-router-dom";
import { pullText, findHeaderId } from "./utils/searchUtils";
import { HashLink } from "react-router-hash-link";

import "./SearchModal.scss";

//TODO: replace with Joseph's component and add highlighting
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

const highlightMatch = (text: string, matchTerms: MatchInfo): JSX.Element[] => {
    //search can hit on multiple different words so we add all of them to the regex
    //we need to highlight based on matches instead of user input as fuzzy search allows for typos/partial matches
    const expressionString: string = Object.keys(matchTerms).toString().replace(",", "|");
    const regex = new RegExp(`(${expressionString})`, "gi");
    return text.split(regex).map((part, index) =>
        regex.test(part) ?
            (<span className="search-result-match" key={index}>{part}</span>) :
            (<span key={index}>{part}</span>)
    );
};

const buildLink = (path: string, title: string, searchResultID: number, matchTerms: MatchInfo): JSX.Element => {
    let headerId: string | null = findHeaderId(searchResultID, matchTerms);
    return headerId === null ?
        <Link to={path}>{highlightMatch(title, matchTerms)}</Link> :
        <HashLink to={`${path}#${headerId}`}>{highlightMatch(title, matchTerms)}</HashLink>;
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
                                    {buildLink(item.link, item.title, item.id, item.match)}
                                </span>
                                <div className="result-item-group">
                                    {makeBreadCrumb(item.breadCrumb)}
                                </div>
                                <div>{highlightMatch(pullText(item.id, item.terms[0]), item.match)}</div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );

}