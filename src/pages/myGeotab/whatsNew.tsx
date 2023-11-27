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

const Update10: ReactNode = (
	<div className="paragraph" id="10.0">
		<h2>SDK Updates</h2>
		<h3>API Runner (SDK)</h3>
		<p>The following improvements are added:</p>
		<ul>
			<li>
				Added loading spinner to indicate to users that the login request is being processed.
			</li>
			<li>
				Added a keypress handler for the login form that allows the cursor to move to the next field, and added functionality for an enter key press event to submit the form when inputting information in the last field.
			</li>
			<li>
				Fixed an error message occurring in the main .js:scrollSidebar.
			</li>
			<li>
				Fixed an issue that caused multiple click handlers to be added to the login button.
			</li>
		</ul>
		<h2>SecurityIdentifier</h2>
		<ul>
			<li>
				Added the ImpersonateGpsTextMessage security identifier. When enabled, the security identifier does not validate the identity of the sender.
			</li>
			<li>
				Added the ResetPassword security identifier that allows a user to reset another user’s passwords.
			</li>
		</ul>
		<h2>Mg-Api-Js</h2>
		<p>We've corrected the following errors:</p>
		<ul>
			<li>
				Fixed UnhandledRejection exceptions.
			</li>
			<li>
				Improved exception messages to include the type from the JSON-RPC error.
			</li>
			<li>
				Fixed InvalidUserException retry authentication.
			</li>
			<li>
				Updated CallBackError to be invoked as the last operation in the promise field.
			</li>
		</ul>
		<h2>GetFeed{'<'}FuelTaxDetail{'>'}</h2>
		<ul>
			<li>
				Fixed issues with results sorting that led to missing results.
			</li>
		</ul>
		<h2>Nuget</h2>
		<ul>
			<li>
				Enabled brotli compression in Nuget package API.cs requests.
			</li>
			<li>
				<s>Many ObjectModel classes are marked as “sealed”. Marking a class as “sealed” prevents tampering of important classes that can compromise security or impact performance.</s>
			</li>
		</ul>
		<InformationalBox>
			<p><b>!IMPORTANT:</b> Updating your application to version 10.0 may not work if an ObjectModel class is inherited.</p>
		</InformationalBox>
		<h2>TextMessage</h2>
		<ul>
			<li>
				Added PropertySelector (Beta) support for the TextMessage type.
			</li>
		</ul>
		<h2>IoxAddOn</h2>
		<ul>
			<li>
				Added PropertySelector (Beta) support for the IoxAddOn type.
			</li>
		</ul>
		<h2>IoxAddOnStatus</h2>
		<ul>
			<li>Added PropertySelector (Beta) support for the IoxAddOnStatus type.</li>
		</ul>
		<h2>DriverChange</h2>
		<ul>
			<li>
				Updated the description of DriverChange DateTime to notify users that the DateTime must not be in the future when adding a DriverChange through API.
			</li>
		</ul>
		<h2>DriverWhiteListContent</h2>
		<ul>
			<li>
				DriverWhiteListContent is replaced by <b>DriverAuthListContent</b>
			</li>
			<li>
				Prior to the 10.0 release, DriverWhiteListContent and DriverAuthListContent were both available to allow users to adjust to the transition.
			</li>
		</ul>
		<h2>Condition And ConditionType</h2>
		<ul>
			<li>
				Added the Group exception rule condition. This separates conditions in a single rule when different groups require different conditions.
			</li>
		</ul>
		<h2>Geotab Developers</h2>
		<ul>
			<li>
				Added a section to the <a href="https://geotab.github.io/sdk/software/guides/developing-addins/">Developing Add-ins</a> page suggesting to use the generator-addin repository.
			</li>
		</ul>
		<h2>SDK Samples</h2>
		<ul>
			<li>
				Added JavaScript samples to refresh the user interface.
			</li>
		</ul>
		<h2>SDK Add-In Samples</h2>
		<ul>
			<li>Added Add-In samples for the AddInData API to the <a href="https://github.com/Geotab/sdk-addin-samples">Geotab/sdk-addin-samples</a> Github repository.</li>
		</ul>
	</div>
);

const Update9: ReactNode = (
	<div className="paragraph" id="9.0">
		<h2>Custom Security Identifiers For Add-Ins</h2>
		<p>Custom security identifiers for MyGeotab Add-ins are now available. Identifiers can be defined in the configuration.json file of Add-ins, which will then add them to the list of permissions available when editing clearances. These definitions can support multiple languages.</p>
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
	},
	{
		"elementId": "10.0",
		"summary": "10.0",
		"details": Update10
	},
	{
		"elementId": "9.0",
		"summary": "9.0",
		"details": Update9
	}
];

export default function WhatsNew () {
    return (
		<Page section={HeaderSections.MyGeotab} pageTitle={pageTitle}>
			<div className="paragraph">
				
			</div>
			{pageSections.map((section) => <Accordion summary={section.summary} p={section.details} />)}
		</Page>
    );
};