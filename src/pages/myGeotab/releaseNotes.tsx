import { ReactNode } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import "../../pages/pages.scss";
import InformationalBox from '../../components/InformationalBox/InformationalBox';
import CodeSample from  "../../components/CodeSamplesContainer/CodeSample";
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Page } from "../../components";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";

//ToDo Update Object Links
//ToDo Update Reference Page Link
const update11: ReactNode = (
	<div className="paragraph">
		<h2>Get and GetFeed for FuelUsed and FillUp</h2>
		<ul>
			<li>
				Get and GetFeed for <HashLink to="/myGeotab/apiReference/objects#FuelUsed">FuelUsed</HashLink> is now available. The query will return fuel consumption for each MyGeotab trip — corresponding to each trip's ending date and time.
			</li>
			<li>
				Get and GetFeed for <HashLink to="/myGeotab/apiReference/objects#FillUp">FillUp</HashLink> is now available. The query will return fill-ups detected by MyGeotab or matching fuel transaction records, if available. Each fill-up will also be matched to a MyGeotab trip — corresponding to the trip's ending date and time.
			</li>
		</ul>
		<h2>New transaction provider</h2>
		<ul>
			<li>
				Car IQ is now available as a <HashLink to="/myGeotab/apiReference/objects#FuelTransactionProvider">fuel card provider</HashLink>.
			</li>
		</ul>
		<h2>Added new MessageContentTypes</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#ColdChainSetpointSetContent">ColdChainSetpointSetContent</HashLink> and <HashLink to="/myGeotab/apiReference/objects#ColdChainFaultClearContent">ColdChainFaultClearContent</HashLink> have been added.
			</li>
		</ul>
		<h2>New ConditionType Property</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#ConditionType">isValueThreshold</HashLink> has been added.
			</li>
			
		</ul>
		<h2>New MediaFileSearch options</h2>
		<ul>
			<li>
				MediaFile entries can now be <HashLink to="/myGeotab/apiReference/objects#MediaFileSeach">searched</HashLink> by the solutionId property.
			</li>
			<li>
				MediaFile entries can now be searched by using the <HashLink to="/myGeotab/apiReference/objects#TagSearch">TagSearch</HashLink> object.
			</li>
		</ul>
		<h2>New TextMessageSearch options</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#TextMessageSearch">mimeTypes</HashLink> and <HashLink to="/myGeotab/apiReference/objects#TextMessageSearch">channelNumbers</HashLink> search options have been added
			</li>
		</ul>
		<h2>New property for DutyStatusAvailability</h2>
		<ul>
			<li>A new property has been added for the <HashLink to="/myGeotab/apiReference/objects#DutyStatusAvailability">DutyStatusAvailability</HashLink> object that details the duration of the driving break. Note: This new property is available for USA rulesets only.</li>
		</ul>
		<InformationalBox>
			<p><b>Note</b>: This new property is available for USA rulesets only.</p>
		</InformationalBox>
		<h2>Added TachographDataFile object</h2>
		<ul>
			<li>
				Added the <HashLink to="/myGeotab/apiReference/objects#TachographDataFile">TachographDataFile</HashLink> object that represents a tachograph data file.
			</li>
		</ul>
		<h2>New CaptchaAnswer properties</h2>
		<ul>
			<li>
				Added the <HashLink to="/myGeotab/apiReference/objects#CaptchaAnswer">greCaptchaToken</HashLink> and <HashLink to="/myGeotab/apiReference/objects#CaptchaAnswer">greCaptchaAction</HashLink> properties when using google enterprise recaptcha.
			</li>
		</ul>
		<h2>PropertySelector fixes</h2>
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
		<h2>Add-In configuration updates via SystemSettings</h2>
		<InformationalBox>
			<p>Add-in updates via the customerPages are <b>no longer supported</b>.</p>
		</InformationalBox>
		<h2>Nuget package</h2>
		<ul>
			<li>
				A fix has been issued for the nuget package where the name property for stock groups was not returned.
			</li>
		</ul>
	</div>
);

//ToDo Update Developing Add-Ins Page
const update10: ReactNode = (
	<div className="paragraph">
		<h2>SDK updates</h2>
		<h3>API runner (SDK)</h3>
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
				Added the ResetPassword security identifier that allows a user to reset another user's passwords.
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
				<s>Many ObjectModel classes are marked as "sealed”. Marking a class as "sealed” prevents tampering of important classes that can compromise security or impact performance.</s>
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
		<h2>Condition and ConditionType</h2>
		<ul>
			<li>
				Added the Group exception rule condition. This separates conditions in a single rule when different groups require different conditions.
			</li>
		</ul>
		<h2>Geotab developers</h2>
		<ul>
			<li>
				Added a section to the <Link to="/myGeotab/addIns/developingAddIns">Developing Add-ins</Link> page suggesting to use the generator-addin repository.
			</li>
		</ul>
		<h2>SDK samples</h2>
		<ul>
			<li>
				Added JavaScript samples to refresh the user interface.
			</li>
		</ul>
		<h2>SDK Add-In samples</h2>
		<ul>
			<li>Added Add-In samples for the AddInData API to the <a href="https://github.com/Geotab/sdk-addin-samples" target="_blank" rel="noopener noreferrer">Geotab/sdk-addin-samples</a> Github repository.</li>
		</ul>
	</div>
);

//ToDo Update Concepts Page Link
const update9: ReactNode = (
	<div className="paragraph">
		<h2>Custom security identifiers for Add-Ins</h2>
		<p>Custom security identifiers for MyGeotab Add-ins are now available. Identifiers can be defined in the configuration.json file of Add-ins, which will then add them to the list of permissions available when editing clearances. These definitions can support multiple languages.</p>
		<p>Administrator clearance will remain non-editable and have all custom clearances enabled by default. All other default/system clearance levels only allow editing of custom security identifiers, while keeping the system defined default identifiers non-editable.</p>
		<p><b>* NOTE</b>: By default, once the <code className="small-code-name">enableViewSecurityId</code> property in the configuration.json for an Add-in is set to True, a View "Add-in name” add-in identifier is created that must be enabled for users to be able to view the Add-in. More granular control needs to be set within the Add-in code for any custom identifiers added to the configuration.json.</p>
		<h2>IP rate limits</h2>
		<ul>
			<li>
				Added new rate limits for API requests for endpoints that do not require authentication. See <a href="https://docs.google.com/document/d/1sUKaOKjVT23qvaCITMseIMqGUhQzlr7xDhq1EjrseYE/edit#heading=h.ygvbrm3xiv4u" target="_blank" rel="noopener noreferrer">this announcement</a> for more information.
			</li>
		</ul>
		<h2>Updates</h2>
		<h3>DatabaseExists</h3>
		<ul>
			<li>
				Removed the DatabaseExists API that was originally used for database registration purposes. If the database name exists, <code className="small-code-sample">CreateDatabase</code> throws a <code className="small-code-sample">RegistrationException</code>.
			</li>
		</ul>
		<h3>RouteSearch</h3>
		<ul>
			<li>
				Removed the <code className="small-code-sample">RouteSearchGroups</code> property and replaced it with the <code className="small-code-sample">ServiceGroups</code> property.
			</li>
		</ul>
		<h3>PropertySelector</h3>
		<ul>
			<li>
				Added the optional  <code className="small-code-sample">PropertySelector</code> parameter that is used with the <code className="small-code-sample">Get</code> and <code className="small-code-sample">GetFeed</code> methods to include or exclude specific properties for entity types requested. Detailed information can be found on the <HashLink to="/myGeotab/guides/concepts#property-selctor">Geotab Developers</HashLink> site.
			</li>
		</ul>
		<h3>DriverWhiteListContent / DriverAuthListContent</h3>
		<ul>
			<li>
				Removed the <code className="small-code-sample">DriverWhiteListContent</code> object and replaced it with the <code className="small-code-sample">DriverAuthListContent</code> object.
			</li>
		</ul>
		<h3>Group</h3>
		<ul>
			<li>
				Improved system group objects to be returned with an English Name field.
			</li>
		</ul>
		<h3>DeviceShareStatus</h3>
		<ul>
			<li>
				Added <code className="small-code-sample">RequestPending</code> as an acceptable value of <code className="small-code-sample">DeviceShareStatus</code>. This value indicates when an outgoing device share request has been created by a user on the source database, and is waiting for confirmation it has been created successfully.
			</li>
		</ul>
		<h3>SecurityIdentifier</h3>
		<ul>
			<li>
				Added the following security identifiers:
				<ul>
					<li>
						<code className="small-code-sample">ResetPassword</code>
					</li>
					<li>
						<code className="small-code-sample">EditStockRules</code>
					</li>
					<li>
						<code className="small-code-sample">ContinuousConnectClearance</code>
					</li>
					<li>
						<code className="small-code-sample">ViewShipments</code>
					</li>
					<li>
						<code className="small-code-sample">ManageShipments</code>
					</li>
					<li>
						<code className="small-code-sample">ManageTachographInspection</code>
					</li>
					<li>
						<code className="small-code-sample">ViewTachographInspection</code>
					</li>
					<li>
						<code className="small-code-sample">ManageTachographCompanyCards</code>
					</li>
					<li>
						<code className="small-code-sample">ViewTachographCompanyCards</code>
					</li>
					<li>
						<code className="small-code-sample">TachographDownloadAndUploadFiles</code>
					</li>
					<li>
						<code className="small-code-sample">ViewTachographRemoteDownloadData</code>
					</li>
					<li>
						<code className="small-code-sample">ViewTachographDrivingTimeData</code>
					</li>
					<li>
						<code className="small-code-sample">ViewTachographInfringementData</code>
					</li>
					<li>
						<code className="small-code-sample">SendColdChainCommand</code>
					</li>
				</ul>
			</li>
		</ul>
	</div>
);

//ToDo Update Reference Page Link
const update8: ReactNode = (
	<div className="paragraph">
		<h2>Special note about Trailer and Device</h2>
		<p>We have migrated all Trailers to be Devices in all customer databases. As a result, you will see the following changes:</p>
		<ul>
			<li>
				<code className="small-code-sample">GroupAssetTypeId</code>, <code className="small-code-sample">GroupTrailerId</code>, and <code className="small-code-sample">GroupVehicleId</code> built-in groups are added under CompanyGroup.
			</li>
			<li>
				A <code className="small-code-sample">GroupVehicleId</code> built-in group is added to all Devices.
			</li>
			<li>
				Calling Add Trailer and Add Device with the <code className="small-code-sample">GroupTrailerId</code> built-in group now performs the same action. Both create a Device in the system that is in the <code className="small-code-sample">GroupTrailerId</code> group.
			</li>
			<li>
				Trailer APIs have been marked as obsolete but will continue to be supported (for now).
			</li>
			<li>
				Calling Get Device now returns devices that are in the <code className="small-code-sample">xGroupTrailerId</code> built-in group as part of the response.
			</li>
			<li>
				If the Customer wants only vehicles to be returned when calling Get Device, and not trailers, they should specify groupSearch: <code className="small-code-sample">{'{"id”:”GroupVehicleId”}'}</code>.
			</li>
			<li>
				Calling Add Trailer with the <code className="small-code-sample">GroupTrailerId</code> or <code className="small-code-sample">GroupVehicleId</code> built-in groups will throw an error.
			</li>
		</ul>
		<InformationalBox>
			<p><b>! IMPORTANT</b>: Calling Set Device and removing the <code className="small-code-sample">GroupVehicleId</code> or <code className="small-code-sample">GroupTrailerId</code> built-in groups will prevent the vehicle or trailer from being shown on the relevant selection screens on the Drive App. Calling Set Device and switching the group from <code className="small-code-sample">GroupTrailerId</code> built-in group to <code className="small-code-sample">GroupVehicleId</code> built-in group or vice versa will not be allowed. This is a temporary restriction in the 8.0 release, and we intend to remove this check in a future release.</p>
		</InformationalBox>
		<p>See <a href="https://docs.google.com/presentation/d/1C0CBY4qaJKHx3J-fdB-YZzxbilQoleqjv8WsyFIZhEE/edit#slide=id.gdb284aa95f_0_61" target="_blank" rel="noopener noreferrer">this slide deck</a> to understand more about why this change was made, and how this may impact you.</p>
		<h2>Special note about EV powertrain groups</h2>
		<p>This new built-in group structure automatically classifies electric vehicles (EV) based on their unique powertrain types: Plug-in Hybrid (PHEV), Battery Electric Vehicle (BEV), or Fuel Cell Electric Vehicle (FCEV). <a href="https://docs.google.com/document/d/1W9_Y1XukkaRKQDfJ-RH2YsUptSkUPazx_E4UjfOcKoU/edit" target="_blank" rel="noopener noreferrer">See MyGeotab Version 8.0 SDK Announcement - New built-in groups for EV powertrain identification for additional details.</a></p>
		<h2>Updates</h2>
		<h3>AddInData</h3>
		<ul>
			<li>
				Removed the obsolete alpha <code className="small-code-sample">Data</code> property.
			</li>
		</ul>
		<h3>Audit</h3>
		<ul>
			<li>
				Fix: The Audit API is inconsistent in what it returns. Most ways of getting audit (Get - from ID or search, GetFeed) do not return a populated User property. However, the GetAll (Get with no search) returns records with the user fully populated. This is not consistent with the API philosophy. A nested entity will only have its ID populated. User will now never be returned in the Audit object (only userName).
			</li>
		</ul>
		<h3>Device</h3>
		<ul>
			<li>
				Fix: Searching for <code className="small-code-sample">CustomDevice</code> type could also return <code className="small-code-sample">CustomVehicleDevice</code> devices in some cases. It has been fixed to return only devices of <code className="small-code-sample">CustomDevice</code> type.
			</li>
		</ul>
		<h3>DutyStatusAvailability</h3>
		<ul>
			<li>
				Added <code className="small-code-sample">IsAdverseDrivingApplied</code> and <code className="small-code-sample">IsRailroadExemptionAvailable</code>.
			</li>
		</ul>
		<h3>DutyStatusLogType</h3>
		<ul>
			<li>
				Added <code className="small-code-sample">RailroadExemption</code>.
			</li>
		</ul>
		<h3>DVIRLog</h3>
		<ul>
			<li>
				<code className="small-code-sample">RepairStatus</code> / <code className="small-code-sample">RepairUser</code> / <code className="small-code-sample">RepairDate</code> cannot be changed once set. A repair cannot be completed without the <code className="small-code-sample">RepairUser</code>, <code className="small-code-sample">RepairDate</code>, and <code className="small-code-sample">RepairStatus</code>.
			</li>
		</ul>
		<h3>GroupRelations</h3>
		<ul>
			<li>
				Improved description of <code className="small-code-sample">GroupRelations</code> in <Link to="/myGeotab/apiReference">API Reference</Link>.
			</li>
		</ul>
		<h3>Group</h3>
		<ul>
			<li>
				Added the following system groups:
				<ul>
					<li>
						<code className="small-code-sample">GroupAssetTypeId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupVehicleId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupTrailerId</code>
					</li>
					<li>
						<code className="small-code-sample">PowertrainAndFuelTypeId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupElectricHybridPluginId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupBatteryElectricVehicleId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupPluginHybridElectricVehicleId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupFuelCellElectricVehicleId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupInternalCombustionEngineId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupBiodieselId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupCompressedNaturalGasId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupDieselId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupEthanolId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupGasolinePetrolId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupLiquifiedNaturalGasId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupPropaneLiquifiedPetroleumGasId</code>
					</li>
					<li>
						<code className="small-code-sample">GroupManuallyClassifiedPowertrainId</code>
					</li>
				</ul>
			</li>
		</ul>
		<h3>HosRuleSet</h3>
		<ul>	
			<li>
				Added <code className="small-code-sample">America7DayRailroad</code> and <code className="small-code-sample">America8DayRailroad</code>.
			</li>
		</ul>
		<h3>KnownIoxAddOnTypes</h3>
		<ul>
			<li>
				Added <code className="small-code-sample">NFC</code>, <code className="small-code-sample">Bluetooth</code>, and <code className="small-code-sample">UReader</code> add-on types.
			</li>
		</ul>
		<h3>Nuget package</h3>
		<ul>
			<li>
				Nuget package uses <code className="small-code-sample">HttpClient.VersionPolicy</code> <code className="small-code-sample">RequestVersionOrHigher</code>. Allowing client to use HTTP/2 and above. HttpClient default is HTTP/1.1.
			</li>
		</ul>
		<h3>SecurityIdentifier</h3>
		<ul>
			<li>
				Added <code className="small-code-sample">EVBatteryHealthReport</code>.
			</li>
		</ul>
		<h3>Trailer</h3>
		<ul>
			<li>
				Marked obsolete, but can still be used for this release.
			</li>
		</ul>
		<h3>TrailerAttachment</h3>
		<ul>
			<li>
				Marked obsolete, but can still be used for this release.
			</li>
		</ul>
		<h3>User</h3>
		<ul>
			<li>
				Added <code className="small-code-sample">IsAdverseDrivingEnabled</code>.
			</li>
		</ul>
		<h3>Zone</h3>
		<ul>
			<li>
				When adding and setting zones, points are validated to be latitude and longitude bounds. Valid Latitude -90 to 90. Valid Longitude -180 to 180.
			</li>
		</ul>
		<h3>ZoneSearch</h3>
		<ul>
			<li>
				<code className="small-code-sample">Viewport</code> property which was made obsolete in v5.7.2004 will be <b>removed and no longer supported in v9.0</b>. Please switch your application to use <code className="small-code-sample">searchArea</code> and <code className="small-code-sample">BoundingBox</code> objects as soon as possible.
			</li>
		</ul>
	</div>
);

