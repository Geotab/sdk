import { ReactNode } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import "../../pages/pages.scss";
import InformationalBox from '../../components/InformationalBox/InformationalBox';
import CodeSample from  "../../components/CodeSamplesContainer/CodeSample";
import { IconChevronRightSmall } from "@geotab/react-component-library";
import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";

const Update11: ReactNode = (
	<div className="paragraph" id="11.0">
		<h2>Get And GetFeed For FuelUsed And FillUp</h2>
		<ul>
			<li>
				Get and GetFeed for <a href="">FuelUsed</a> is now available. The query will return fuel consumption for each MyGeotab trip — corresponding to each trip’s ending date and time.
			</li>
			<li>
				Get and GetFeed for <a href="">FillUp</a> is now available. The query will return fill-ups detected by MyGeotab or matching fuel transaction records, if available. Each fill-up will also be matched to a MyGeotab trip — corresponding to the trip’s ending date and time.
			</li>
		</ul>
		<h2>New Transaction Provider</h2>
		<ul>
			<li>
				Car IQ is now available as a <a href="">fuel card provider</a>.
			</li>
		</ul>
		<h2>Added New MessageContentTypes</h2>
		<ul>
			<li>
				<a href="">ColdChainSetpointSetContent</a> and <a href="">ColdChainFaultClearContent</a> have been added.
			</li>
		</ul>
		<h2>New ConditionType Property</h2>
		<ul>
			<li>
				<a href="">isValueThreshold</a> has been added.
			</li>
			
		</ul>
		<h2>New MediaFileSearch Options</h2>
		<ul>
			<li>
				MediaFile entries can now be <a href="">searched</a> by the solutionId property.
			</li>
			<li>
				MediaFile entries can now be searched by using the <a href="">TagSearch</a> object.
			</li>
		</ul>
		<h2>New TextMessageSearch Options</h2>
		<ul>
			<li>
				<a href="">mimeTypes</a> and <a href="">channelNumbers</a> search options have been added
			</li>
		</ul>
		<h2>New Property For DutyStatusAvailabilityPermalink</h2>
		<ul>
			<li>A new property has been added for the <a href="">DutyStatusAvailability</a> object that details the duration of the driving break. Note: This new property is available for USA rulesets only.</li>
		</ul>
		<InformationalBox>
			<p><b>Note</b>: This new property is available for USA rulesets only.</p>
		</InformationalBox>
		<h2>Added TachographDataFile Object</h2>
		<ul>
			<li>
				Added the <a href="">TachographDataFile</a> object that represents a tachograph data file.
			</li>
		</ul>
		<h2>New CaptchaAnswer Properties</h2>
		<ul>
			<li>
				Added the <a href="">greCaptchaToken</a> and <a href="">greCaptchaAction</a> properties when using google enterprise recaptcha.
			</li>
		</ul>
		<h2>PropertySelector Fixes</h2>
		<ul>
			<li>
				Fixed the property selector not working without the search object for the following entities:
				<ul>
					<li>
						Trip
					</li>
					<li>
						User
					</li>
					<li>
						Group
					</li>
				</ul>
			</li>
		</ul>
		<h2>Add-In Configuration Updates Via SystemSettings</h2>
		<InformationalBox>
			<p>Add-in updates via the customerPages are <b>no longer supported</b>.</p>
		</InformationalBox>
		<h2>Nuget Package</h2>
		<ul>
			<li>
				A fix has been issued for the nuget package where the name property for stock groups was not returned.
			</li>
		</ul>
	</div>
);

const pageTitle: PageTitleProps = {
	"title": "Release Notes",
	"breadCrumbItems": ["MYG", "Release Notes"]
};

const pageSections: TableOfContentsItem[] = [
	{
		"elementId": "11.0",
		"summary": "11.0",
		"details": Update11
	}
]

export default function WhatsNew () {
    return (
		<Page section={HeaderSections.MyGeotab} pageTitle={pageTitle}>
			<div className="paragraph">
				
			</div>
			{pageSections.map((section) => <Accordion summary={section.summary} p={section.details} />)}
		</Page>
    );
};