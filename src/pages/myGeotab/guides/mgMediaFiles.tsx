import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";
import "../../../pages/pages.scss";
import InformationalBox from "../../../components/InformationalBox/InformationalBox";

const objectModel: ReactNode = (
  <div className="paragraph">
    <h3>MediaFile</h3>
    <div className="mgMediaFiles__table-container">
      <table className="mgMediaFiles__table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>string</td>
            <td>The unique identifier.</td>
          </tr>
          <tr>
            <td>version</td>
            <td>string</td>
            <td>Entity version. Read-only.</td>
          </tr>
          <tr>
            <td>name*</td>
            <td>string</td>
            <td>
              File name. Must have extension. Max 128 characters. All lower
              case. Required. Unique.
            </td>
          </tr>
          <tr>
            <td>mediaType</td>
            <td>string</td>
            <td>
              Describes the type of media. Read- only.{" "}
              <code className="small-code-sample">Video</code>,{" "}
              <code className="small-code-sample">Image</code>
            </td>
          </tr>
          <tr>
            <td>status</td>
            <td>string</td>
            <td>
              Describes the processing status of the file. Read-only.{" "}
              <code className="small-code-sample">NoFile</code>,{" "}
              <code className="small-code-sample">Processing</code>,{" "}
              <code className="small-code-sample">Ready</code>
            </td>
          </tr>
          <tr>
            <td>solutionId*</td>
            <td>string</td>
            <td>The unique identifier of the solution. Required.</td>
          </tr>
          <tr>
            <td>fromDate</td>
            <td>ISO UTC date time string</td>
            <td>The from date of the media. Default[UTC now]</td>
          </tr>
          <tr>
            <td>toDate</td>
            <td>ISO UTC date time string</td>
            <td>The from date of the media. Default[fromDate]</td>
          </tr>
          <tr>
            <td>device</td>
            <td>object[Device]</td>
            <td>The device associated to the media.</td>
          </tr>
          <tr>
            <td>driver</td>
            <td>object[Driver]</td>
            <td>The driver associated to the media.</td>
          </tr>
          <tr>
            <td>metaData</td>
            <td>object</td>
            <td>
              Free JSON field. Max 10,000 character JSON limit. Property names
              cannot start with "geotab".
            </td>
          </tr>
          <tr>
            <td>thumbnails</td>
            <td>array[MediaFile]</td>
            <td>
              The list of other media files serving as the thumbnails for this
              media file. Max 5 thumbnails.
            </td>
          </tr>
          <tr>
            <td>tags</td>
            <td>array[Tag]</td>
            <td>The list of tags used to classify the media. Max 10 tags.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>*Required when adding</p>
    <h4>Solution Id</h4>
    <p>
      A SolutionId must be created before the Storage API methods can be used
      within your solution. This encoded GUID is used to register and identify
      which solution some data is associated with. SolutionId is a mandatory
      parameter when calling MediaFile Add, optionally with Get. This allows
      each solutions' data to be isolated from the data used by other solutions.
      This allows multiple solutions to each have their own collection of
      MediaFile objects in the same database without the collections mixing. To
      generate your own SolutionId, please use following{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://geotab.github.io/sdk/software/api/runner.html#sample:generate-addin-guid"
      >
        example
      </a>
      .
    </p>
    <InformationalBox>
      <p>
        SolutionId and AddInId are interchangeable. If you have an add-in or
        integration which uses both AddInData and MediaFile you are encouraged
        to use a single SolutionId/AddInId.
      </p>
    </InformationalBox>
    <h3>MediaFileSearch</h3>
    <div className="mgMediaFiles__table-container">
      <table className="mgMediaFiles__table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Id</td>
            <td>object[Id]</td>
            <td>
              Search for a single MediaFile by{" "}
              <code className="small-code-sample">Id</code>.
            </td>
          </tr>
          <tr>
            <td>deviceSearch</td>
            <td>object[DeviceSearch]</td>
            <td>
              Search for MediaFile records relating to this DeviceSearch Id.
              Available DeviceSearch options are:{" "}
              <code className="small-code-sample">Id</code> and{" "}
              <code className="small-code-sample">Groups</code>.
            </td>
          </tr>
          <tr>
            <td>driverSearch</td>
            <td>object[DriverSearch]</td>
            <td>
              Search for MediaFile records relating to this DriverSearch Id.
              Available DeviceSearch options are:{" "}
              <code className="small-code-sample">Id</code>.
            </td>
          </tr>
          <tr>
            <td>fromDate</td>
            <td>ISO UTC date time string</td>
            <td>
              Search for MediaFile records that were logged at this date or
              after.
            </td>
          </tr>
          <tr>
            <td>toDate</td>
            <td>ISO UTC date time string</td>
            <td>
              Search for MediaFile records that were logged at this date or
              before.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3>Tag</h3>
    <div className="mgMediaFiles__table-container">
      <table className="mgMediaFiles__table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Id</td>
            <td>string</td>
            <td>GUID backed unique identifier.</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>string</td>
            <td>Entity version. Read-only.</td>
          </tr>
          <tr>
            <td>Name*</td>
            <td>string</td>
            <td>
              File name. Must have extension. Max 1024 characters. All lower
              case. Required. Unique.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>*Required when adding</p>
    <h3>Thumbnails</h3>
    <p>
      A media file can reference a list of up to 5 other media files which serve
      as the thumbnail for it via the{" "}
      <code className="small-code-sample">MediaFile.Thumbnails</code>{" "}
      collection. For example a video media file can reference a jpeg file which
      serves as it's thumbnail.
    </p>
    <h3>Tags</h3>
    <p>
      Generic <code className="small-code-sample">Tags</code> can be linked to
      media files. Tags can be used to categorizing "like" media.
    </p>
    <InformationalBox>
      <p>
        Searching for media by <code className="small-code-sample">Tag</code> is
        not yet implemented.
      </p>
    </InformationalBox>
  </div>
);

const supportedFileTypes: ReactNode = (
  <div className="paragraph">
    <div className="mgMediaFiles__table-container">
      <table className="mgMediaFiles__table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Extension</th>
            <th>Content-Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Video</td>
            <td>mp4</td>
            <td>video/mp4</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>jpeg</td>
            <td>image/jpeg</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>png</td>
            <td>image/png</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>gif</td>
            <td>image/gif</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>webp</td>
            <td>image/webp</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const security: ReactNode = (
  <div className="paragraph">
    <h3>Credentials</h3>
    <p>
      Credentials are required for all{" "}
      <code className="small-code-sample">MediaFile</code> and{" "}
      <code className="small-code-sample">Tag</code> related requests.
    </p>
    <h3>Security Clearances</h3>
    <p>
      There are two security clearances applying to media files. By default only
      administrator clearance will be able to modify files, while clearances
      derived from view only will be able to view files. SecurityIdentifier:{" "}
      <code className="small-code-sample">ViewMedia</code>,{" "}
      <code className="small-code-sample"> ManageMedia</code>.
    </p>
    <h3>Scope</h3>
    <p>
      Scope is evaluated by the scope of the requesting user to the linked
      entity(s) (<code className="small-code-sample">Device</code> and/or{" "}
      <code className="small-code-sample">Driver</code>) of the media file. A
      media file with no linked entity will be visible to any user in the
      database regardless of scope (requiring{" "}
      <code className="small-code-sample">ViewMedia</code> clearance).
    </p>
  </div>
);

const api: ReactNode = (
  <div className="paragraph">
    <div className="mgMediaFiles__table-container">
      <table className="mgMediaFiles__table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Parameters</th>
            <th>Returns</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Add[MediaFile]</td>
            <td>entity:object[MediaFile]</td>
            <td>string[Id]</td>
            <td>File is added via separate API. Status = NoFile.</td>
          </tr>
          <tr>
            <td>Set[MediaFile]</td>
            <td>entity:object[MediaFile]</td>
            <td>void</td>
            <td>Updates MediaFile entity, not file.</td>
          </tr>
          <tr>
            <td>Remove[MediaFile]</td>
            <td>entity:object[MediaFile]</td>
            <td>void</td>
            <td>Removes file and MediaFile entity.</td>
          </tr>
          <tr>
            <td>Get[MediaFile]</td>
            <td>resultsLimit:long,search:object[MediaFileSearch]</td>
            <td>array[MediaFile]</td>
            <td>Gets only MediaFile entity.</td>
          </tr>
          <tr>
            <td>GetFeed[MediaFile]</td>
            <td>resultsLimit:long,fromVersion:long</td>
            <td>object[FeedResult]</td>
            <td>Gets a feed of only media file entity.</td>
          </tr>
          <tr>
            <td>DownloadMediaFile</td>
            <td>mediaFile:object[MediaFile]</td>
            <td>stream[File]</td>
            <td>
              Content type determined by file extension. Range headers
              supported.
            </td>
          </tr>
          <tr>
            <td>UploadMediaFile</td>
            <td>mediaFile:object[MediaFIle],stream</td>
            <td>void</td>
            <td>
              Media file entity must already be added. Content-Type
              “multipart/form-data”. Not “application/json”
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3>Add</h3>
    <p>Adding a media file requires two steps:</p>
    <p>
      First, adding the <code className="small-code-sample">MediaFile</code>{" "}
      entity using the generic <code className="small-code-sample">Add</code>{" "}
      method. The result of adding is the unique identifier (
      <code className="small-code-sample">Id</code>) of the added{" "}
      <code className="small-code-sample">MediaFile</code>. When the media file
      has been added but there is no binary uploaded the{" "}
      <code className="small-code-sample">MediaFile.Status</code> will be{" "}
      <code className="small-code-sample">NoFile</code>.
    </p>
    <p>
      Second, uploading the <code className="small-code-sample">MediaFile</code>{" "}
      binary using the{" "}
      <code className="small-code-sample">UploadMediaFile</code> API specifying
      the <code className="small-code-sample">MediaFile</code> it relates to by{" "}
      <code className="small-code-sample">Id</code> in the JSON-RPC request.
      After a file is uploaded the{" "}
      <code className="small-code-sample">MediaFile.Status</code> will
      transition to <code className="small-code-sample">Processing</code> then{" "}
      <code className="small-code-sample">Ready</code>.
    </p>
    <InformationalBox>
      <p>
        <code className="small-code-sample">Processing</code> state is available
        but currently unused.
      </p>
    </InformationalBox>
    <h3>Get</h3>
    <p>Like Add, Get requires two steps:</p>
    <p>
      First, search for <code className="small-code-sample">MediaFile</code>{" "}
      using <code className="small-code-sample">MediaFileSearch</code> to
      provide search arguments.
    </p>
    <p>
      Second, download the binary using the{" "}
      <code className="small-code-sample">DownloadMediaFile</code> method
      providing the <code className="small-code-sample">Id</code> of the media
      file.
    </p>
  </div>
);

const limits: ReactNode = (
  <div className="paragraph">
    <h3>Result Limit</h3>
    <p>
      A maximum of 10,000 MediaFile objects will be returned from Get:MediaFile
      and/or GetFeed:MediaFile requests.
    </p>
    <h3>Rate Limit</h3>
    <p>
      <b>:MediaFile</b> 1000 requests per minute, per user
    </p>
    <p>
      <b>
        GetFeed:MediaFile, Add:MediaFile, Set:MediaFile, Remove:MediaFile
      </b>{" "}
      60 requests per minute, per user
    </p>
    <p>
      <b>DownloadMediaFile</b> 240 file download requests per minute,
      per user
    </p>
    <p>
      <b>UploadMediaFile</b> 60 file upload requests per minute, per
      user 10,000 file uploads per day, per user
    </p>
    <h3> Size Limit</h3>
    <p>
      Image files (.png, .jpg, .gif, .webp) are limited to 10MB. Video files
      (.mp4) are limited to 50MB.
    </p>
    <InformationalBox>
      <p>
        In MyGeotab v6.0 file size limits were increased. Images from 2MB to
        10MB and of videos from 10MB to 50MB.
      </p>
    </InformationalBox>
  </div>
);

const pageTitle: PageTitleProps = {
  title: "Media File - Beta",
  breadCrumbItems: ["MYG", "Guides", "Media File - Beta"],
};

const pageSections: TableOfContentsItem[] = [
  {
    elementId: "object-model",
    summary: "Object Model",
    details: objectModel,
  },
  {
    elementId: "supported-file-types",
    summary: "Supported File Types",
    details: supportedFileTypes,
  },
  {
    elementId: "security",
    summary: "Security",
    details: security,
  },
  {
    elementId: "api",
    summary: "API",
    details: api,
  },
  {
    elementId: "limits",
    summary: "Limits",
    details: limits,
  },
];

export default function MgMediaFiles() {
  return (
    <Page
      section={HeaderSections.MyGeotab}
      pageTitle={pageTitle}
      tableOfContents={pageSections}
    >
      <div className="paragraph">
        <p>
          The media file API provides a persistent storage mechanism for binary
          media files and meta data. There are two components of a media file:
        </p>
        <ul>
          <li>
            The <code className="small-code-sample">MediaFile</code> entity
            which describes the binary media. This is similar to other generic
            entity types in the API and follows the generic entity method
            pattern (<code className="small-code-sample">Add</code>,{" "}
            <code className="small-code-sample">Get</code>,{" "}
            <code className="small-code-sample">Set</code>,{" "}
            <code className="small-code-sample">Remove</code>,{" "}
            <code className="small-code-sample">GetFeed</code>).
          </li>
          <br></br>
          <li>
            The binary data of the media file. This the the actual file, for
            example a jpeg image. The binary files are interacted with using
            bespoke methods{" "}
            <code className="small-code-sample">DownloadMediaFile</code> and{" "}
            <code className="small-code-sample">UploadMediaFile.</code>
          </li>
        </ul>
      </div>
    </Page>
  );
}