const update7: ReactNode = (
	<div className="paragraph">
		<h2>Security updates</h2>
		<p>In an effort to increase application and API security, exception types that expose database provider or platform-specific error messages have been removed and are now represented as one of the exceptions below. Most exceptions and error messages have not changed. Exception types that were previously documented remain unchanged; however, some new exception types include non-specific, generalized messages to avoid sharing information about the underlying infrastructure. The following common exceptions are still supported.</p>
		<ul>
			<li>
				<code className="small-code-sample">ArgumentException</code>
			</li>
			<li>
				<code className="small-code-sample">ArgumentNullException</code>
			</li>
			<li>
				<code className="small-code-sample">ArgumentOutOfRangeException</code>
			</li>
			<li>
				<code className="small-code-sample">CaptchaException</code>
			</li>
			<li>
				<code className="small-code-sample">DatabaseMaintenanceException</code>
			</li>
			<li>
				<code className="small-code-sample">DbUnavailableException</code>
			</li>
			<li>
				<code className="small-code-sample">DuplicateException</code>
			</li>
			<li>
				<code className="small-code-sample">ExpiredPasswordException</code>
			</li>
			<li>
				<code className="small-code-sample">GenericException</code> <i>new</i>
			</li>
			<li>
				<code className="small-code-sample">GroupRelationViolatedException</code>
			</li>
			<li>
				<code className="small-code-sample">InvalidApiOperationException</code> <i>new</i> (formerly <code className="small-code-sample">InvalidOperationException</code>)
			</li>
			<li>
				<code className="small-code-sample">InvalidCastException</code>
			</li>
			<li>
				<code className="small-code-sample">InvalidMyAdminUserException</code>
			</li>
			<li>
				<code className="small-code-sample">InvalidPermissionsException</code>
			</li>
			<li>
				<code className="small-code-sample">InvalidUserException</code>
			</li>
			<li>
				<code className="small-code-sample">JsonSerializerException</code>
			</li>
			<li>
				<code className="small-code-sample">MissingMemberException</code>
			</li>
			<li>
				<code className="small-code-sample">MissingMethodException</code>
			</li>
			<li>
				<code className="small-code-sample">PasswordPolicyViolationException</code>
			</li>
		</ul>
		<h2>Password policies</h2>
		<ul>
			<li>
				User passwords will now be validated against a list of common passwords. If it is a common password, a <code className="small-code-sample">PasswordPolicyViolationException</code> is returned.
			</li>
			<li>
				User passwords will now be validated against username, first name, and last name. If it contains a username, first name, last name, a <code className="small-code-sample">PasswordPolicyViolationException</code> is returned. This method can no longer be disabled.
			</li>
		</ul>
		<h2>User policies</h2>
		<ul>
			<li>
				The maximum number of active sessions for a user on a single database has been lowered to 100. Active sessions are a rolling list sorted by date and time. When the number of active sessions reaches 100, a new session is added, and the oldest session is removed from the list (expired).
			</li>
		</ul>
		<h2>General updates</h2>
		<ul>
			<li>
				Added <code className="small-code-sample">ModifyGroupFilter</code> and <code className="small-code-sample">ViewGroupFilter</code> to <code className="small-code-sample">SecurityIdentifier</code>.
			</li>
			<li>
				Added <code className="small-code-sample">CaliforniaPropertyShortHaulWithRest</code>, <code className="small-code-sample">CanadaOil</code>, <code className="small-code-sample">CanadaNorthOf60Oil</code>, <code className="small-code-sample">CanadaOilTeam</code>, and <code className="small-code-sample">CanadaNorthOf60OilTeam</code> properties.
			</li>
			<li>
				Added support for fuel transaction provider, <code className="small-code-sample">WexCanada</code>.
			</li>
			<li>
				Minor bug fixes and package updates.
			</li>
		</ul>
		<h2>Coming soon</h2>
		<ul>
			<li>
				The <code className="small-code-sample">AddInData</code> legacy property <code className="small-code-sample">Data</code> will be removed in the coming 9.0 release. Please update your integration requests to use the <code className="small-code-sample">Details</code> property instead
			</li>
			<li>
				JSONP support will be removed from the API in the coming 8.0 release, and should no longer be used.
			</li>
		</ul>
	</div>
);

//ToDo Update Object Links
//ToDo Update Introduction Page Link
const update6: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				Changed the software version naming convention to use three parts (e.g. 6.0.0) from four parts (e.g. 5.7.2104.0). To learn more, <a href="https://community.geotab.com/s/feed/0D52J00008j4IghSAE?language=en_US" target="_blank" rel="noopener noreferrer">click here</a>.
			</li>
			<li>
				Added <Link to="/myGeotab/apiReference/objects/WifiHotspot">WifiHotspot</Link> capability, with Interface to configure hotspot settings on telematics devices.
			</li>
			<li>
				The MyAdmin SDK is now available from <Link to="/myAdmin/introduction">the SDK</Link>. All pages are in the process of being converted to Markdown format.
			</li>
		</ul>
		<h2>HOS</h2>
		<p>Added <code className="small-code-sample">CanadaNorthOf60CycleOneTeam</code> and <code className="small-code-sample">CanadaNorthOf60CycleTwoTeam</code> to the rulesets.</p>
		<h2>Limits</h2>
		<p>Increased media file size limits to 50 MB for video and 10 MB for images.</p>
		<h2>NuGet</h2>
		<ul>
			<li>
				Fixed an issue in which the NuGet package <code className="small-code-sample">API.SessionId</code> property generates an <code className="small-code-sample">InvalidOperationException</code>, if accessed before it is assigned.
			</li>
			<li>
				The MyGeotab NuGet package no longer includes a reference to <code className="small-code-sample">Newtonsoft.json</code>.
			</li>
		</ul>
	</div>
);

