import { IconClipboard, IconServer } from "@geotab/react-component-library";
import { MatchInfo, SearchResult } from "minisearch";
import { Link } from "react-router-dom";
import { pullText, findHeaderId } from "./utils/searchUtils";
import { HashLink } from "react-router-hash-link";
import BreadCrumbTrail from "../BreadCrumbTrail/BreadCrumbTrail";

import "./searchModal.scss";

const highlightMatch = (text: string, matchTerms: MatchInfo): JSX.Element[] => {
    //search can hit on multiple different words so we add all of them to the regex
    //we need to highlight based on matches instead of user input as fuzzy search allows for typos/partial matches
    const expressionString: string = Object.keys(matchTerms).toString().replace(",", "|");
    const regex = new RegExp(`(${expressionString})`, "gi");
    return text.split(regex).map((part, index) =>
        regex.test(part) ? (
            <span className="search-result-match" key={index}>
                {part}
            </span>
        ) : (
            <span key={index}>{part}</span>
        )
    );
};

const buildLink = (path: string, title: string, searchResultID: number, matchTerms: MatchInfo): JSX.Element => {
    let headerId: string | null = findHeaderId(searchResultID, matchTerms);
    return headerId === null ? <Link to={path}>{highlightMatch(title, matchTerms)}</Link> : <HashLink to={`${path}#${headerId}`}>{highlightMatch(title, matchTerms)}</HashLink>;
};

export default function ResultsList(props: { results: SearchResult[] }): JSX.Element {
    return (
        <div className="search-results-container">
            <ul>
                {props.results.map((item: SearchResult) => (
                    <li key={`search-${item.id as string}`}>
                        <div className="result-listing-header-container">
                            <div className={item.category === "guide" ? "guide-icon" : ""}>{item.category === "guide" ? <IconClipboard /> : <IconServer />}</div>
                            <div className={item.category === "guide" ? "result-item-title guide-title" : "result-item-title"}>
                                <span>{buildLink(item.link, item.title, item.id, item.match)}</span>
                                <BreadCrumbTrail crumbs={item.breadCrumb} />
                            </div>
                        </div>
                        <div>{highlightMatch(pullText(item.id, item.terms[0]), item.match)}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
