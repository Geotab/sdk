import { IconClipboard, IconServer } from "@geotab/react-component-library";
import { SearchResult } from "minisearch";
import "./SearchModal.scss";

export default function ResultsList(props: { results: SearchResult[] }): JSX.Element {
    return (
        <div className="custom-styling-for-results">
            <ul className="horizontal-results-list">
                {props.results.map((item) => (
                    <div key={item.id} className="results-item-container">
                        <li>
                            <div className="results-icon-container">
                                {item.category === "guide" ? <IconClipboard /> : <IconServer />}
                            </div>
                            <div className="result-search-name">
                                <span className="result-item-title">
                                    {item.title}
                                </span>
                                <span className="result-item-group">
                                    Hello
                                </span>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );

}