const update2104: ReactNode = (
	<div className="paragraph">
		<h2>JSON Serializer change in 5.7.2103</h2>
		<p>Post-release update: it was recently uncovered within our development team that as of MyGeotab release 5.7.2103, the JSON Serializer responsible for parsing API calls has changed to no longer allow single quote (') usage within the call parameters. Integrators should now solely use double quotes (") for this purpose. The expected error result for single quote usage with this change is as follows:</p>
		<CodeSample
		language="javascript"
		code={`{
	"error":{
		"message":"Exception of type 'Geotab.Serialization.JsonSerializerException' was thrown.",
		"code":-32700,
		"data":{
			"id":"5b161301-f931-43e0-ba2a-46d6bb54d898",
			"type":"JsonSerializerException",
			"requestIndex":0
		},
		"name":"JSONRPCError",
		"errors":[
			{
				"message":"Exception of type 'Geotab.Serialization.JsonSerializerException' was thrown.",
				"name":"JsonSerializerException"
			}
		]
	},
	"jsonrpc":"2.0",
	"requestIndex":0
}`
}/>
		<p>The new Serializer logic only accepts property names and string values in double quotes because that format is required by the <a href="https://datatracker.ietf.org/doc/html/rfc8259" target="_blank" rel="noopener noreferrer">RFC8259</a> specification and is the only format considered to be valid JSON.</p>
		<h2>New Stock Groups Available</h2>
		<ul>
			<li>
				GroupDriverActivityGroupId
			</li>
			<li>
				GroupPersonalGroupId
			</li>
			<li>
				GroupBusinessGroupId
			</li>
		</ul>
		<h2>Device</h2>
		<ul>
			<li>
				<code className="small-code-sample">FuelTankCapacity</code> will now throw an <code className="small-code-sample">ArgumentOutOfRangeException</code> if the value is less than 0.
			</li>
			<li>
				The <code className="small-code-sample">DevicePlans</code> property will be removed from the object model in a future version. DevicePlans does not encapsulate billing information, so please use the <code className="small-code-sample">DevicePlanBillingInfo</code> property from this version forward.
			</li>
			<li>
				Added the <code className="small-code-sample">DevicePlanBillingInfo</code> property to replace the <code className="small-code-sample">DevicePlans</code> property. <code className="small-code-sample">DevicePlanBillingInfo</code> contains more billing information than <code className="small-code-sample">DevicePlans</code>.
			</li>
		</ul>
		<h2>DeviceStatusInfoSearch</h2>
		<p>Fixed a bug that omitted the <code className="small-code-sample">closestAssetLimit</code> property when applying <code className="small-code-sample">closestAssetLimit</code> and <code className="small-code-sample">resultsLimit</code> together.</p>
		<h2>UserHosRuleSetSearch</h2>
		<p>Fixed bug that applied the wrong date when searching for <code className="small-code-sample">UserHosRuleSet</code> using both <code className="small-code-sample">fromDate</code> and <code className="small-code-sample">userSearch.fromDate</code>.</p>
		<h2>FuelTransaction</h2>
		<p>Added the <code className="small-code-sample">ProviderProductDescription</code> property. This property requests the non-generic product description as described by the fuel card provider.</p>
		<h2>DutyStatusViolationType</h2>
		<p>Added <code className="small-code-sample">EwdRest</code>, <code className="small-code-sample">EwdWork</code>, and <code className="small-code-sample">EwdWorkExemption</code>.</p>
		<h2>Errors</h2>
		<p>Removed provider-specific details from exception messages when a relation violation exception occurs. The exception types returned have not changed.</p>
		<h2>Defect</h2>
		<p>Added <code className="small-code-sample">IsHidden</code> and <code className="small-code-sample">IsRequired</code> properties.</p>
		<ul>
			<li>
				<code className="small-code-sample">IsHidden</code> is a boolean value indicating whether a defect is hidden in the UI. Used to determine if "other” should be shown or not.
			</li>
			<li>
				<code className="small-code-sample">IsRequired</code> is a boolean value indicating whether a defect must be signed off. Used to determine if the part must be explicitly marked as having defect(s) or not.
			</li>
		</ul>
	</div>
);

const update2103: ReactNode = (
	<div className="paragraph">
		<h2>JSON Serializer change</h2>
		<p>The JSON Serializer responsible for parsing API calls has changed to no longer allow single quote (') usage within the call parameters. Integrators should now solely use double quotes (") for this purpose. The expected error result for single quote usage with this change is as follows:</p>
		<CodeSample
		language="javascript"
		code={`{
	"error":{
		"message":"Exception of type 'Geotab.Serialization.JsonSerializerException' was thrown.",
		"code":-32700,
		"data":{
			"id":"5b161301-f931-43e0-ba2a-46d6bb54d898",
			"type":"JsonSerializerException",
			"requestIndex":0
		},
		"name":"JSONRPCError",
		"errors":[
			{
				"message":"Exception of type 'Geotab.Serialization.JsonSerializerException' was thrown.",
				"name":"JsonSerializerException"
			}
		]
	},
	"jsonrpc":"2.0",
	"requestIndex":0
}`
}/>
		<p>The new Serializer logic only accepts property names and string values in double quotes because that format is required by the <a href="https://datatracker.ietf.org/doc/html/rfc8259" target="_blank" rel="noopener noreferrer">RFC8259</a> specification and is the only format considered to be valid JSON.</p>
		<h2>Add/Set FuelTransactionPermalink</h2>
		<p>Fuel transactions must be unique when comparing all fields (excluding sourceData) against existing transactions.</p>
		<h2>CompanyDetails</h2>
		<p>Added <code className="small-code-sample">jurisdiction</code> property.</p>
		<h2>CreateDatabase</h2>
		<p>The CreateDatabase API now requires user-selected jurisdiction. The jurisdiction is the place of residency for Customer data, maintenance hours, and other information (e.g.U.S., EU). This was previously inferred from the selected timezone. To maintain backwards compatibility, timezone can still be used to infer jurisdiction. However, all users are encouraged to provide a jurisdiction as part of the CompanyDetails provided to the CreateDatabase API.</p>
		<h2>CustomVehicleDevice</h2>
		<p>Added <code className="small-code-sample">fuelTankCapacity</code> property.</p>
		<h2>DiagnosticType</h2>
		<p>Added <code className="small-code-sample">LevcFault</code>.</p>
		<h2>Drive Add-In photos</h2>
		<p>A new API was added to Drive add-ins to access the device camera to take a photo or select an exiting photo from the mobile device using <code className="small-code-sample">api.mobile.camera.takePicture()</code>.</p>
		<h2>DriverRegulation</h2>
		<p>Added <code className="small-code-sample">CurrentDutyStatus</code> representing the latest <code className="small-code-sample">DutyStatusLogType</code> affecting availability or violations.</p>
		<h2>DutyStatusViolationType</h2>
		<p>Added <code className="small-code-sample">EwdRest</code>, <code className="small-code-sample">EwdWork</code>, and <code className="small-code-sample">EwdWorkExemption</code> (formerly <code className="small-code-sample">Work</code> and <code className="small-code-sample">WorkExemption</code>).</p>
		<h2>DVIRLogSearch</h2>
		<p>Added <code className="small-code-sample">LogTypes</code> property for searching by list of DVIRLogType.</p>
		<h2>ExceptionEvent</h2>
		<p>Exception events can be deleted when new data arrives from a device that, when evaluated against the same rule conditions, invalidates the previous state of the exception. For example, a speeding exception is generated for a street with a 40mph speed limit beside a highway. As more GPS data arrives, it becomes clear the vehicle is on the highway, not the service road, so the exception is invalidated. This is a problem for users who continuously request ExceptionEvent data because they are unaware when an exception is invalidated, and deleted at a later date. To resolve this issue, two new properties have been added to ExceptionEvent; <code className="small-code-sample">lastModifiedDate</code> and <code className="small-code-sample">state</code>. These properties determine if the exception event is invalidated instead of deleted. This means that when a new GetFeed request is made, the user sees the updated record and can adjust their records accordingly. Invalidated exceptions will no longer be removed immediately.</p>
		<InformationalBox>
			<p>NOTE: Invalidated exceptions will not be returned by default. You must pass the search parameter <code className="small-code-sample">includeInvalidated</code> in the request to Get or GetFeed to return invalidated exception events. The <code className="small-code-sample">state</code> of these exceptions will be <code className="small-code-sample">Invalid</code>.</p>
		</InformationalBox>
		<h2>ExceptionEventSearch</h2>
		<p>Added <code className="small-code-sample">includeInvalidated</code> property.</p>
		<h2>ExceptionEventState</h2>
		<p>New object representing the state of the exception event. Possible states are <code className="small-code-sample">Valid</code> and <code className="small-code-sample">Invalid</code>.</p>
		<h2>Generator Add-In</h2>
		<p><a href="https://github.com/Geotab/generator-addin" target="_blank" rel="noopener noreferrer">Generator-addin</a> updated to mock drive add-in camera API features.</p>
		<h2>Group</h2>
		<p>Group objects in some instances had <code className="small-code-sample">color</code> and <code className="small-code-sample">children</code> properties partially populated when nested in another object (ex device.groups). This is fixed, so they are no longer populated when groups are nested in group linked entities.</p>
		<h2>HosRuleSet</h2>
		<p>Added <code className="small-code-sample">CaliforniaPropertyShortHaul</code> and <code className="small-code-sample">CaliforniaPropertyShortHaulWithRest</code>.</p>
		<h2>Jurisdiction</h2>
		<p>New enumeration representing the Jurisdiction of a database.</p>
		<h2>MediaType</h2>
		<p>Added <code className="small-code-sample">Application</code> media file type. This is to support PDF file types in MediaFiles.</p>
		<h2>RadioDownloader, RadioData And Related Objects Are Removed</h2>
		<p>All Radio Downloader related objects are removed as Geotab deprecates all RF functionality.</p>
		<h2>SecurityIdentifier</h2>
		<p>Added <code className="small-code-sample">ViewDeviceDataPrivacyChangeData</code> and <code className="small-code-sample">EditDeviceDataPrivacyChangeData</code> Added <code className="small-code-sample">ViewSharedDevice</code> Added <code className="small-code-sample">AdministerPropertySet</code>, <code className="small-code-sample">ViewPropertySet</code>, <code className="small-code-sample">AdministerProperty</code>, and <code className="small-code-sample">ViewProperty</code> Added <code className="small-code-sample">ViewActiveInsights</code> Added <code className="small-code-sample">IgnoreHOSLogs</code> Added <code className="small-code-sample">ViewShareableLink</code>, <code className="small-code-sample">CreateShareableLink</code>, and <code className="small-code-sample">DeleteShareableLink</code></p>
		<h2>TripSearch</h2>
		<p>Added <code className="small-code-sample">SearchArea</code> property to allow searching for trips within a rectangular <code className="small-code-sample">BoundingBox</code> geographic area.</p>
	</div>
);

//ToDo Update DIG URL
const update2102: ReactNode = (
	<div className="paragraph">
		<h2>Data Intake Gateway (DIG)</h2>
		<p>DIG is our new platform for integrating custom telematics data into MyGeotab. To learn more, <Link to="/myGeotab/guides/usingCustomTelematicsDevices">click here</Link>.</p>
		<h2>APIv1 JSON Serialization</h2>
		<p>To reduce the duration of process-intensive requests with large JSON payloads, the MyGeotab JSON-RPC API now uses System.Text.Json instead of Newtonsoft.JSON to serialize JSON data sent using the API. This change includes backward compatibility with Newtonsoft.JSON, with the following exception: Numbers with decimals will no longer be serialized using the decimal followed by a zero, if it is a whole number.</p>
		<h2>Nuget package</h2>
		<p>The Nuget package now targets .NET Standard 2.0,.NET Standard 2.1 and .NET 5.0. To improve serialization and deserialization performance, the Geotab.Checkmate.Objectmodel Nuget Package version 5.7.2102 replaced the JSON serialization library from Newtonsoft.JSON, with System.Text.Json.</p>
		<InformationalBox>
			<p>Due to the performance improvement with System.Text.Json, the existing rate limit OverLimitException may be surpassed when calling the GetFeed API in a tight loop.</p>
		</InformationalBox>
		<h2>SDK site</h2>
		<p>SDK site adjusted for AODA compliance.</p>
		<h2>Generator Add-In</h2>
		<p>New Geotab Drive Add-in features start/stop, hook and notifications added to generator-addin.</p>
		<h2>General SDK Updates</h2>
		<h3>DeviceSearch</h3>
		<p>Keywords property expanded to include <code className="small-code-sample">EngineVehicleIdentificationNumber</code>, <code className="small-code-sample">VehicleIdentificationNumber</code> and <code className="small-code-sample">SerialNumber</code> properties.</p>
		<h3>DeviceShare, DeviceShareSearch, DeviceShareType, DeviceShareSearch</h3>
		<p>Beta support for <code className="small-code-sample">DeviceShare</code> functionality added. This object is used for Extendable Services billing purposes.</p>
		<h3>DutyStatusLogType</h3>
		<p>Added <code className="small-code-sample">Work</code>, <code className="small-code-sample">Rest</code>, and <code className="small-code-sample">WorkExemption</code> properties.</p>
		<h3>ExceptionRuleBaseType</h3>
		<p>Route Completion displays the completion status of custom routes and roads to help users maintain compliance with service level agreements. A route is completed based on the rule and conditions set by the user. Route completion exceptions represent servicing activity for a set of previously defined routes, within a service group.</p>
		<p>A new <code className="small-code-sample">RouteCompletion</code> category is used to classify a rule in the Route Completion Report. Route completion rules are returned with unfiltered requests to the <code className="small-code-sample">Get{'<'}Rule{'>'}</code> API, or with the category filter <code className="small-code-sample">UserExceptionRules</code>. They can also be searched by <code className="small-code-sample">RouteCompletion</code>.</p>
		<h3>FaultState</h3>
		<p>Added <code className="small-code-sample">FaultStates</code>. This allows faults to represent more precise and potentially multiple fault states. In the future, FaultState will be deprecated, though still available for backwards compatibility.</p>
		<h3>FaultStateProvider</h3>
		<p>Complements the <code className="small-code-sample">FaultStates</code> property of <code className="small-code-sample">FaultData</code>. Describes the status of a fault.</p>
		<h3>GetFeed</h3>
		<p>To comply with the GetFeed contract and avoid performance loss, fixed a bug that applies both fromDate and fromVersion when both are supplied in the API request. When fromVersion is supplied, fromVersion will be ignored.</p>
		<InformationalBox>
			<p>This fix may return more records when both fromDate and fromVersion are supplied with before the given dateTime is returned.</p>
		</InformationalBox>
		<p>Also, fixed a bug where toVersion is returned as 0, when a search returns no results. Now, when no results are returned, ToVersion is returned as the latest Feed version.</p>
		<h3>HosRuleSet</h3>
		<p>Added <code className="small-code-sample">StandardHoursSoloExemptionHours</code>.</p>
		<h3>RoutePlanItem</h3>
		<p>Added <code className="small-code-sample">PassCount</code>. The expected number of passes through the Zone.</p>
		<h3>RouteSearch</h3>
		<p>Added <code className="small-code-sample">Groups</code> search option to allow searches for Route Completion routes (<code className="small-code-sample">RouteType.Service</code>) that are members of <code className="small-code-sample">GroupSearch</code>(s). Only returns routes that are members of a service group hierarchy.</p>
		<h3>RouteType</h3>
		<p>Added <code className="small-code-sample">Service</code> route type.</p>
		<h3>SecurityIdentifier</h3>
		<p>Added <code className="small-code-sample">RouteCompletionReport</code>.</p>
		<h3>UserSearch</h3>
		<p>Added <code className="small-code-sample">UserSearchType</code> property to address IsDriver search limitation for Driver or Drivers, and Users. UserSearch allows searching for drivers and users, users who are not drivers, and only users who are drivers. <code className="small-code-sample">IsDriver</code> will be deprecated but remain backwards compatible.</p>
		<h3>UserSearchType</h3>
		<p>Added values to the <code className="small-code-sample">UserSearch</code>, <code className="small-code-sample">UserSearchType</code> properties.</p>
	</div>
);

const update2101: ReactNode = (
	<div className="paragraph">
		<h2>Map Add-In</h2>
		<p>Map Add-ins are now fully supported, and no longer in Feature Preview. <Link to="/myGeotab/addIns/mapAddIns">Click here to learn more about Map Add-ins</Link></p>
		<h2>Storage API</h2>
		<p>Storage APIs are now fully supported, and no longer in Feature Preview. <Link to="/myGeotab/addIns/addInStorage">Click here to learn more about Storage APIs</Link></p>
		<h2>General SDK updates</h2>
		<h3>DeviceStatusInfo</h3>
		<p>The dates of GPS, status and fault records are compared and uses the latest recorded data point as the <code className="small-code-sample">DateTime</code>.</p>
		<h3>AddInData</h3>
		<p>The <code className="small-code-sample">Set</code> method will now allow modifying a value with no groups assigned.</p>
		<h3>CreateDatabase</h3>
		<p>Added a rate limit to the <code className="small-code-sample">CreateDatabase</code> method: 15/1m, 100/1h, 800/1d.</p>
		<h3>Device</h3>
		<p>Added support for Untracked Assets. This allows adding devices that do not have a serial number.</p>
		<h3>DutyStatusLog</h3>
		<ul>
			<li>
				Added the <code className="small-code-sample">IsTransitioning</code> property indicating whether an HOS log is in transition after the first driver accepts it.
			</li>
			<li>
				Added the <code className="small-code-sample">IsHidden</code> property.
			</li>
		</ul>
		<h3>DutyStatusLogType</h3>
		<ul>
			<li>
				Added <code className="small-code-sample">CanadaCycleOne</code>, <code className="small-code-sample">CanadaCycleTwo</code>, <code className="small-code-sample">OperatingZoneCanadaSouthOf60</code>, <code className="small-code-sample">OperatingZoneCanadaNorthOf60</code>, <code className="small-code-sample">OperatingZoneAmerica</code> and <code className="small-code-sample">INT_CoDriver</code>.
			</li>
		</ul>
		<h3>DutyStatusViolationSearch</h3>
		<p>The <code className="small-code-sample">DutyStatusViolationSearch</code> method can now search by user company or driver groups.</p>
		<h3>DVIRLog</h3>
		<p>Updated the documentation for Canada-specific fields on DVIRLogs (<code className="small-code-sample">LoadHeight</code>, <code className="small-code-sample">LoadWidth</code>, and <code className="small-code-sample">Odometer</code>) to better describe how they are populated.</p>
		<h3>FaultState</h3>
		<p>Added <code className="small-code-sample">Inactive</code>, <code className="small-code-sample">PendingOff</code>, <code className="small-code-sample">ActiveOff</code>, <code className="small-code-sample">InactiveOff,</code> and <code className="small-code-sample">Cleared</code>.</p>
		<h3>Get:DutyStatusLog</h3>
		<p>Fixed bug getting latest log for all users</p>
		<h3>Get:StatusData</h3>
		<p>Users can now extrapolate the status date for diagnostics using the unit of measure <code className="small-code-sample">None</code> when <code className="small-code-sample">Get</code> is used with search (device, diagnostic, from and to date).</p>
		<h3>GetFeed:DeviceStatusInfo</h3>
		<p>Added <code className="small-code-sample">GetFeed</code> for <code className="small-code-sample">DeviceStatusInfo</code>.</p>
		<h3>MessageContentType</h3>
		<p>Added <code className="small-code-sample">MimeContent</code> to <code className="small-code-sample">MessageContentType</code>.</p>
		<h3>MimeContent</h3>
		<p>Fixed documentation of maximum size.</p>
		<h3>RuleSearch</h3>
		<p>Fixed a bug getting zone stop rules.</p>
		<h3>SDK Runner</h3>
		<p>Fixed a UI bug rendering JSON, causing it to fail on empty object.</p>
		<h3>Sdk-Addin-Samples:Proximity</h3>
		<ul>
			<li>
				Removed ResultsLimit of 1000 for the <code className="small-code-sample">Get{'<'}Device{'>'}</code> request.
			</li>
			<li>
				<code className="small-code-sample">Get{'<'}Device{'>'}</code> request now accepts wildcard searches.
			</li>
			<li>
				Added a Run, Select All and Deselect All button.
			</li>
			<li>
				Updated warning messages if an input is missing or invalid when a user clicks Run.
			</li>
			<li>
				Updated minor UI aesthetics.
			</li>
		</ul>
		<h3>Sdk-Map-Addin-Samples</h3>
		<p>Added a new sample illustrating tooltip which displays the odometer, fuel level, and battery charge level (if applicable) of a vehicle.</p>
		<h3>SecurityIdentifier</h3>
		<p>Added <code className="small-code-sample">ViewDeviceShare</code>, <code className="small-code-sample">ViewDeviceShare</code>, <code className="small-code-sample">InstallRecord</code>, <code className="small-code-sample">ViewDeviceShare</code>, <code className="small-code-sample">ViewDeviceShare</code>, <code className="small-code-sample">ViewUserDeviceLink</code>, and <code className="small-code-sample">ViewUserDeviceLink</code>.</p>
		<h3>VersionInformation</h3>
		<p>Added the <code className="small-code-sample">ServerId</code> property, a unique identifier for a server/cluster.</p>
	</div>
);

//ToDo Update Object Links
//ToDo Update Method Links
const update2004: ReactNode = (
	<div className="paragraph">
		<h2>New Media File API</h2>
		<p>Geotab is happy to announce a new set of APIs related to Media Files. This new API can be used to store images or video clips related to a device or driver.</p>
		<p><HashLink to="/myGeotab/apiReference/objects#MediaFile">MediaFile</HashLink>: MediaFile is a new type used to store images or video clips related to a device or driver. More information about media files can be found <a href="https://github.com/Geotab/mg-media-files" target="_blank" rel="noopener noreferrer">here</a>.</p>
		<p><HashLink to="/myGeotab/apiReference/objects#MediaType">MediaType</HashLink>: The type of Media.</p>
		<p><HashLink to="/myGeotab/apiReference/objects#Status">Status</HashLink>: The status of an uploaded file.</p>
		<p><HashLink to="/myGeotab/apiReference/objects#MediaFileSearch">MediaFileSearch</HashLink>: The object used to specify the arguments when searching for MediaFile. This will return the data describing a file, not the actual file.</p>
		<p><HashLink to="/myGeotab/apiReference/objects#Tag">Tag</HashLink>: A named tag to provide context to an entity.</p>
		<p><HashLink to="/myGeotab/apiReference/objects#DownloadMediaFileAsync">DownloadMediaFile</HashLink>: Download a file for the given MediaFile. The Content type is determined by the file extension. Range headers are supported.</p>
		<p><HashLink to="/myGeotab/apiReference/objects#UploadMediaFileAsync">UploadMediaFile</HashLink>: Upload a file for the corresponding MediaFile using multipart/form-data POST request.</p>
		<p><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink>: Added ViewMedia and ManageMedia.</p>
		<h2>General SDK updates</h2>
		<h3>BinaryDataType</h3>
		<p>Added <code className="small-code-sample">ThirdPartyData</code> type to allow flexible length binary data format records to be stored.</p>
		<h3>Methods</h3>
		<p><HashLink to="/myGeotab/apiReference/methods#GetCountOf">GetCountOf</HashLink> method now accounts for user scope. It previously did not account for user scope, which was a bug.</p>
		<h3>ZoneSearch</h3>
		<p><code className="small-code-sample">Viewport</code> is obsolete and no longer officially supported. It is replaced with <code className="small-code-sample">SearchArea</code> property. This will be better represented by the type <code className="small-code-sample">BoundingBox</code>. Providing a bounding box is simpler to use because map libraries provide viewport/map bounds in this way already. Backwards compatibility will be maintained with the <code className="small-code-sample">Viewport</code> property, though no longer documented.</p>
		<h3>BoundingBox</h3>
		<p>Added <code className="small-code-sample">BoundingBox</code> which represents a geographic area defined by the top-left and bottom-right coordinates.</p>
		<h3>DiagnosticSearch</h3>
		<p>Added searching by diagnostic name.</p>
		<h3>FaultDataSearch</h3>
		<p>Added searching by Diagnostic Code, Diagnostic Name, Diagnostic Source Name, Diagnostic Source Id, FaultState and Controller Id.</p>
		<h3>Generator-Addin</h3>
		<p>Added groups filter to <a href="https://github.com/Geotab/generator-addin" target="_blank" rel="noopener noreferrer">generator-addin</a>.</p>
		<h3>HOSRuleSet</h3>
		<p><b>Added</b>: <code className="small-code-sample">America7DaySleeper</code>, <code className="small-code-sample">America7DayBigSleeper</code>, <code className="small-code-sample">America8DaySleeper</code>, <code className="small-code-sample">America8DayBigSleeper</code>, <code className="small-code-sample">OilTransport7DaySleeper</code>, <code className="small-code-sample">OilTransport7DayBigSleeper</code>, <code className="small-code-sample">OilTransport8DaySleeper</code>, <code className="small-code-sample">OilTransport8DayBigSleeper</code>, <code className="small-code-sample">America7DayNo34hSleeper</code>, <code className="small-code-sample">America8DayNo34hSleeper</code>, <code className="small-code-sample">AmericaNoRestRequirement7DaySleeper</code>, <code className="small-code-sample">AmericaNoRestRequirement7DayBigSleeper</code>, <code className="small-code-sample">AmericaNoRestRequirement8DaySleeper</code>, <code className="small-code-sample">AmericaNoRestRequirement8DayBigSleeper</code>, <code className="small-code-sample">OilWell7DaySleeper</code>, <code className="small-code-sample">OilWell7DayBigSleeper</code>, <code className="small-code-sample">OilWell8DaySleeper</code>, <code className="small-code-sample">OilWell8DayBigSleeper</code>, <code className="small-code-sample">OilTransportNoRestRequirement7DaySleeper</code>, <code className="small-code-sample">OilTransportNoRestRequirement7DayBigSleeper</code>, <code className="small-code-sample">OilTransportNoRestRequirement8DaySleeper</code>, <code className="small-code-sample">OilTransportNoRestRequirement8DayBigSleeper</code>, <code className="small-code-sample">OilWellNoRestRequirement7DaySleeper</code>, <code className="small-code-sample">OilWellNoRestRequirement7DayBigSleeper</code>, <code className="small-code-sample">OilWellNoRestRequirement8DaySleeper</code>, <code className="small-code-sample">OilWellNoRestRequirement8DayBigSleeper</code>, <code className="small-code-sample">AlaskaProperty7DaySleeper</code>, <code className="small-code-sample">AlaskaProperty8DaySleeper</code></p>
		<h3>Removed BETA attribute on the following</h3>
		<ul>
			<li>
				AnnotationLog
			</li>
			<li>
				AnnotationLogSearch
			</li>
			<li>
				ApplicationVersionInformation
			</li>
			<li>
				DefectRemark
			</li>
			<li>
				DefectSeverity
			</li>
			<li>
				DutyStatusAvailability
			</li>
			<li>
				DutyStatusAvailabilitySearch
			</li>
			<li>
				DutyStatusLog
			</li>
			<li>
				DutyStatusLogSearch
			</li>
			<li>
				DutyStatusLogType
			</li>
			<li>
				DutyStatusMalfunctionTypes
			</li>
			<li>
				DutyStatusOrigin
			</li>
			<li>
				DutyStatusState
			</li>
			<li>
				DutyStatusViolation
			</li>
			<li>
				DutyStatusViolationSearch
			</li>
			<li>
				DutyStatusViolationType
			</li>
			<li>
				DVIRDefect
			</li>
			<li>
				DVIRDefectSearch
			</li>
			<li>
				DVIRLog
			</li>
			<li>
				DVIRLogSearch
			</li>
			<li>
				DVIRLogType
			</li>
			<li>
				DtcClass
			</li>
			<li>
				DtcSeverity
			</li>
			<li>
				ElectricEnergyEconomyUnit
			</li>
			<li>
				ElectricEnergyUnit
			</li>
			<li>
				HosRuleSet
			</li>
			<li>
				InvalidMyAdminUserException
			</li>
			<li>
				RepairStatusType
			</li>
			<li>
				ShipmentLog
			</li>
			<li>
				ShipmentLogSearch
			</li>
			<li>
				TextMessageContentType
			</li>
			<li>
				Trailer
			</li>
			<li>
				TrailerAttachment
			</li>
			<li>
				TrailerAttachmentSearch
			</li>
			<li>
				TrailerSearch
			</li>
			<li>
				VersionInformation
			</li>
			<li>
				GetVersionInformation
			</li>
			<li>
				GetFeed:Audit
			</li>
			<li>
				GetFeed:Device
			</li>
			<li>
				GetFeed:Diagnostic
			</li>
			<li>
				GetFeed:DriverChange
			</li>
			<li>
				GetFeed:Route
			</li>
			<li>
				GetFeed:Rule
			</li>
			<li>
				GetFeed:TextMessage
			</li>
			<li>
				GetFeed:TrailerAttachment
			</li>
			<li>
				GetFeed:Driver
			</li>
			<li>
				GetFeed:Zone
			</li>
		</ul>
		<h2>Java SDK (Feature Preview)</h2>
		<p>We work hard to create fast and flexible tools that make sense for your business, and your feedback is an essential part of that process. With this in mind, we are previewing our new Java SDK, and we want you to tell us how we did! So go ahead - test the kit, join our Community Developer Discussions to help us improve our product, and get to know our users.</p>
		<p>The Java SDK offers an easy way to integrate MyGeotab into Java software. All communication with Geotab services is accomplished using HTTPS with serialized data in JSON format. The Java library provides Java objects representing MyGeotab entities and automatically handles their JSON serialization and deserialization.</p>
		<p>The Java SDK is available as a Maven Dependency Library from the Maven Central Repository and includes documentation with information and usage samples for your new kit.</p>
		<p>You can find Java-based API usage samples at https://github.com/Geotab/sdk-java-samples</p>
		<p>Samples include:</p>
		<p>Get Logs for a given vehicle between a range of dates. Send Text Messages to and from a GO device Import Groups includes a console example that is also a Group import tool. The sample enables a one-time import of groups to a database from a CSV file. Import Devices includes console example that imports devices from a CSV file. Import Users includes a console example that imports users from a CSV file. Get Data Feed includes an example for retrieving GPS, StatusData and FaultData as a feed, and for exporting to CSV file.</p>
		<p>Supported Methods include:</p>
		<ul>
			<li>
				Authenticate
			</li>
			<li>
				Get
			</li>
			<li>
				Add
			</li>
			<li>
				Set
			</li>
			<li>
				Remove
			</li>
			<li>
				GetFeed (LogRecord, StatusData, FaultData, Trip)
			</li>
			<li>
				GetCountOf
			</li>
		</ul>
		<p>Supported Objects include:</p>
		<ul>
			<li>Id</li>
			<li>Entity</li>
			<li>EntityWithVersion</li>
			<li>NameEntity</li>
			<li>NameEntityWithVersion</li>
			<li>LoginResult</li>
			<li>Credentials</li>
			<li>Coordinate</li>
			<li>Color</li>
			<li>Controller</li>
			<li>ControllerSearch</li>
			<li>Device (all types)</li>
			<li>DeviceSearch</li>
			<li>Diagnostic</li>
			<li>DiagnosticSearch</li>
			<li>DataDiagnostic</li>
			<li>DiagnosticType</li>
			<li>EngineType</li>
			<li>EngineTypeSearch</li>
			<li>FailureMode</li>
			<li>FailureModeSearch</li>
			<li>FaultData</li>
			<li>FaultDataSearch</li>
			<li>FlashCode</li>
			<li>Group</li>
			<li>GroupSearch</li>
			<li>IoxAddOn</li>
			<li>IoxAddOnSearch</li>
			<li>LogRecord</li>
			<li>LogRecordSearch</li>
			<li>ParameterGroup</li>
			<li>ParameterGroupSearch</li>
			<li>Source</li>
			<li>SourceSearch</li>
			<li>StatusData</li>
			<li>StatusDataSearch</li>
			<li>TextMessage</li>
			<li>TextMessageSearch</li>
			<li>TextMessageContentType</li>
			<li>Trip</li>
			<li>TripSearch</li>
			<li>UnitOfMeasure</li>
			<li>UnitOfMeasureSearch</li>
			<li>User</li>
			<li>Driver</li>
			<li>UserSearch</li>
			<li>WorkTime</li>
			<li>WorkTimeDetail</li>
			<li>WorkTimeHolidayGroupId</li>
			<li>WorkTimeSearch</li>
			<li>DefectSeverity</li>
			<li>DeviceType</li>
			<li>DiagnosticType</li>
			<li>DtcClass</li>
			<li>DtcSeverity</li>
			<li>ElectricEnergyEconomyUnit</li>
			<li>FaultLampState</li>
			<li>FaultResetMode</li>
			<li>FaultState</li>
			<li>FuelEconomyUnit</li>
			<li>GoogleMapStyle</li>
			<li>GoTalkLanguage</li>
			<li>HosOption</li>
			<li>HosRuleSet</li>
			<li>MessageContentType</li>
			<li>OpenStreetMapStyle</li>
			<li>SecurityIdentifier</li>
			<li>SecurityFilter</li>
			<li>ZoneDisplayMode</li>
			<li>MapView</li>
			<li>FeedResult</li>
			<li>DbUnavailableException</li>
			<li>DuplicateException</li>
			<li>GroupRelationViolatedException</li>
			<li>InvalidMyAdminUserException</li>
			<li>InvalidUserException</li>
			<li>OverLimitException</li>
			<li>RegistrationException</li>
			<li>JsonRpcError</li>
			<li>JsonRpcErrorData</li>
		</ul>
	</div>
);

//ToDo Update Object Links
//ToDo Update Method Links
const update2003: ReactNode = (
	<div className="paragraph">
		<h2>General improvements</h2>
		<p>JSON serialization improvements have been made to increase the efficiency of API calls. This is especially noticeable on API calls with large response payload. For example, calling <code className="small-code-sample">GetFeed</code> of <code className="small-code-sample">StatusData</code> with full payload (50,000 results), the average end to end time decreased from 1800 ms to 800 ms.</p>
		<h2>TextMessage and TextMessageSearch</h2>
		<ul>
			<li><HashLink to="/myGeotab/apiReference/objects#TextMessage">TextMessage</HashLink> - Added <code className="small-code-sample">Recipient</code>. This property is used to send a text message to a user.</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#TextMessageSearch">TextMessageSearch</HashLink> - Added searching by <code className="small-code-sample">IsDelivered</code>, <code className="small-code-sample">IsRead</code>, <code className="small-code-sample">UserSearch</code>.
				<ul>
					<li><code className="small-code-sample">IsDelivered</code>, when set to true, returns all text messages that were delivered to the recipient/device.</li>
					<li><code className="small-code-sample">IsRead</code>, when set to true, returns all text messages that were read by the recipient/device.</li>
					<li><code className="small-code-sample">UserSearch</code> searches TextMessages from a user, and users in the specified <code className="small-code-sample">CompanyGroups</code> or <code className="small-code-sample">DriverGroups</code>.</li>
				</ul>
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#TextMessageSearch">TextMessageSearch</HashLink> - Added searching by <code className="small-code-sample">ContentTypes</code> and <code className="small-code-sample">IsDirectionToVehicle</code>.
				<ul>
					<li><code className="small-code-sample">ContentTypes</code> searches for TextMessages based on their MessageContentType.</li>
					<li><code className="small-code-sample">IsDirectionToVehicle</code>, when set to true, will return all text messages that were sent to the device. If set to false, it will return all text messages that were not sent to the device.</li>
				</ul>
			</li>
		</ul>
		<h2>SecurityIdentifier</h2>
		<ul>
   			<li><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink> - <code className="small-code-sample">PerformanceReport</code> has been removed.</li>
		</ul>
		<h2>Exception messages</h2>
		<p>Some exception messages contained escaped Unicode characters. We have fixed these to exclude escaped characters. See the example message change below:</p>
		<InformationalBox>
			<p>The method \u0022NotAMethod\u0022 could not be found. Verify the method name and ensure all method parameters are included</p>
		</InformationalBox>
		<InformationalBox>
			<p>The method 'NotAMethod' could not be found. Verify the method name and ensure all method parameters are included</p>
		</InformationalBox>
		<p>This fix applies to messages of exception types <code className="small-code-sample">MissingMethodException</code>, <code className="small-code-sample">AmbiguousMatchException</code>, <code className="small-code-sample">MissingMemberException</code> and <code className="small-code-sample">JsonSerializationException</code>.</p>
		<h2>DiagnosticType</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DiagnosticType">DiagnosticType</HashLink> - Added <code className="small-code-sample">GmcccFault</code> and <code className="small-code-sample">BrpFault</code>
			</li>
		</ul>
		<h2>KnownId</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#KnownId">KnownId</HashLink> - Added <code className="small-code-sample">ControllerGmcccFaultId</code>, <code className="small-code-sample">SourceGmcccId</code>, <code className="small-code-sample">SourceGmcccObsoleteId</code>, <code className="small-code-sample">ControllerBrpFaultId</code>, <code className="small-code-sample">SourceBrpId</code>, <code className="small-code-sample">SourceBrpObsoleteId</code>
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#KnownId">KnownId</HashLink> - Added <code className="small-code-sample">NoExceptionEventId</code>, <code className="small-code-sample">NoRuleId</code>
			</li>
		</ul>
		<h2>Device</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#Device">Device</HashLink> - Added <code className="small-code-sample">AutoHos</code>. This property is a toggle that represents automatic generation of DutyStatusLogs for a <code className="small-code-sample">GoDevice</code> and/or a <code className="small-code-sample">CustomVehicleDevice</code>.
			</li>
		</ul>
		<h2>DutyStatusViolation</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DutyStatusViolation">DutyStatusViolation</HashLink> - Added <code className="small-code-sample">HoursLimit</code> and <code className="small-code-sample">DaysLimit</code>. These properties show the maximum or minimum hours and/or days limit for duty status violations.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DutyStatusViolation">DutyStatusViolation</HashLink> - Deprecated <code className="small-code-sample">Reason</code> property. This will be removed in a future version. The data in the Reason property string is now provided as <code className="small-code-sample">DaysLimit</code> and <code className="small-code-sample">HoursLimit</code> for better programmatic access.
			</li>
		</ul>
		<h2>UserSearch</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#UserSearch">UserSearch</HashLink> - Added searching by <code className="small-code-sample">LicenseNumber</code>, <code className="small-code-sample">EmployeeNumber</code>, <code className="small-code-sample">HosRuleSet</code> and <code className="small-code-sample">UserAuthenticationType</code>.
			</li>
		</ul>
		<h2>GetFeed DebugData</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/methods#GetFeed">GetFeed</HashLink>: <HashLink to="/myGeotab/apiReference/objects#DebugData">DebugData</HashLink> - Fixed sort order issue leading to possible missed records.
			</li>
		</ul>
		<h2>FuelTransaction</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#FuelTransaction">FuelTransaction</HashLink> - Added <code className="small-code-sample">Device</code> and <code className="small-code-sample">Driver</code>. These properties add fuel transactions for a device or user, rather than a loose match by VIN, etc. If left null, the application will attempt to match the fuel transaction to a device and driver at time of an Add or a Set. If no match is found, the fuel transaction's <code className="small-code-sample">Device</code> and <code className="small-code-sample">Driver</code> properties defaults to NoDevice and UnknownDriver.
			</li>
		</ul>
		<h2>DVIRLog</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DVIRLog">DVIRLog</HashLink> - Added <code className="small-code-sample">AuthorityName</code>, <code className="small-code-sample">AuthorityAddress</code>, <code className="small-code-sample">Odometer</code>, <code className="small-code-sample">LoadHeight</code>, <code className="small-code-sample">LoadWidth</code> and <code className="small-code-sample">IsInspectedByDriver</code>. These properties support Canadian DVIR inspections. AuthorityName and AuthorityAddress are automatically populated based on what the user's corresponding fields are at the time. Odometer currently only applies to the entered <code className="small-code-sample">Hubometer</code> value for Trailer DVIRs.
			</li>
		</ul>
		<h2>ConditionType</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#ConditionType">ConditionType</HashLink> - Added <code className="small-code-sample">IsValueLessThanPercent</code> and <code className="small-code-sample">IsValueMoreThanPercent</code>. These properties are used to create a percentage threshold for speeding violations, rather than an exact speed value under/over the current posted road speed.
			</li>
		</ul>
		<h2>WebServerInvoker (Nuget only)</h2>
		<p>This method has been changed to use generics instead of passing type in, and returning an object, that needs to be cast. For example, <code className="small-code-sample">var version = (string)(await invoker.InvokeAsync("GetVersion", typeof(string)));</code> is now <code className="small-code-sample">var version = await invoker.InvokeAsync{`<`}string{`>`}("GetVersion");</code></p>
		<InformationalBox>
			<p>While not an officially supported component, it's possible <code className="small-code-sample">WebServerInvoker</code> is being used by some integrations. For this reason we thought it worth mentioning this change.</p>
		</InformationalBox>
	</div>
);

//ToDo Update Object Links
//ToDo Update Method Links
//ToDo Update Hardware Link
//ToDo Update SDK Reference Link
const update2002: ReactNode = (
	<div className="paragraph">
		<h2>NuGet</h2>
		<p><span>! IMPORTANT</span>: A bug has been identified with Geotab.Checkmate.Objectmodel NuGet packages older than version 5.7.2002, which can lead to serialization errors when a previous version received a new device plan value. Please update to the latest NuGet package to establish compatibility.</p>
		<h2>Map Add-In</h2>
		<p>Users can now create a <Link to="/myGeotab/addIns/mapAddIns/">Map Add-In</Link> without using the view panel on the right. For quick tasks such as adding icons or text to the Map, simply use the <code className="small-code-sample">"noView":true</code> parameter in your configuration file.</p>
		<CodeSample
		language="javascript"
		code={`{
	"page": "map",
	"noView": true,
	"title": "Some title",
	"mapScript": {
		"script": "..."
	}
}`
}/>
		<p>You can now hide Vehicle State and Groups information from the tooltip when hovering or selecting vehicles on the Map. See the example below.</p>
		<CodeSample
		language="javascript"
		code={`service.tooltip.setConfig({
	device: {
		state: false,
		groups: false
	}
});`
}/>
		<h2>Interpolation</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/methods#Get">Get</HashLink>: <HashLink to="/myGeotab/apiReference/objects#StatusData">StatusData</HashLink>, <HashLink to="/myGeotab/apiReference/objects#LogRecord">LogRecord</HashLink> - In the v5.7.2001 release and earlier, we interpolate between points when using <code className="small-code-sample">StatusData</code> and <code className="small-code-sample">LogRecord</code> API. When a date is requested that is less than or greater than the data, we return the first/last value with the date of the time requested. To minimize confusion, we now return the <i>first/last</i> value with the <i>correct</i> dateTime.
			</li>
		</ul>
		<h2>Users</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#User">User</HashLink> - Added the <code className="small-code-sample">IsExemptHOSEnabled</code> property to indicate whether the user is allowed to use HOS Personal Conveyance.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#User">User</HashLink> - Added <code className="small-code-sample">CompanyName</code>, <code className="small-code-sample">CompanyAddress</code>, and <code className="small-code-sample">CarrierNumber</code> properties to store company and carrier information.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#User">User</HashLink> - Added <code className="small-code-sample">CountryCode</code>, <code className="small-code-sample">PhoneNumber</code>, and <code className="small-code-sample">PhoneNumberExtension</code> properties to assign a phone number to a selected user.
			</li>
		</ul>	
		<h2>Drivers</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#Driver">Driver</HashLink> - Added <code className="small-code-sample">LicenseProvince</code> and <code className="small-code-sample">LicenseNumber</code> properties.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DriverRegulation">DriverRegulation</HashLink> - Added <code className="small-code-sample">RestBreakNeeded</code>, <code className="small-code-sample">OffDutyNeeded</code>, <code className="small-code-sample">DaySummaries</code>, <code className="small-code-sample">WorkdaySummaries</code> and <code className="small-code-sample">CycleSummaries</code> properties to DriverRegulation.
			</li>
		</ul>
		<h2>DutyStatusLog</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DutyStatusLog">DutyStatusLog</HashLink> - Added <code className="small-code-sample">DeferralStatus</code>, and <code className="small-code-sample">DeferralMinutes</code> properties to define the duty status deferral and deferral minutes.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DutyStatusLogType">DutyStatusLogType</HashLink> - Added the <code className="small-code-sample">PC_Exempted</code> property to indicate the status of a driver.
			</li>
		</ul>
		<h2>DVIRLog</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DVIRLog">DVIRLog</HashLink> - Added <code className="small-code-sample">LogType</code> and <code className="small-code-sample">DefectList</code> properties.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#DVIRLogType">DVIRLogType</HashLink> - Most DVIRs are performed as either Pre or Post-trip inspections. To include middle-of-the day scenarios such as discovering new defects, or performing additional inspections, we have added a new <code className="small-code-sample">Intrip</code> inspection type.
			</li>
		</ul>
		<h2>Rules</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#RecipientType">RecipientType</HashLink> - Added <code className="small-code-sample">HosEnabled</code> and <code className="small-code-sample">HosDisabled</code> to <code className="small-code-sample">RecipientType</code> to automate HosEnabled/HosDisabled duty status logs using rule notifications. For example, when an exception event occurs, add an HosEnabled or HosDisabled duty status log at the same time as the event for an unidentified driver.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#ConditionType">ConditionType</HashLink> - Added <code className="small-code-sample">NoPreDVIRCheck</code> and <code className="small-code-sample">NoPostDVIRCheck</code> to <code className="small-code-sample">ConditionType</code> when no Pre or Post-trip DVIR is performed between work days.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#ConditionType">ConditionType</HashLink> - Added <code className="small-code-sample">SpeedLimitAsMeasurement</code> property to the <code className="small-code-sample">ConditionType</code> to create rules that only apply to posted road speeds that are greater than, or less than a specified value. For example, it may be more important to alert the driver when the vehicle is travelling less than 10mph, or greater than 10mph on a highway, than it is on a city street.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#ConditionType">ConditionType</HashLink> - The <code className="small-code-sample">NoDVIRCheck</code> <code className="small-code-sample">ConditionType</code> is obsolete and will be removed in a future version. Please use NoPreDVIRCheck and NoPostDVIRCheck.
			</li>
		</ul>
		<h2>Zones</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#Zone">Zone</HashLink> - Added the <code className="small-code-sample">ZoneTypes</code> property for enumeration of zone types for a given zone.
			</li>
		</ul>
		<h2>Devices</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#Go9">GO9</HashLink> - Added the <code className="small-code-sample">ObdAlertEnabled</code> property to allow users to enable/disable OBD alerts on their vehicles.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#GoDevice">GoDevice</HashLink> - Added the <code className="small-code-sample">ParameterVersionOnDevice</code> property to track the current parameter version on the device. The current <code className="small-code-sample">ParameterVersion</code> property communicates the parameter version to the device; however, parameter updates are not always immediate.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#Device">Device</HashLink> - To prevent mismatches based on system clock settings, we have prevented <code className="small-code-sample">ActiveFrom</code> from being greater than <code className="small-code-sample">ActiveTo</code> when adding a device.
			</li>
		</ul>
		<h2>Generator-Addin version 3.0</h2>
		<p>We have modernized the Add-In scaffolding, development and packaging tool to use more current techniques and features:</p>
		<ul>
			<li>
				Now using webpack.
			</li>
			<li>
				Now using Puppeteer for browser testing.
			</li>
			<li>
				UI now shows a collapsible navbar.
			</li>
			<li>
				Can now toggle multi-language support.
			</li>
			<li>
				Can now toggle blur and focus events to simulate leaving and re-visiting the Add-In page.
			</li>
			<li>
				For more information visit GitHub: <a href="https://github.com/Geotab/generator-addin" target="_blank" rel="noopener noreferrer">https://github.com/Geotab/generator-addin</a>
			</li>
		</ul>
		<h2>Mg-Api-Js version 2.0</h2>
		<p>This major release merges the API wrappers mg-api-js (previously browser only version) and mg-api-node (previously Nodejs only version) into a single project:</p>
		<ul>
			<li>
				Uses single js library for nodejs or browser.
			</li>
			<li>
				Supports Async promises and legacy callback behavior.
			</li>
			<li>
				Simplifies authentication process, no more hard-to-understand callbacks.
			</li>
			<li>
				Optional lower-level control over http response.
			</li>
			<li>
				For more information visit GitHub: <a href="https://github.com/Geotab/mg-api-js" target="_blank" rel="noopener noreferrer">https://github.com/Geotab/mg-api-js</a>
			</li>
		</ul>
		<h2>Other SDK updates</h2>
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#BinaryDataSearch">BinaryDataSearch</HashLink> - Search by <code className="small-code-sample">DeviceSearch.Groups</code> property using <code className="small-code-sample">BinaryDataSearch</code>.
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink> - Added <code className="small-code-sample">SystemSettings</code> value to <code className="small-code-sample">SecurityIdentifier</code>.
			</li>
			<li>
				Removed the <code className="small-code-sample">DiagnosticCategory</code> object from the <Link to="/myGeotab/apiReference/methods">SDK reference</Link> page. This is a legacy object that is no longer in use.
			</li>
			<li>
				Updated the ExternalDeviceShutdownDelay documentation to clarify values in minutes rather than seconds.
			</li>
			<li>
				Added a sample for getting fuel tax details using the <a href="/sdk/software/api/runner.html#sample:get-fuel-tax-details">API runner</a>.
			</li>
			<li>
				Feature Preview items now marked as Beta in <Link to="/myGeotab/apiReference/methods">SDK reference</Link>.
			</li>
			<li>
				Added a hardware <a href="https://docs.google.com/spreadsheets/d/1sy7IOhWmFoo40_I-ruOJO8bVTMLXqHa11d0oJtaoIcE/edit#gid=1133172080" target="_blank" rel="noopener noreferrer">Add-On Data Types</a> section to the SDK.
			</li>
		</ul>
	</div>
);

//ToDo Update Object Links
//ToDo Update Method Links
const update2001: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>AddInData (Feature Preview) - Remove requirement of <code className="small-code-sample">AddInDataId</code> for search by <code className="small-code-sample">Id</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#AuditSearch">AuditSearch</HashLink>, <HashLink to="/myGeotab/apiReference/objects#DeviceSearch">DeviceSearch</HashLink>, <HashLink to="/myGeotab/apiReference/objects#ShipmentLogSearch">ShipmentLogSearch</HashLink>, <HashLink to="/myGeotab/apiReference/objects#UserSearch">UserSearch</HashLink>, <HashLink to="/myGeotab/apiReference/objects#ZoneSearch">ZoneSearch</HashLink> - Added new search by list of <code className="small-code-sample">Keywords</code>. This allows searching "or” across multiple wildcard searchable string fields of an object in one request. For example, searching for device with keywords will search for matches against <code className="small-code-sample">Comment</code>, <code className="small-code-sample">LicensePlate</code>, <code className="small-code-sample">Name</code>, <code className="small-code-sample">SerialNumber</code> and <code className="small-code-sample">VehicleIdentificationNumber</code> matching the provided keywords. Keywords strings support wildcard character (<code className="small-code-sample">%</code>).</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#BinaryData">BinaryData</HashLink> (nuget only) - Fix issue deserializing enum values known to the server but unknown to older nuget package.</p>
			</li>
			<li>
				<p>Calculated Engine Hours Search - As mentioned in 5.7.1904 What's New, <code className="small-code-sample">DiagnosticEngineHoursAdjustmentId</code> is now interpolated using trips and <code className="small-code-sample">DiagnosticIgnitionId</code> values when a search includes a from/toDate value(s) to provide exact values by default.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#CompanyDetails">CompanyDetails</HashLink> - Add documentation describing field length limits. Added more specific error messages relating to max field lengths from <code className="small-code-sample">CreateDatabase</code> method.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#Device">Device</HashLink> - <code className="small-code-sample">HardwareId</code> is no longer returned as part of Device object. For more information regarding this change, please refer to this <a href="https://community.geotab.com/s/question/0D52J00007MIPRYSA5/sdk-notice-removal-of-device-property" target="_blank" rel="noopener noreferrer">community post</a>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DVIRDefect">DVIRDefect</HashLink> - Providing <code className="small-code-sample">RepairUser</code> and <code className="small-code-sample">RepairDateTime</code> are no longer supported for unrepaired <code className="small-code-sample">DVIRDefect</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DVIRLog">DVIRLog</HashLink> - <code className="small-code-sample">DefectList</code> must be provided with <code className="small-code-sample">DVIRLog</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/methods#GetFeed">GetFeed</HashLink> - Fixed corner case where it was possible to miss data in feed due to concurrency issue.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/methods#GetFeed">GetFeed</HashLink> <code className="small-code-sample">StatusData</code> - Fix, providing a search to GetFeed <code className="small-code-sample">StatusData</code> containing a <code className="small-code-sample">DiagnosticSearch</code> which has no results within the provided limit of records will now return a feed version advanced by the results limit or remaining records when less then results limit.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/methods#Get">Get</HashLink> <code className="small-code-sample">Diagnostic</code> - Fix issue searching by <code className="small-code-sample">DiagnosticType.ProprietaryFault</code> or <code className="small-code-sample">DiagnosticType.LegacyFault</code> causing error result.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#GoCurve">GoCurve</HashLink> - Added <code className="small-code-sample">IsIoxConnectionEnabled</code>. (Adds to <code className="small-code-sample">GO4v3</code>, <code className="small-code-sample">GO5</code>, <code className="small-code-sample">GO6</code>, <code className="small-code-sample">GO7</code>, <code className="small-code-sample">GO8</code>, <code className="small-code-sample">GO9</code>)</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#Group">Group</HashLink> (nuget only) - Removed <code className="small-code-sample">left</code> and <code className="small-code-sample">right</code> parameters from constructor and <code className="small-code-sample">Group.Get</code> method.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#GroupRelations">GroupRelations</HashLink> - Added <code className="small-code-sample">AddInDatas</code> property. When <code className="small-code-sample">Group</code> linked <code className="small-code-sample">AddInData</code> (Feature Preview) is blocking a <code className="small-code-sample">Group</code> remove, a list blocking <code className="small-code-sample">AddInData</code> <code className="small-code-sample">Id</code>s will be returned in the <code className="small-code-sample">GroupRelations</code> property of <code className="small-code-sample">GroupRelationViolatedException</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#HosRuleSet">HosRuleSet</HashLink> - Added <code className="small-code-sample">WashingtonIntrastate7Day</code>, <code className="small-code-sample">WashingtonIntrastate8Day</code>, <code className="small-code-sample">NoneCanada</code>, <code className="small-code-sample">HosRuleSetCanadaNorthOf60CycleOne</code>, <code className="small-code-sample">HosRuleSetCanadaNorthOf60CycleTwo</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink> - Added <code className="small-code-sample">ViewGroups</code>, <code className="small-code-sample">AdministerWiFiHotspotSettings</code>, <code className="small-code-sample">ViewWiFiHotspotSettings</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#TextMessage">TextMessage</HashLink> - Proper support of active from/to dates. *Messages that have not been sent by active to date will not be sent.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#TextMessageSearch">TextMessageSearch</HashLink> - <code className="small-code-sample">ParentTextMessageId</code> (long) is obsolete. Usage should be replaced with <code className="small-code-sample">ParentMessageId</code> (Id).</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#User">User</HashLink> - Added <code className="small-code-sample">MaxPCDistancePerDay</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#UserSearch">UserSearch</HashLink> - Added "negatable” search of <code className="small-code-sample">FistName</code>, <code className="small-code-sample">LastName</code> and <code className="small-code-sample">Name</code> properties. If the first character of this search property is ‘!', then the API will know to negate the search logic. For example: <code className="small-code-sample">field = "!John%"</code>, is equivalent to: <code className="small-code-sample">WHERE NOT LIKE 'John%'</code>.</p>
			</li>
		</ul>
	</div>
);

//ToDo Update Object Links
const update1904: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>AddInData (Feature Preview) - Groups are now optional for AddInData objects, currently in Feature preview. Previously, groups were a required property for the AddInData object. This limited the potential usage of AddInData as there are situations where data should be available to all users regardless of scope, and some users were not able to access data when they belonged to groups outside the data's scope. Removing this restriction means any user is now allowed to get an AddInData object if no group is specified for the object.</p>
			</li>
			<li>
				<p>API.cs (nuget only) - Now implements IApi interface. This allows for simpler unit testing of integration code using mocks.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#BinaryData">BinaryDataType</HashLink> - Added <code className="small-code-sample">SoftwareVersionFull</code></p>
			</li>
			<li>
				<p>Calculated Engine Hours Search - With a custom setting (<code className="small-code-sample">ENABLEENGINEHOURSINTERPOLATION</code>) applied to your database, DiagnosticEngineHoursAdjustmentId will now be interpolated using trips and DiagnosticIgnitionId values when a search includes a from/toDate value(s) to provide exact values. To apply this custom setting to your database, please reach out to Geotab support. This will become the default behavior in v5.7.2001.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DatabaseExistsAsync">DatabaseExists</HashLink> fixed to include databases existing in other federations.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#FuelTransactionProductType">FuelTransactionProductType</HashLink> - Added <code className="small-code-sample">Hydrogen</code> and <code className="small-code-sample">DieselExhaustFluid</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#FuelTransactionProvider">FuelTransactionProvider</HashLink> - Added <code className="small-code-sample">GFN</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#HosRuleSet">HosRuleSet</HashLink> - Added <code className="small-code-sample">HosRuleSetCanadaCycleOneTeam</code> and <code className="small-code-sample">HosRuleSetCanadaCycleTwoTeam</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#LoginResult">LoginResult</HashLink> - Removed unsupported legacy property <code className="small-code-sample">SecurityToken</code>. This property duplicated the supported property <code className="small-code-sample">Credentials</code>. It was previously maintained for compatibility with MyGeotab Web Server 5.6.1 which is no longer supported.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#Rule">Rule</HashLink> - Fix, don't allow adding Rules without Conditions.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink> - Added <code className="small-code-sample">ViewGroups</code>.</p>
			</li>
		</ul>
	</div>
);

