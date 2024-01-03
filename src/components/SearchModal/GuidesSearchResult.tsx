import SearchNotFound from "./SearchNotFound";
import SearchPrompt from "./SearchPrompt";
import "./SearchModal.scss";

interface TabContent {
  inputValue: string;
  tab: string;
}

const GuidesSearchResult = (props: TabContent) => {
  return (
    <div className="tab-container">
      <div className="tab-content">
        {props.inputValue === "" ? (<SearchPrompt />) : (<SearchNotFound searchString={props.inputValue} />)}
      </div>
    </div>
  );
};

export default GuidesSearchResult;
