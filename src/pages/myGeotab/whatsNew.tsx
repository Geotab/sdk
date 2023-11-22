import { ReactNode } from 'react';
import Accordian from '../../components/Accordion/Accordion';
import "../../pages/pages.scss";
import InformationalBox from '../../components/InformationalBox/InformationalBox';
import CodeSample from  "../../components/CodeSamplesContainer/CodeSample";
import { IconChevronRightSmall } from "@geotab/react-component-library";

export default function WhatsNew () {
    return (
        <div className="page-container">
            <div className="grayBackground">
				<div className="breadCrumb">
					<span>MYG</span>
					<IconChevronRightSmall></IconChevronRightSmall>
					<span>Release Notes</span>
					<IconChevronRightSmall></IconChevronRightSmall>
				</div>
				<h1>Release Notes</h1>
				{/* <Button variant="primary" onClick={function subscribe() {}})></Button> */}
            </div>
			<div className="paragraph">
				<p>

				</p>
			</div>
        </div>
    );
};