//ToDo Update Object Links
//ToDo Update Method Links
const update1903: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusLog">DutyStatusLog</HashLink>: Added <code className="small-code-sample">EditRequestedByUser</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusLog">DutyStatusLog</HashLink>: Locations will not be included with DutyStatusLog by default. To include locations must use <code className="small-code-sample">dutyStatusLogSearch.IncludeLocations: true</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusLogType">DutyStatusLogType</HashLink>: Added <code className="small-code-sample">HosEnabled</code>, <code className="small-code-sample">HosDisabled</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DVIRLog">DVIRLog</HashLink>: Added <code className="small-code-sample">RepairDate</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#IoxAddOn">IoxAddOn</HashLink>: Added <code className="small-code-sample">DateTime</code> representing when the channel was set to the given value.</p>
			</li>
			<li>
				<p>Serialization: ISO date time at zero hour will now have full ISO time ex <code className="small-code-sample">1986-01-01</code> -{'>'} <code className="small-code-sample">1986-01-01T00:00:00.000Z</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#HosRuleSet">HosRuleSet</HashLink>: Added <code className="small-code-sample">AmericaShortHaul14hrWorkday</code>, <code className="small-code-sample">AmericaShortHaul8Day14hrWorkday</code>, <code className="small-code-sample">OilTransportShortHaul14hrWorkday</code>, <code className="small-code-sample">OilTransportShortHaul8Day14hrWorkday</code>, <code className="small-code-sample">CaliforniaFlammableLiquidWithRestRequirement</code>, <code className="small-code-sample">CaliforniaSchoolPupilWithRestRequirement</code>, <code className="small-code-sample">CaliforniaFarmProductWithRestRequirement</code>, <code className="small-code-sample">OilTransportCaliforniaProperty</code>, <code className="small-code-sample">OilWellCaliforniaProperty</code>, <code className="small-code-sample">AmericaSalespersonNonCdlShortHaul</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#User">User</HashLink>: Active from/to: The user property <code className="small-code-sample">ActiveTo</code> will automatically be set to max date (2050-01-01) to denote that it is active. To account for differences in Client machine time vs Server machine time, we are allowing users to set the value of <code className="small-code-sample">ActiveTo</code> to a max window of 24 hours in the future (i.e. Current Time + 24 hours). In this situation we are considering it to be historical.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#CustomData">CustomData</HashLink>: Incomplete custom data is no longer returned via GetFeed API.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/methods#GetFeed">GetFeed</HashLink>: Added feeds for entities that could generate more than 50,000 records in a single request. Please take note of the limits on results.</p>
				<ul>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#Audit">Audit</HashLink> - 50,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#Device">Device</HashLink> - 5,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#Diagnostic">Diagnostic</HashLink> - 50,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#DriverChange">DriverChange</HashLink> - 50,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#Route">Route</HashLink> - 10,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#Rule">Rule</HashLink> - 10,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#TextMessage">TextMessage</HashLink> - 50,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#Trailer">Trailer</HashLink> - 50,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#User">User</HashLink> - 5,000 record limit</p>
					</li>
					<li>
						<p><HashLink to="/myGeotab/apiReference/objects#Zone">Zone</HashLink> - 10,000 record limit</p>
					</li>
				</ul>
			</li>
		</ul>
	</div>
);

