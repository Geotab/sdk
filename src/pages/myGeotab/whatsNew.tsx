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
		<p>Administrator clearance will remain non-editable and have all custom clearances enabled by default. All other default/system clearance levels only allow editing of custom security identifiers, while keeping the system defined default identifiers non-editable.</p>
		<p><b>* NOTE</b>: By default, once the <code className="small-code-name">enableViewSecurityId</code> property in the configuration.json for an Add-in is set to True, a View “Add-in name” add-in identifier is created that must be enabled for users to be able to view the Add-in. More granular control needs to be set within the Add-in code for any custom identifiers added to the configuration.json.</p>
		<h2>IP Rate LimitsPermalink</h2>
		<ul>
			<li>
				Added new rate limits for API requests for endpoints that do not require authentication. See <a href="https://docs.google.com/document/d/1sUKaOKjVT23qvaCITMseIMqGUhQzlr7xDhq1EjrseYE/edit#heading=h.ygvbrm3xiv4u">this announcement</a> for more information.
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
				Added the optional  <code className="small-code-sample">PropertySelector</code> parameter that is used with the <code className="small-code-sample">Get</code> and <code className="small-code-sample">GetFeed</code> methods to include or exclude specific properties for entity types requested. Detailed information can be found on the <a href="https://geotab.github.io/sdk/software/guides/concepts/#propertyselector-beta">Geotab Developers</a> site.
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

const Update8: ReactNode = (
	<div className="paragraph" id="8.0">
		<h2>Special Note About Trailer And Device</h2>
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
				If the Customer wants only vehicles to be returned when calling Get Device, and not trailers, they should specify groupSearch: <code className="small-code-sample">{'{“id”:”GroupVehicleId”}'}</code>.
			</li>
			<li>
				Calling Add Trailer with the <code className="small-code-sample">GroupTrailerId</code> or <code className="small-code-sample">GroupVehicleId</code> built-in groups will throw an error.
			</li>
		</ul>
		<InformationalBox>
			<p><b>! IMPORTANT</b>: Calling Set Device and removing the <code className="small-code-sample">GroupVehicleId</code> or <code className="small-code-sample">GroupTrailerId</code> built-in groups will prevent the vehicle or trailer from being shown on the relevant selection screens on the Drive App. Calling Set Device and switching the group from <code className="small-code-sample">GroupTrailerId</code> built-in group to <code className="small-code-sample">GroupVehicleId</code> built-in group or vice versa will not be allowed. This is a temporary restriction in the 8.0 release, and we intend to remove this check in a future release.</p>
		</InformationalBox>
		<p>See <a href="https://docs.google.com/presentation/d/1C0CBY4qaJKHx3J-fdB-YZzxbilQoleqjv8WsyFIZhEE/edit#slide=id.gdb284aa95f_0_61">this slide deck</a> to understand more about why this change was made, and how this may impact you.</p>
		<h2>Special Note About EV Powertrain Groups</h2>
		<p>This new built-in group structure automatically classifies electric vehicles (EV) based on their unique powertrain types: Plug-in Hybrid (PHEV), Battery Electric Vehicle (BEV), or Fuel Cell Electric Vehicle (FCEV). <a href="https://docs.google.com/document/d/1W9_Y1XukkaRKQDfJ-RH2YsUptSkUPazx_E4UjfOcKoU/edit">See MyGeotab Version 8.0 SDK Announcement - New built-in groups for EV powertrain identification for additional details.</a></p>
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
				Improved description of <code className="small-code-sample">GroupRelations</code> in <a href="https://geotab.github.io/sdk/software/api/reference/">API Reference</a>.
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
		<h3>Nuget Package</h3>
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

const Update7: ReactNode = (
	<div className="paragraph" id="7.0">
		<h2>Security Updates</h2>
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
		<h2>Password Policies</h2>
		<ul>
			<li>
				User passwords will now be validated against a list of common passwords. If it is a common password, a <code className="small-code-sample">PasswordPolicyViolationException</code> is returned.
			</li>
			<li>
				User passwords will now be validated against username, first name, and last name. If it contains a username, first name, last name, a <code className="small-code-sample">PasswordPolicyViolationException</code> is returned. This method can no longer be disabled.
			</li>
		</ul>
		<h2>User Policies</h2>
		<ul>
			<li>
				The maximum number of active sessions for a user on a single database has been lowered to 100. Active sessions are a rolling list sorted by date and time. When the number of active sessions reaches 100, a new session is added, and the oldest session is removed from the list (expired).
			</li>
		</ul>
		<h2>General Updates</h2>
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
		<h2>Coming Soon</h2>
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

const Update6: ReactNode = (
	<div className="paragraph" id="6.0">
		<ul>
			<li>
				Changed the software version naming convention to use three parts (e.g. 6.0.0) from four parts (e.g. 5.7.2104.0). To learn more, <a href="https://community.geotab.com/s/feed/0D52J00008j4IghSAE?language=en_US">click here</a>.
			</li>
			<li>
				Added <a href="">WifiHotspot</a> capability, with Interface to configure hotspot settings on telematics devices.
			</li>
			<li>
				The MyAdmin SDK is now available from <a href="">the SDK</a>. All pages are in the process of being converted to Markdown format.
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

const Update2104: ReactNode = (
	<div className="paragraph" id="2104">
		<h2>JSON Serializer Change In 5.7.2103</h2>
		<p>Post-release update: it was recently uncovered within our development team that as of MyGeotab release 5.7.2103, the JSON Serializer responsible for parsing API calls has changed to no longer allow single quote (‘) usage within the call parameters. Integrators should now solely use double quotes (“) for this purpose. The expected error result for single quote usage with this change is as follows:</p>
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
}></CodeSample>
		<p>The new Serializer logic only accepts property names and string values in double quotes because that format is required by the <a href="https://datatracker.ietf.org/doc/html/rfc8259">RFC8259</a> specification and is the only format considered to be valid JSON.</p>
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
				<code className="small-code-sample">IsHidden</code> is a boolean value indicating whether a defect is hidden in the UI. Used to determine if “other” should be shown or not.
			</li>
			<li>
				<code className="small-code-sample">IsRequired</code> is a boolean value indicating whether a defect must be signed off. Used to determine if the part must be explicitly marked as having defect(s) or not.
			</li>
		</ul>
	</div>
);

const Update2103: ReactNode = (
	<div className="paragraph" id="2103">
		<h2>JSON Serializer Change</h2>
		<p>The JSON Serializer responsible for parsing API calls has changed to no longer allow single quote (‘) usage within the call parameters. Integrators should now solely use double quotes (“) for this purpose. The expected error result for single quote usage with this change is as follows:</p>
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
}></CodeSample>
		<p>The new Serializer logic only accepts property names and string values in double quotes because that format is required by the <a href="https://datatracker.ietf.org/doc/html/rfc8259">RFC8259</a> specification and is the only format considered to be valid JSON.</p>
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
		<h2>Drive Add-In Photos</h2>
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
		<p><a href="https://github.com/Geotab/generator-addin">Generator-addin</a> updated to mock drive add-in camera API features.</p>
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
	},
	{
		"elementId": "8.0",
		"summary": "8.0",
		"details": Update8
	},
	{
		"elementId": "7.0",
		"summary": "7.0",
		"details": Update7
	},
	{
		"elementId": "6.0",
		"summary": "6.0",
		"details": Update6
	},
	{
		"elementId": "2104",
		"summary": "5.7.2104",
		"details": Update2104
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