//ToDo Update Object Links
//ToDo Update Concepts Page Link
const update1902: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#ApplicationVersionInformation">ApplicationVersionInformation</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#BinaryDataType">BinaryDataType</HashLink>: Added <code className="small-code-sample">SoftwareVersionSection1</code>, <code className="small-code-sample">SoftwareVersionSection2</code>, <code className="small-code-sample">SoftwareVersionSection3</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DefectRemark">DefectRemark</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DefectSeverity">DefectSeverity</HashLink>: Added <code className="small-code-sample">Unregulated</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#Device">Device</HashLink>: Adding a device will now force the ActiveTo property to max date. Setting a device's ActiveTo property to a future date, but not max date, will force the value to max date.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DeviceType">DeviceType</HashLink>: Added <code className="small-code-sample">GO9</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DiagnosticType">DiagnosticType</HashLink>: Added <code className="small-code-sample">ProprietaryFault</code>, <code className="small-code-sample">LegacyFault</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DriverRegulation">DriverRegulation</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DtcClass">DtcClass</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DtcSeverity">DtcSeverity</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusAvailability">DutyStatusAvailability</HashLink>: Added properties <code className="small-code-sample">CycleRest</code>, <code className="small-code-sample">DutySinceCycleRest</code>, <code className="small-code-sample">Is16HourExemptionAvailable</code>, <code className="small-code-sample">IsAdverseDrivingExemptionAvailable</code>, <code className="small-code-sample">IsOffDutyDeferralExemptionAvailable</code></p>
			</li>
			<li>
				<p>DutyStatusAvailabilityDuration: Removed from documentation, will be obsoleted in future</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusViolationType">DutyStatusViolationType</HashLink>: Added <code className="small-code-sample">CycleRest</code> and <code className="small-code-sample">DutySinceCycleRest</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DVIRDefect">DVIRDefect</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#ElectricEnergyUnit">ElectricEnergyUnit</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#ElectricEnergyEconomyUnit">ElectricEnergyEconomyUnit</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#FaultData">FaultData</HashLink>: Added <code className="small-code-sample">ClassCode</code>, <code className="small-code-sample">Severity</code> and <code className="small-code-sample">SourceAddress</code> properties</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#Go9">GO9</HashLink>: Added support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#GroupSearch">GroupSearch</HashLink>: Added search by <code className="small-code-sample">Reference</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#HosRuleSet">HosRuleSet</HashLink>: Added <code className="small-code-sample">CaliforniaFlammableLiquid</code>, <code className="small-code-sample">CaliforniaSchoolPupil</code>, <code className="small-code-sample">CaliforniaFarmProduct</code>, <code className="small-code-sample">OilTransportCalifornia8day</code>, <code className="small-code-sample">OilWellCalifornia8day</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#KnownId">KnownId</HashLink>: Added <code className="small-code-sample">UnitOfMeasureLitersPerTonneId</code>, <code className="small-code-sample">DiagnosticStateOfChargeId</code>, <code className="small-code-sample">DiagnosticTotalLifetimeBatteryEnergyInDuringACChargingId</code>, <code className="small-code-sample">DiagnosticTotalLifetimeBatteryEnergyInDuringDCChargingId</code>, <code className="small-code-sample">DiagnosticTotalLifetimeOnBoardChargerEnergyOutDuringACChargingId</code>, <code className="small-code-sample">DiagnosticTotalLifetimeOnBoardChargerEnergyInDuringACChargingInId</code>, <code className="small-code-sample">DiagnosticOnBoardChargerAcInputVoltageId</code>, <code className="small-code-sample">DiagnosticElectricVehicleChargingStateId</code>, <code className="small-code-sample">DiagnosticElectricVehicleBatteryPowerId</code>, <code className="small-code-sample">DiagnosticOnBoardChargerACInputPowerId</code>, <code className="small-code-sample">DiagnosticOnBoardChargerDCOutputPowerId</code>, <code className="small-code-sample">DiagnosticElectricEnergyInId,DiagnosticElectricEnergyOutId</code>, <code className="small-code-sample">HosRuleSetCaliforniaFlammableLiquid</code>, <code className="small-code-sample">HosRuleSetCaliforniaSchoolPupil</code>, <code className="small-code-sample">HosRuleSetCaliforniaFarmProduct</code>, <code className="small-code-sample">HosRuleSetOilTransportCalifornia8day</code>, <code className="small-code-sample">HosRuleSetOilWellCalifornia8day</code>, <code className="small-code-sample">ControllerProprietaryFaultId</code>, <code className="small-code-sample">ControllerLegacyFaultId</code>, <code className="small-code-sample">SourceProprietaryId</code>, <code className="small-code-sample">SourceLegacyId</code>, <code className="small-code-sample">DiagnosticBluetoothNitricOxideConcentrationId</code>, <code className="small-code-sample">DiagnosticBluetoothNitrogenDioxideConcentrationId</code>, <code className="small-code-sample">DiagnosticBluetoothCarbonMonoxideConcentrationId</code>, <code className="small-code-sample">DiagnosticBluetoothAmmoniaConcentrationId</code>, <code className="small-code-sample">DiagnosticBluetoothMethaneConcentrationId</code>, <code className="small-code-sample">DiagnosticBluetoothEthanolConcentrationId</code>, <code className="small-code-sample">DiagnosticBluetoothHydrogenConcentrationId</code>, <code className="small-code-sample">DiagnosticBluetoothCarbonDioxideConcentrationId</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#MimeContent">MimeContent</HashLink>: Added <code className="small-code-sample">ChannelNumber</code> property</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#RepairStatusType">RepairStatusType</HashLink>: Added beta support</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink>: Added <code className="small-code-sample">InspectDVIR</code>, <code className="small-code-sample">CertifyDVIR</code> - Removed <code className="small-code-sample">DailyUsageReport</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#User">User</HashLink>: Added <code className="small-code-sample">ElectricEnergyEconomyUnit</code> and <code className="small-code-sample">isEmailReportEnabled</code> properties</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#User">User</HashLink>: Fixed bug where <code className="small-code-sample">isDriver</code> property would be included with <code className="small-code-sample">id</code> in nested driver entities. This property is removed from nested entities. It will remain in non-nested users.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#VersionInformation">VersionInformation</HashLink>: <code className="small-code-sample">Server</code> is obsolete and replaced with more detailed <code className="small-code-sample">Application</code> property (see <HashLink to="/myGeotab/apiReference/objects#ApplicationVersionInformation">ApplicationVersionInformation</HashLink>)</p>
			</li>
			<li>
				<p>.Net nuget package: Group constructor with only ID has been removed.</p>
			</li>
		</ul>
		<h2>Result And Rate Limits</h2>
		<p>For an in-depth description of the result in rate limit changes in 5.7.1902 and future releases see <a href="https://www.geotab.com/blog/result-and-rate-limits/" target="_blank" rel="noopener noreferrer">this blog post</a></p>
		<ul>
			<li>
				<p><a href="/sdk/software/guides/concepts#limits">Concepts</a> section updated to reflect new result and rate limits.</p>
			</li>
			<li>
				<p>Result Limits: Maximum result limit of 50,000 has been added to generic <code className="small-code-sample">Get</code> (including <code className="small-code-sample">Get</code> using <code className="small-code-sample">search</code>) requests of entity types: AnnotationLog, DVIRLog, TrailerAttachment, IoxAddOn, CustomData, BinaryData. Results limits will be added to more entity types in future releases.</p>
			</li>
			<li>
				<p>Rate Limits: Rate limits of 1 RPS (request-per-second) has been added to all <code className="small-code-sample">GetFeed</code> APIs.</p>
			</li>
		</ul>
	</div>
);

//ToDo Update Object links
const update1901: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>Sun-setting support for SendEmail API. No longer available in API documentation.</p>
			</li>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#Device">Device</HashLink>: Active from/to:
				<ul>
					<li>The device property <code className="small-code-sample">ActiveTo</code> will automatically be set to max date (2050-01-01) to denote that it is active.</li>
					<li>To account for differences in Client machine time vs Server machine time, we are allowing users to set the value of <code className="small-code-sample">ActiveTo</code> to a max window of 24 hours in the future (i.e. Current Time + 24 hours). In this situation we are considering it to be historical.</li>
				</ul>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DVIRLog">DVIRLog</HashLink>: Added <code className="small-code-sample">Location</code> property.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink>: Added <code className="small-code-sample">ViewBusinessIntelligence</code>, <code className="small-code-sample">ActiveTrackingClearance</code>.</p>
			</li>
			<li>SecurityRole: Added <code className="small-code-sample">EmailSent</code>, <code className="small-code-sample">SkipHosVerify</code>, <code className="small-code-sample">SkipHosClaimUnassigned</code>, <code className="small-code-sample">SkipDvirInspect</code>.</li>
		</ul>
	</div>
);

//ToDo Update API.cs link
const update1804Dot1: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<HashLink to="/myGeotab/apiReference/objects#API">API.cs</HashLink> (.Net only): Fix bug, Windows 10 using IIS Express possible hanging <i>synchronous</i> requests using nuget package 5.7.1803\5.7.1804.
			</li>
		</ul>
	</div>
);

//ToDo Update API.cs link
//ToDo Update methods/objects links
const update1804: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p><HashLink to="/myGeotab/apiReference/methods#Add">Add</HashLink>/<HashLink to="/myGeotab/apiReference/methods#Set">Set</HashLink> <HashLink to="/myGeotab/apiReference/objects#Device">Device</HashLink>: <code className="small-code-sample">ParameterVersion</code> will auto increment server side when device parameters property changed. Server must see that <code className="small-code-sample">ParameterVersion</code> has incremented to send parameters to an installed GO device (ex device beeping instructions). Previously, <code className="small-code-sample">ParameterVersion</code> required manual increment.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#API">API.cs</HashLink> (.Net only): Fix bug, in certain senario changing <code className="small-code-sample">Timeout</code> property could abort the action on timeout and not cancel underlying request.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#CustomVehicleDevice">CustomVehicleDevice</HashLink>: Support of vehicle specific custom devices which provide vehicle specific properties and functionality. Custom device product ID must be of CustomVehicleDevice type. Contact your reseller for more information.</p>
				<ul>
					<li>
						<p>Improved support for calculated odometer and raw odometer with third-party diagnostic KnownId <code className="small-code-sample">DiagnosticThirdPartyOdometerId</code> and <code className="small-code-sample">OdometerAdjustmentId</code></p>
					</li>
					<li>
						<p>Improved support for calculated engine hours with third-party diagnostic KnownId <code className="small-code-sample">DiagnosticThirdPartyEngineRunTimeId</code> and <code className="small-code-sample">EngineHoursAdjustmentId</code></p>
					</li>
					<li>
						<p><code className="small-code-sample">VehicleIdentificationNumber</code> property moved from CustomDevice to CustomVehicleDevice</p>
					</li>
					<li>
						<p>Added <code className="small-code-sample">LicencePlate</code> and <code className="small-code-sample">LicenceState</code> properties</p>
					</li>
				</ul>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusAvailability">DutyStatusAvailability</HashLink>: Added BETA support for <code className="small-code-sample">Recap</code> and <code className="small-code-sample">CycleAvailabilities</code> properties</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusAvailability">DutyStatusAvailability</HashLink>: Replaced <code className="small-code-sample">Availabilities</code> list with separate properties: <code className="small-code-sample">Driving</code>, <code className="small-code-sample">Cycle</code>, <code className="small-code-sample">Rest</code>, <code className="small-code-sample">Duty</code>, <code className="small-code-sample">Workday</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DeviceType">DeviceType</HashLink>: Added <code className="small-code-sample">CustomVehicleDevice</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DriverChange">DriverChange</HashLink>: DriverChange object Id property is no longer backed by integer type. It is now backed by GUID type. When update 1804 is applied to the database, all previous numeric entity Id's will be invalidated and assigned a new GUID Id's. This could pose an issue if your integration stores driver change Id and you then reference the DriverChange by that Id. Note: JSON representation of Id was previously string and remains string type.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusLogType">DutyStatusLogType</HashLink>: Added <code className="small-code-sample">ExemptionOffDutyDeferral</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusViolationType">DutyStatusViolationType</HashLink>: Added <code className="small-code-sample">DailyDriving</code>, <code className="small-code-sample">DailyRest</code>, <code className="small-code-sample">DailyDuty</code>, <code className="small-code-sample">DailyOff</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#KnownId">KnownId</HashLink>: Added <code className="small-code-sample">DiagnosticThirdPartyEngineRunTimeId</code>, <code className="small-code-sample">DiagnosticThirdPartyOdometerId</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/methods#GetFeed">GetFeed</HashLink> <HashLink to="/myGeotab/apiReference/objects#LogRecord">LogRecord</HashLink>: Fixed bug with inconstant results limit.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink>: Added <code className="small-code-sample">DirectSupportAdmin</code>, <code className="small-code-sample">UserLoginStatusRead</code>, <code className="small-code-sample">UserLoginStatusSet</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink>: Values <code className="small-code-sample">AlarmSoundList</code>, <code className="small-code-sample">Tracking</code>, <code className="small-code-sample">CreateNewSqlDatabase</code>, <code className="small-code-sample">EngineControllerList</code>, <code className="small-code-sample">PurgeSettings</code>, <code className="small-code-sample">SendImmobilizationInstruction</code> are obsolete and will be removed in version 1806+.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#SecurityRole">SecurityRole</HashLink>: Added <code className="small-code-sample">SupportTicketInsert</code>, <code className="small-code-sample">TrainingTicketInsert</code>, <code className="small-code-sample">SupportTicketSet</code>, <code className="small-code-sample">TrainingTicketSetUser</code>, <code className="small-code-sample">LoginFailure</code>, <code className="small-code-sample">UserLockout</code>, <code className="small-code-sample">UserUnlocked</code>, <code className="small-code-sample">ShipmentLogInsert</code>, <code className="small-code-sample">ShipmentLogSet</code>, <code className="small-code-sample">ShipmentLogRemove</code>, <code className="small-code-sample">TrailerAttachmentInsert</code>, <code className="small-code-sample">TrailerAttachmentSet</code>, <code className="small-code-sample">TrailerAttachmentRemove</code>.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#ZoneSearch">ZoneSearch</HashLink>: Added <code className="small-code-sample">FromDate</code> and <code className="small-code-sample">ToDate</code> search properties providing ability to filter zones by their active dates.</p>
			</li>
		</ul>
		<InformationalBox>
			<p><HashLink to="/myGeotab/apiReference/objects#API">API.cs</HashLink> (.Net only): There is a known issue on Windows 10 using IIS Express with possible hanging <i>synchronous</i> requests using nuget package 5.7.1803\5.7.1804. This issue is solved in 5.7.1804.1 or greater.</p>
		</InformationalBox>
	</div>
);

//ToDo: Update CD reference link
//ToDo: Update object link
const update1803: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>SecurityRole: Added <code className="small-code-sample">CertificateSet</code> permission</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DriverChangeSearch">DriverChangeSearch</HashLink>: Added property <code className="small-code-sample">Type</code> indicating the DriverChangeType to search for exclusively.</p>
			</li>
		</ul>
		<InformationalBox>
			<p><HashLink to="/myGeotab/apiReference/objects#API">API.cs</HashLink> (.Net only): There is a known issue on Windows 10 using IIS Express with possible hanging <i>synchronous</i> requests using nuget package 5.7.1803\5.7.1804. This issue is solved in 5.7.1804.1 or greater.</p>
		</InformationalBox>
	</div>
);

//ToDo: Update all object links 
const update1802: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusLog">DutyStatusLog</HashLink>: Added properties <code className="small-code-sample">Odometer</code>, <code className="small-code-sample">EngineHours</code>, <code className="small-code-sample">EventRecordStatus</code>, <code className="small-code-sample">EventCode</code>, <code className="small-code-sample">EventType</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#DutyStatusLogType">DutyStatusLogType</HashLink>: Added <code className="small-code-sample">SituationalDrivingClear</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#FuelTaxDetail">FuelTaxDetail</HashLink>: Added properties <code className="small-code-sample">HourlyIsOdometerInterpolated</code>, <code className="small-code-sample">IsEnterOdometerInterpolated</code>, <code className="small-code-sample">IsExitOdometerInterpolated</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#FuelTaxDetail">FuelTaxDetail</HashLink>: Obsolete <code className="small-code-sample">IsClusterOdometer</code> - Superseded by the IsEnterOdometerInterpolated, HourlyIsOdometerInterpolated, and IsExitOdometerInterpolated properties. Will be removed in future version.</p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#FuelTaxDetailSearch">FuelTaxDetailSearch</HashLink>: Added properties <code className="small-code-sample">IncludeBoundaries</code>, <code className="small-code-sample">IncludeHourlyData</code></p>
			</li>
			<li>
				<p><HashLink to="/myGeotab/apiReference/objects#SecurityIdentifier">SecurityIdentifier</HashLink>: Added <code className="small-code-sample">ViewTripTypeChangeData</code>, <code className="small-code-sample">EditTripTypeChangeData</code></p>
			</li>
		</ul>
		<h2>Notice</h2>
		<p>An issue was discovered which could cause integrations using the Geotab.Checkmate.Objectmodel nuget package v5.7.1801 and lower to encounter a serialization failure when a new DiagnosticType is introduced. The issue has been addressed in nuget package v<a href="https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/" target="_blank" rel="noopener noreferrer">5.7.1802</a>. To ensure compatibility, it is strongly recommended that all integrations referencing the nuget package v5.7.1801 and lower update to version v5.7.1802 as soon as possible. (this issue is only relevant to .Net nuget package users)</p>
	</div>
);

const update1801: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>KnownId - Removed: <code className="small-code-sample">UnitOfMeasureLitersPer100KilometersId</code>. Diagnostics associated with this unit of measure now use <code className="small-code-sample">UnitOfMeasureKilometersPerLiterId</code>. This will not affect any previously recorded data.</p>
			</li>
			<li>
				<p>KnownId - Added: <code className="small-code-sample">DiagnosticGpsLogReasonId</code>, <code className="small-code-sample">DiagnosticEngineRoadSpeedId</code></p>
			</li>
			<li>
				<p>ConditionType - Added: <code className="small-code-sample">DVIRDefect</code> - Currently works with Devices not Trailers</p>
			</li>
			<li>
				<p>SecurityIdentifier - Added: <code className="small-code-sample">DriverIdentificationClearance</code>, <code className="small-code-sample">AccelerometerDataClearance</code>, <code className="small-code-sample">ServicePlansClearance</code>, <code className="small-code-sample">AuxiliaryClearance</code>, <code className="small-code-sample">EngineStatusDataClearance</code>, <code className="small-code-sample">ResellerControlClearance</code>, <code className="small-code-sample">GoTalkClearance</code>, <code className="small-code-sample">StatusGroupsClearance</code>, <code className="small-code-sample">ProductGuideClearance</code>, <code className="small-code-sample">FeaturePreviewClearance</code>, <code className="small-code-sample">NewsNotificationsClearance</code>, <code className="small-code-sample">ManageAddinsClearance</code>, <code className="small-code-sample">DeviceCurrentStatusClearance</code></p>
			</li>
		</ul>
		<h2>Notice</h2>
		<p>In early 2018 the following legacy properties will be removed:</p>
		<p><b>Authenticate</b>: <code className="small-code-sample">userLogin</code> parameter. This was kept around for compatibility with legacy (5.6.* and lower) integrations. It has not been publicly exposed or documented since version 5.6 of MyGeotab. It is planned to be removed as a valid parameter in version 5.7.1803. The <code className="small-code-sample">userName</code> parameter is the standard supported property that should be used.</p>
		<p><b>LoginResult</b>: <code className="small-code-sample">securityToken</code> property. LoginResult is the object returned by the Authenticate method. It's property <code className="small-code-sample">securityToken</code> was kept around for compatibility with legacy (5.6.* and lower) integrations. It has not been publicly exposed or documented since version 5.6 of MyGeotab. It is planned to be removed as a valid parameter in version 5.7.1803. The property <code className="small-code-sample">credentials</code> is the standard supported property that shares the same value.</p>
	</div>
);

const update1712: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>API.cs (.Net only) - Fix: When password and session id are supplied to constructor, session id will be used until no longer valid. Previously, session id would only be used if password was not supplied.</p>
			</li>
			<li>
				<p>FuelTaxDetail - Added properties: ”IsEnterOdometerInterpolated”, "IsExitOdometerInterpolated”, "HourlyIsOdometerInterpolated”</p>
			</li>
			<li>
				<p>User - Removed property: "MenuCollapsedNotified”</p>
			</li>
		</ul>
	</div>
);

const update1711: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>GetAddresses - Added: "hosAddresses” parameter to optionally search for ELD compliant address</p>
			</li>
			<li>
				<p>UnitOfMeasure - Added: Kilowatt hours ("UnitOfMeasureKiloWattHoursId”)</p>
			</li>
			<li>
				<p>SecurityIdentifier - Added "ViewBinaryData”, "ManageAddInData”, "ViewAddInData”</p>
			</li>
			<li>
				<p>HosRuleSet - Added "CarrierExemption”</p>
			</li>
			<li>
				<p>.Net SDK samples updated to target netcoreapp2.0</p>
			</li>
			<li>
				<p>.Net nuget package now supports framework: netstandard2.0 (removed support for net46)</p>
			</li>
		</ul>	
	</div>
);

const update1709: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>API.cs (.Net only) - Added cancellation token parameter to AuthenticateAsync and CallAsync methods.</p>
			</li>
			<li>
				<p>DutyStatusLog - Added "Malfunction” property - The DutyStatusMalfunctionType of the DutyStatusLog record. As a flag it can be both a diagnostic and malfunction state which is used to mark status based records (e.g. "D”, "SB”) as having a diagnostic or malfunction present at time of recording.</p>
			</li>
			<li>
				<p>DutyStatusLog - Added "Sequence” property - The sequence number, which is used to generate the sequence ID.</p>
			</li>
			<li>
				<p>DutyStatusLogType - Added "EnginePowerup”, "EngineShutdown”, "EnginePowerupPC”, "EngineShutdownPC”, "PowerCompliance”, "EngineSyncCompliance”, "TimingCompliance”, "PositioningCompliance”, "DataRecordingCompliance”, "DataTransferCompliance”, "OtherCompliance”, "MissingElementCompliance”, "UnidentifiedDrivingCompliance”, "INT_PC”, "INT_D”.</p>
			</li>
			<li>
				<p>Controller - Added short integer "CodeId” property, which will replace the "Code” property. New "AnyController” for J1708 engine diagnostics to allow replacing those engine diagnostics identical except for the controller with one diagnostic. J1708 engine diagnostics for 58 separate SIDs were updated.</p>
			</li>
			<li>
				<p>CustomDevice - Added "VehicleIdentificationNumber” property.</p>
			</li>
			<li>
				<p>FuelTaxDetail - Added "Driver” property.</p>
			</li>
			<li>
				<p>DriverChangeSearch - Added "IncludeOverlappedChanges” property - A value indicating whether to include the last driver change before the from date or the most recent driver change (if the from date is not provided).</p>
			</li>
			<li>
				<p>InvalidUserException - Message changed from to "Incorrect MyGeotab login credentials…” to "Incorrect login credentials…”.</p>
			</li>
		</ul>
		<h2>New objects</h2>
		<ul>
			<li>
				<p>DutyStatusMalfunctionType - Added - Malfunction or Diagnostic type of the DutyStatusLog.</p>
			</li>
			<li>
				<p>DutyStatusState - Added - The record status of DutyStatusLog.</p>
			</li>
		</ul>
	</div>
);

const update1707: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>Web Request Notifications: fix {'{'}zoneId{'}'} and {'{'}zoneComment{'}'} tokens would not get populated unless {'{'}zone{'}'} or {'{'}address{'}'} were also included.</p>
			</li>
			<li>
				<p>Documentation: API Reference updated to include default value and max length of object properties in their descriptions. Default values are automatically used when adding an entity and those properties have no value assigned (are null). For example, adding a Group with color = null, will add group with default color "Blue”. If a property has no default value, it is required when calling "Add”.</p>
			</li>
			<li>
				<p>Set operations now retain the value of missing (null) properties. A positive effect of this change is that is remedies a long existing issue that could occur when a server is a newer version (ex 5.7.1704) than client nuget package (ex 5.7.1701) which is making requests to it. The issue could arise when a new Enum value was added and exists only in the server's code base, not client client nuget package. When the unknown Enum was received by the client, it could not be deserialized into an Enum value and would throw an exception. Starting in nuget package version 5.7.1707.x, the unknown Enum value will be deserialiezed to null. This means the object can round trip” on "Set” because the server will now (starting at version 5.7.1707) fill in the null value with the existing saved value of the property.</p>
			</li>
			<li>
				<p>Added: JsonRpcError, JsonRpcErrorData - to better align JSON-RPC errors with the JSON-RPC 2.0 specification. Non-standard (now legacy) error properties have been deprecated. This should not affect nuget package users as the API.cs object serialized the JSON-RPC error results as Exceptions which are thrown. This may affect users consuming the raw JSON-RPC result of requests. It's recommended to update usages to the official, standardized, properties as outlined in the API Reference. Of note: the new objects exposes "requestIndex” property which is the index at which a "multicall” failed.</p>
			</li>
			<li>
				<p>Added: User/Driver objects now have property "IsDriver” to clearly indicate when a user is a driver. This also makes it easier to save a user who is no longer a driver, set the property to false and save.</p>
			</li>
			<li>
				<p>Added: FuelTaxDetail - A new entity which provides API access to calculated fuel tax data. In the past this data was only available via the IFTA Report in MyGeotab where it was calculated on the fly. Fuel tax details are now processed using live data and stored in the database and they can be access using the API via Get and GetFeed methods. Full documentation coming soon.</p>
			</li>
		</ul>
	</div>
);

//ToDo: Update helpdesk link
//ToDo: Update API Wrapper link (this links to my112.geotab.com...)
const update1706: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>DatabaseId has been removed from .net package as per the <a href="https://helpdesk.geotab.com/hc/en-us/community/posts/255601466--NET-SDK-ID-Object-Changes" target="_blank" rel="noopener noreferrer">December 2016 post</a></p>
			</li>
			<li>
				<p>DutyStatusLogType: Added: "Authority” <b><i>requires update of .net nuget package to ensure compatibility</i></b></p>
			</li>
			<li>
				<p>FuelTransaction: Added: "ExternalReference”</p>
			</li>
			<li>
				<p>FuelTransactionSearch: Added: "ExternalReference” and "Provider”</p>
			</li>
			<li>
				<p>User: Added: "AuthorityName” and "AuthorityAddress”</p>
			</li>
			<li>
				<p>GetFeed of Trip now includes stop point (woohoo!) <b>*requires server running 5.7.1706.x</b></p>
			</li>
			<li>
				<p><a href="https://my112.geotab.com/sdk/#/apiWrappers" aria-label="API clients section in SDK document" target="_blank" rel="noopener noreferrer">API Clients</a> section added to SDK documentation</p>
			</li>
			<li>
				<p>Geotab.Reflection package no longer a dependency of Geotab.Checkmate.Objectmodel nuget package</p>
			</li>
		</ul>
	</div>
);

const update1705: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>GO8: Added preliminary support for GO8 devices <b><i>requires update of .net nuget package to correctly read/write GO8 devices</i></b></p>
			</li>
			<li>
				<p>IoxAddOn: Added preliminary support for IoxAddOn, IoxAddOnSearch, SerialIoxContent,KnownIoxAddOnType, IoxOutputContent, MimeContent</p>
			</li>
			<li>
				<p>TextMessageSearch: Added search by: "ParentTextMessageId”</p>
			</li>
		</ul>
	</div>
);

const update1704: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>DutyStatusLog - Added property: State</p>
			</li>
			<li>
				<p>DutyStatusLogSearch - Added search by device groups</p>
			</li>
			<li>
				<p>API.cs is now compatible with System.Net.Http v4.3.1</p>
			</li>
			<li>
				<p>Fix, API.cs proxy support. New constructor that accepts HttpMessageHandler, deprecated constructor that accepts IWebProxy and Proxy property</p>
			</li>
			<li>
				<p>Fix, content type of API response headers changed from "text/html” to "application/json”</p>
			</li>
		</ul>
	</div>
);

const update1703: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>DevicePlan: Added: D2GODriverChallengeStandard <b><i>requires update of .net nuget package to ensure compatibility</i></b></p>
			</li>
			<li>
				<p>HosRuleSet.cs Added: America7DayNo34h, America8DayNo34h, AmericaShortHaulNo34h, AmericaShortHaul8DayNo34h, BrazilShortHaul <b><i>requires update of .net nuget package to ensure compatibility</i></b></p>
			</li>
			<li>
				<p>SecurityRole.cs Added: ReassignData <b><i>requires update of .net nuget package to ensure compatibility</i></b></p>
			</li>
			<li>
				<p>TimeZoneId: it was possible to add a user or device with "Unknown” time zone ID. This was only possible using the API and "Unknown” is not returned via the GetTimeZones method or a valid Olson time zone. The ability to add users and devices with "Unknown” as been removed and all users and devices with this time zone ID have been changed to "Etc/GMT”</p>
			</li>
		</ul>
	</div>
);

const update1702: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>FuelTransactionProvider: Added - "Voyager”, "UltramarCST”</p>
			</li>
			<li>
				<p>SecurityIdentifier: Added - "PurchaseMarketplacePaidItems” <b><i>requires update of .net nuget package to ensure compatibility</i></b></p>
			</li>
			<li>
				<p>SecurityRole: Added: "TripTypeChangeInsert”, "TripTypeChangeRemove”, "CustomReportSendError” <b><i>requires update of .net nuget package to ensure compatibility</i></b></p>
			</li>
			<li>
				<p>Fix: nuget package issue making API requests from Azure WebJob</p>
			</li>
			<li>
				<p>Fix: TimeZoneInfoAdjustmentRule serialization (result of GetDaylightSavingRules)</p>
			</li>
		</ul>
	</div>
);

const update1701: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>Added "Hardware” section to SDK</p>
			</li>
			<li>
				<p>Nuget: Replace usage of Microsoft.Net.Http with System.Net.Http (WebRequest ={'>'} HttpClient)</p>
			</li>
			<li>
				<p>DiagnosticSearch: Added DiagnosticType property to search by the type of diagnostic. Ex, only GoFault diagnostics.</p>
			</li>
			<li>
				<p>Added "ExpiredPasswordException” object. This exception can be thrown if a user makes a request while their ChangePassword flag is true. The user must change their password before they are able to successfully make further requests</p>
			</li>
			<li>
				<p>SecurityRole: Added "ReportHosAvailability” <b><i>requires update of .net nuget package to ensure compatibility</i></b></p>
			</li>
			<li>
				<p>If you are using the .net nuget package and plan to use the new "HOS Only” device plan you must update to nuget package version 5.7.1701 or greater to ensure compatibility.</p>
			</li>
		</ul>
	</div>
);

const update1612: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>Id refactoring - The ID object has been refactored in the .NET SDK. See <a href="https://helpdesk.geotab.com/hc/en-us/community/posts/255601466--NET-SDK-ID-Object-Changes" target="_blank" rel="noopener noreferrer">this forum post</a> for details.</p>
			</li>
			<li>
				<p>Updated description of GoCurveAuxiliary (GO4v3, GO6, GO7) properties: ImmobilizeUnit: With ImmobilizeUnit being true, it is used to define the delay before the driver identification reminder is sent out if the driver key has not been not swiped. The maximum value of this property is 255. When it is less or equal to 180, it indicates the number of seconds of the delay. When it is greater than 180, the delay increases 30 seconds for every increment of one of this property. For example, 180 indicates 180 seconds, 181 indicates 210 seconds, and 182 indicates 240 seconds. ImmobilizeArming: A value mainly used for enable or disable driver identification reminder. If it is used in conjunction with vehicle relay circuits, it can force the driver to swipe the driver key before starting the vehicle.</p>
			</li>
		</ul>
	</div>
);

//ToDo: Update SDK Concepts link
const update1611: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>Authentication rate limiting being phased in. See this <a href="https://www.geotab.com/blog/api-call-limits/" target="_blank" rel="noopener noreferrer">Blog Post</a> for more details. Added "Rate Limiting” section to <a href="/sdk/software/guides/concepts/">SDK Concepts</a>.</p>
			</li>
			<li>
				<p>KnownId - Added: "DiagnosticDieselExhaustFluidId”, ”DiagnosticDieselParticulateFilterLampId”, "DiagnosticPowerTakeoffEngagedId”, "DiagnosticPowerTakeoffTotalFuelUsedId”</p>
			</li>
			<li>
				<p>KnownId - Removed: "DiagnosticBluetoothBeaconOutOfRangeId”</p>
			</li>
			<li>
				<p>Trailer - Added "Groups” property. Trailers can now be added to groups.</p>
			</li>
			<li>
				<p>TrailerSearch - Added property groups. Search for Trailers that are members of these GroupSearch(s) one of it's children or one of it's parents.</p>
			</li>
			<li>
				<p>*SecurityIdentifier - Added: "RepairDVIR”</p>
			</li>
		</ul>
	</div>
);

const update1610: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>KnownId - Added: "DiagnosticDieselExhaustFluidId”, "DiagnosticDieselParticulateFilterLampId”, "DiagnosticPowerTakeoffEngagedId”, "DiagnosticPowerTakeoffTotalFuelUsedId”</p>
			</li>
			<li>
				<p>HosRuleSet - Added: "Florida7Day”, "Florida8Day”, "FloridaShortHaul7Day”, "FloridaShortHaul8Day”</p>
			</li>
		</ul>
		<h2>New objects</h2>
		<ul>
			<li>
				OverLimitException: Thrown when a user has exceeded the query limit of an API (currently only applies to authentication). Previously, if a user reached this limit, an InvalidUserException would have been thrown.
			</li>
		</ul>
	</div>
);

const update1609: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>KnownId - "DiagnosticRamFailure” name fixed to be "DiagnosticRamFailureId”</li>
		</ul>
	</div>
);

const update1608: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>MessageContentType - Added: "DriverWhiteList”</p>
			</li>
			<li>
				<p>DutyStatusLogType - Added: "PC” (Personal conveyance driver status), "YM” (Yard move driver status), "WT” (Wait time oil well driver status).</p>
			</li>
			<li>
				<p>FuelTransaction - Added "ProductType” property.</p>
			</li>
			<li>
				<p>FuelTransactionProvider - Added "WexLegacy”, "Fuelman” and "Comdata”.</p>
			</li>
			<li>
				<p>GoDevice - Added "GoTalkLanguage” property.</p>
			</li>
			<li>
				<p>User - Added "IsYardMoveEnabled” and "IsPersonalConveyanceEnabled” properties.</p>
			</li>
			<li>
				<p>HosRuleSet - Added "OilWell7Day”, "OilWell7DayBig”, "OilWell8Day”, "OilWell8DayBig”, "AmericaTexas”, "AmericaTexasShortHaul”, "OilTransportTexas”, "OilWellTexas”, "AmericaShortHaul8Day”, "AmericaShortHaulPassenger8Day”, "OilTransportShortHaul8Day”, "AmericaTexasShortHaul8Day”</p>
			</li>
			<li>
				<p>KnownId - Added "DiagnosticSystemAlertId”</p>
			</li>
			<li>
				<p>TimeZoneInfo - Adjusted to support recently updated Windows times zones and the latest version of <a href="http://www.unicode.org/cldr/charts/dev/supplemental/zone_tzid.html" target="_blank" rel="noopener noreferrer">IANA/Windows</a> mapped time zones. <a href="https://docs.google.com/document/d/1kjIhyqpgOg1wNHi3JkvV7uXVBzhl5stlZZxIVjXs1Fc/edit#" target="_blank" rel="noopener noreferrer">Click here for more info</a></p>
			</li>
		</ul>
		<h2>New objects</h2>
		<ul>
			<li>
				<p>DriverWhiteListContent</p>
			</li>
			<li>
				<p>GoTalkLanguage</p>
			</li>
			<li>
				<p>FuelTransactionProductType</p>
			</li>
		</ul>
		<p>For detailed information on new features please review the API Reference.</p>
		<p><i>*.Net users will require a dll update</i></p>
	</div>
);

const update1607: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				Performance and maintenance enhancements.
			</li>
		</ul>	
	</div>
);

const update1606: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>DiagnosticTypes - Added "GoFault”</p>
			</li>
			<li>
				<p>FuelTransactionProvider - Added "WexCustomer”, "Drive” and "FuelTracker”</p>
			</li>
			<li>
				<p>SecurityIdentifier - Added "EventOccurrenceList”,”ViewCertificates”,”ManageCertificates”</p>
			</li>
			<li>
				<p>HosRuleSet - Added "AmericaSalesperson”</p>
			</li>
			<li>
				<p>.Net: MachineSettings - Fix to work with ASP.Net Web API projects</p>
			</li>
			<li>
				<p>.Net: DataToComponenet - Updated "Equals” method to compare payloads for equality</p>
			</li>
			<li>
				<p>.Net: DutyStatusOrigin - removed unused "Serializable” attribute</p>
			</li>
			<li>
				<p>.Net - Changes in API.cs to use HttpClient instead of HttpWebRequest in order to support .Net core in the future.</p>
			</li>
			<li>
				<p>dll requires .Net Framework version v4.6+</p>
			</li>
		</ul>
		<h2>New APIs</h2>
		<ul>
			<li>
				<p>GetDirections</p>
			</li>
			<li>
				<p>OptimizeWaypoints</p>
			</li>
		</ul>
		<h2>New objects</h2>
		<ul>
			<li>
				<p>Directions</p>
			</li>
			<li>
				<p>Leg</p>
			</li>
			<li>
				<p>Step</p>
			</li>
			<li>
				<p>Waypoint</p>
			</li>
		</ul>
		<p><i>*.Net users will require a dll update</i></p>		
	</div>
);

const update1605: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				Added new Units of Measure (km/L, kg/km, L/lane km, L/ton and g/m^2) ** .Net users will require a dll update*
			</li>
		</ul>
	</div>
);

const update1604: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>For security reasons, TLS 1.2 is being enforced on all servers. To fix the integration, please update to at least .NET 4.5 and use the <a href="https://www.nuget.org/packages/Geotab.Checkmate.ObjectModel/" target="_blank" rel="noopener noreferrer">latest nuget package</a>. For more information, please visit the <a href="https://helpdesk.geotab.com/entries/108236723-TLS1-2-Upgrade-Notice" target="_blank" rel="noopener noreferrer">forum discussion</a>.</p>
			</li>
			<li>
				<p>Driver has a new property: viewDriversOwnDataOnly. When set to true, a driver gains the ability to view their own driving data. ** .Net users will require a dll update*</p>
			</li>
		</ul>
	</div>
);

const update1602: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				TextToSpeechContent has been renamed to GoTalkContent and RelayContent has been renamed to IoxOutputContent ** .Net users will require a dll update*
			</li>
		</ul>
	</div>
);
 
const update1601: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>New recipient types added that will send even if there is a delay in data. (BeepTenTimesRapidlyAllowDelay, BeepThreeTimesAllowDelay, BeepThreeTimesRapidlyAllowDelay , TextToSpeechAllowDelay) ** .Net users will require a dll update*</p>
			</li>
			<li>
				<p>Access to third party messages via API. ** .Net users will require a dll update*</p>
			</li>
		</ul>
		<h2>New objects</h2>
		<ul>
			<li>
				<p>IoxAddOn</p>
			</li>
			<li>
				<p>KnownIoxAddOnType</p>
			</li>
			<li>
				<p>IoxAddOnSearch</p>
			</li>
			<li>
				<p>IoxOutputContent</p>
			</li>
			<li>
				<p>GoTalkContent</p>
			</li>
		</ul>
	</div>
);

const update1512: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>Fixed operator overloading for Id object in .Net dll (id1 == id2 is the same as id1.Equals(id2)) - <i>*If you are using dll version 5.7.1508-1511 this will require a dll update.</i></p>
			</li>
			<li>
				<p>New addin: Trips Streetview added to <a href="https://github.com/Geotab/addin-trips-streetview" target="_blank" rel="noopener noreferrer">GitHub</a></p>
			</li>
		</ul>
	</div>
);

const update1511: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>Added new security clearances for:</p>
				<ul>
					<li>
						<p>ViewMarketplacePaidItems: Allow user to see paid Marketplace items</p>
					</li>
					<li>
						<p>DeviceAdminDeleteUnplugReplace: Access to removing vehicle, unpluging device, and replacing device.</p>
					</li>
				</ul>
			</li>
		</ul>
		<p><i>*If you are using dll version 5.7.1508-1510 this will require a dll update.</i></p>
	</div>
);

//ToDo: Update reference link
const update1509: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>New SDK. Featuring the new <a href="https://geotab.github.io/sdk/software/api/runner.html" target="_blank" rel="noopener noreferrer">SDK Runner</a>, new methods and objects (<a href="https://geotab.github.io/sdk/software/api/reference/" target="_blank" rel="noopener noreferrer">click here to see the preview items</a>)</p>
			</li>
			<li>
				<p>Code snippets in the reference documentation. Now you can see working examples of the methods as they are used in the runner.</p>
			</li>
			<li>
				<p>.Net users will require a .DLL update to access the latest features.</p>
			</li>
		</ul>
		<h2>New methods</h2>
		<ul>
			<li>
				<p>CreateDatabase</p>
			</li>
			<li>
				<p>DatabaseExists</p>
			</li>
			<li>
				<p>GenerateCaptcha</p>
			</li>
			<li>
				<p>GetVersionInformation</p>
			</li>
		</ul>
		<h2>New objects</h2>
		<ul>
			<li>
				<p>AnnotationLog</p>
			</li>
			<li>
				<p>AnnotationLogSearch</p>
			</li>
			<li>
				<p>CaptchaAnswer</p>
			</li>
			<li>
				<p>CaptchaException</p>
			</li>
			<li>
				<p>Color</p>
			</li>
			<li>
				<p>CompanyDetails</p>
			</li>
			<li>
				<p>DVIRLog</p>
			</li>
			<li>
				<p>DVIRLogSearch</p>
			</li>
			<li>
				<p>DiagnosticCategory</p>
			</li>
			<li>
				<p>DistributionList</p>
			</li>
			<li>
				<p>DuplicateException</p>
			</li>
			<li>
				<p>DutyStatusAvailability</p>
			</li>
			<li>
				<p>DutyStatusAvailabilityDuration</p>
			</li>
			<li>
				<p>DutyStatusAvailablitySearch</p>
			</li>
			<li>
				<p>DutyStatusLog</p>
			</li>
			<li>
				<p>DutyStatusLogSearch</p>
			</li>
			<li>
				<p>DutyStatusLogType</p>
			</li>
			<li>
				<p>DutyStatusViolation</p>
			</li>
			<li>
				<p>DutyStatusViolationSearch</p>
			</li>
			<li>
				<p>DutyStatusViolationType</p>
			</li>
			<li>
				<p>EntityWithVersion</p>
			</li>
			<li>
				<p>FuelEconomyUnit</p>
			</li>
			<li>
				<p>FuelEvent</p>
			</li>
			<li>
				<p>FuelTransaction</p>
			</li>
			<li>
				<p>FuelTransactionProvider</p>
			</li>
			<li>
				<p>HosRuleSet</p>
			</li>
			<li>
				<p>IncludeGroups</p>
			</li>
			<li>
				<p>InvalidMyAdminUserException</p>
			</li>
			<li>
				<p>MapView</p>
			</li>
			<li>
				<p>NameEntity</p>
			</li>
			<li>
				<p>NameEntityWithVersion</p>
			</li>
			<li>
				<p>RadioDownloaderSearch</p>
			</li>
			<li>
				<p>Recipient</p>
			</li>
			<li>
				<p>RecipientType</p>
			</li>
			<li>
				<p>RegistrationException</p>
			</li>
			<li>
				<p>Search</p>
			</li>
			<li>
				<p>ShipmentLog</p>
			</li>
			<li>
				<p>ShipmentLogSearch</p>
			</li>
			<li>
				<p>TextMessageContentType</p>
			</li>
			<li>
				<p>Trailer</p>
			</li>
			<li>
				<p>TrailerAttachment</p>
			</li>
			<li>
				<p>TrailerAttachmentSearch</p>
			</li>
			<li>
				<p>TrailerSearch</p>
			</li>
			<li>
				<p>VersionInformation</p>
			</li>
			<li>
				<p>VolumeUnit</p>
			</li>
		</ul>
		<h2>Deprecated</h2>
		<ul>
			<li>
				<p>BingMapStyle</p>
			</li>
			<li>
				<p>EngineType</p>
			</li>
			<li>
				<p>EngineTypeSearch</p>
			</li>
			<li>
				<p>StatusDataRequestContent</p>
			</li>
		</ul>
	</div>
);

//ToDo: Update reference link
const update1508: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>DriverChangeSearch received new search points including: DeviceSearch, DriverSearch, FromDate and ToDate. Checkout the <a href="/sdk/software/api/reference/">API Reference</a> for more details</p>
			</li>
			<li>
				<p>DistributionList is now supported by the API. Checkout the <a href="/sdk/software/api/reference/">API Reference</a> for more details. Some related objects are still pending support (Notification, NotificationTemplate, BinaryData)</p>
			</li>
			<li>
				<p><a href="https://github.com/Geotab/sdk-addin-samples" aria-label="Add-In examples in SDK documentation" target="_blank" rel="noopener noreferrer">Add-In examples</a> have been added to SDK documentation</p>
			</li>
			<li>
				<p>When searching for Zones you can now specify a traversal method of the group tree. You can choose to include just the specified element, just the ancestors, just the descendants, or both ancestors and descendants. See the ZoneSearch object in the <a href="/sdk/software/api/reference/">API Reference</a> for more details</p>
			</li>
			<li>
				<p>Fix documentation for object properties</p>
			</li>
			<li>
				<p>Added KnownIds: DiagnosticDeviceTotalIdleFuel</p>
			</li>
			<li>
				<p>Added FuelTransaction API (<i>Beta</i>)</p>
			</li>
			<li>
				<p>HOS/DVIR objects supported in API. Key objects are AnnotationLog, DVIRLog, DutyStatusAvailability, DutyStatusLog, DutyStatusViolation, and ShipmentLog. Check out the <a href="/sdk/software/api/reference/">API Reference</a> for more details</p>
			</li>
			<li>
				<p>Added Groups property to StatusDataSearch. This allows searching for status data for devices in the supplied groups. This does not return interpolated results</p>
			</li>
			<li>
				<p>Added from/to date search to UserSearch object. Checkout the <a href="/sdk/software/api/reference/">API Reference</a> for more details</p>
			</li>
			<li>
				<p><a href="/sdk/software/api/reference/">API Reference</a>, objects now show properties from inherited classes. For example GoDevice extends Device and will show properties of GoDevice and Device in the documentation</p>
			</li>
			<li>
				<p>Geotab Announces New <a href="https://www.geotab.com/dev-channel/" target="_blank" rel="noopener noreferrer">DEV Channel</a> for Developers</p>
			</li>
		</ul>
	</div>
);

const update1505: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				New condition types added - .Net will require dll update
			</li>
		</ul>
	</div>
);

const update1504: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				Add KnownId for DiagnosticDeviceTotalIdleFuelId - .Net will require dll update
			</li>
		</ul>
	</div>
);


//ToDo: Need Faizan's feedback on these forum post URLs
//ToDo: Update reference link
const update1502: ReactNode = (
	<div className="paragraph">
		<ul>
			<li>
				<p>Get <i>all</i> zones now populating points correctly (<a href="https://helpdesk.geotab.com/entries/26004844-Get-Zone-return-distinct-points" aria-label="forum post about zones populating points correctly" target="_blank" rel="noopener noreferrer">see forum post</a>)</p>
			</li>
			<li>
				<p>Fixed TimeZoneInfo isDaylightSavingsSupported always false using .Net API client</p>
			</li>
			<li>
				<p>Units of measure have been converted to use Known Id's (<a href="https://helpdesk.geotab.com/entries/52897090-MyGeotab-SDK-Update-KnownId" aria-label="forum post about using known Ids" target="_blank" rel="noopener noreferrer">see forum post</a>)</p>
			</li>
			<li>
				<p>Adding, setting and removing of some entities has been disabled via the API. Exception Event, Trip, Status Data, Fault Data, Log Record with exceptions for adding odometer and engine hours adjustments and dismissing faults</p>
			</li>
			<li>
				<p>Clearer documentation of date and long values in <a href="../reference">API Reference</a></p>
			</li>
			<li>
				<p>Data Feed section added to Guides portion of SDK (<a href="https://docs.google.com/document/d/1LJfb57qyBX2WklnqioHtlWkYN9xKBWxA_FIpaJzjKyY/edit" target="_blank" rel="noopener noreferrer">see document</a>)</p>
			</li>
		</ul>
	</div>
);

const pageTitle: PageTitleProps = {
	"title": "RELEASE NOTES",
	"breadCrumbItems": ["MYG", "RELEASE NOTES"]
};

const pageSections: TableOfContentsItem[] = [
	{
		"elementId": "11.0",
		"summary": "11.0",
		"details": update11
	},
	{
		"elementId": "10.0",
		"summary": "10.0",
		"details": update10
	},
	{
		"elementId": "9.0",
		"summary": "9.0",
		"details": update9
	},
	{
		"elementId": "8.0",
		"summary": "8.0",
		"details": update8
	},
	{
		"elementId": "7.0",
		"summary": "7.0",
		"details": update7
	},
	{
		"elementId": "6.0",
		"summary": "6.0",
		"details": update6
	},
	{
		"elementId": "2104",
		"summary": "5.7.2104",
		"details": update2104
	},
	{
		"elementId": "2103",
		"summary": "5.7.2103",
		"details": update2103
	},
	{
		"elementId": "2102",
		"summary": "5.7.2102",
		"details": update2102
	},
	{
		"elementId": "2101",
		"summary": "5.7.2101",
		"details": update2101
	},
	{
		"elementId": "2004",
		"summary": "5.7.2004",
		"details": update2004
	},
	{
		"elementId": "2003",
		"summary": "5.7.2003",
		"details": update2003
	},
	{
		"elementId": "2002",
		"summary": "5.7.2002",
		"details": update2002
	},
	{
		"elementId": "2001",
		"summary": "5.7.2001",
		"details": update2001
	},
	{
		"elementId": "1904",
		"summary": "5.7.1904",
		"details": update1904
	},
	{
		"elementId": "1903",
		"summary": "5.7.1903",
		"details": update1903
	},
	{
		"elementId": "1902",
		"summary": "5.7.1902",
		"details": update1902
	},
	{
		"elementId": "1901",
		"summary": "5.7.1901",
		"details": update1901
	},
	{
		"elementId": "1804Dot1",
		"summary": "5.7.1804.1",
		"details": update1804Dot1
	},
	{
		"elementId": "1804",
		"summary": "5.7.1804",
		"details": update1804
	},
	{
		"elementId": "1803",
		"summary": "5.7.1803",
		"details": update1803
	},
	{
		"elementId": "1802",
		"summary": "5.7.1802",
		"details": update1802
	},
	{
		"elementId": "1801",
		"summary": "5.7.1801",
		"details": update1801
	},
	{
		"elementId": "1712",
		"summary": "5.7.1712",
		"details": update1712
	},
	{
		"elementId": "1711",
		"summary": "5.7.1711",
		"details": update1711
	},
	{
		"elementId": "1709",
		"summary": "5.7.1709",
		"details": update1709
	},
	{
		"elementId": "1707",
		"summary": "5.7.1707",
		"details": update1707
	},
	{
		"elementId": "1706",
		"summary": "5.7.1706",
		"details": update1706
	},
	{
		"elementId": "1705",
		"summary": "5.7.1705",
		"details": update1705
	},
	{
		"elementId": "1704",
		"summary": "5.7.1704",
		"details": update1704
	},
	{
		"elementId": "1703",
		"summary": "5.7.1703",
		"details": update1703
	},
	{
		"elementId": "1702",
		"summary": "5.7.1702",
		"details": update1702
	},
	{
		"elementId": "1701",
		"summary": "5.7.1701",
		"details": update1701
	},
	{
		"elementId": "1612",
		"summary": "5.7.1612",
		"details": update1612
	},
	{
		"elementId": "1611",
		"summary": "5.7.1611",
		"details": update1611
	},
	{
		"elementId": "1610",
		"summary": "5.7.1610",
		"details": update1610
	},
	{
		"elementId": "1609",
		"summary": "5.7.1609",
		"details": update1609
	},
	{
		"elementId": "1608",
		"summary": "5.7.1608",
		"details": update1608
	},
	{
		"elementId": "1607",
		"summary": "5.7.1607",
		"details": update1607
	},
	{
		"elementId": "1606",
		"summary": "5.7.1606",
		"details": update1606
	},
	{
		"elementId": "1605",
		"summary": "5.7.1605",
		"details": update1605
	},
	{
		"elementId": "1604",
		"summary": "5.7.1604",
		"details": update1604
	},
	{
		"elementId": "1602",
		"summary": "5.7.1602",
		"details": update1602
	},
	{
		"elementId": "1601",
		"summary": "5.7.1601",
		"details": update1601
	},
	{
		"elementId": "1512",
		"summary": "5.7.1512",
		"details": update1512
	},
	{
		"elementId": "1511",
		"summary": "5.7.1511",
		"details": update1511
	},
	{
		"elementId": "1509",
		"summary": "5.7.1509",
		"details": update1509
	},
	{
		"elementId": "1508",
		"summary": "5.7.1508",
		"details": update1508
	},
	{
		"elementId": "1505",
		"summary": "5.7.1505",
		"details": update1505
	},
	{
		"elementId": "1504",
		"summary": "5.7.1504",
		"details": update1504
	},
	{
		"elementId": "1502",
		"summary": "5.7.1502",
		"details": update1502
	}
];

export default function ReleaseNotes() {
    return (
		<Page section={HeaderSections.MyGeotab} pageTitle={pageTitle} tableOfContents={pageSections}>
			{pageSections.map((section) => <Accordion summary={section.summary} p={section.details} id={section.elementId}/>)}
		</Page>
    );
};