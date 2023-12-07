import { ReactNode } from "react";
import Accordion from "../../../components/Accordion/Accordion";
import { Page } from "../../../components";
import { PageTitleProps } from "../../../components/PageTitle/PageTitle";
import { HeaderSections } from "../../../components/Header/headerSectionsEnum";
import { TableOfContentsItem } from "../../../components/TableOfContents/TableOfContents";

const generalDescription: ReactNode = (
    <div className="paragraph">
        <p>The GO device and Input-Output Expanders (IOX) are connected in a dedicated CAN network. All communication is between the GO device and any connected IOXs - in particular, IOXs do not communicate with other IOXs. The following communication scenarios exist: GO device to all connected IOXs; GO device to an individual IOX; and an individual IOX to GO device. Readers are encouraged to look at examples from <a href="https://docs.google.com/document/d/1BExcPst5bNzv-IZGX6ZbPeHK5MO1s2AI0rqzEhHbNZ4/edit?usp=sharing" target="_blank" rel="noreferrer">CAN IOX Sample Communication Session</a> as they read through the rest of this page.</p>
    </div>
)

const pageTitle: PageTitleProps = {
    "title": "IO Expander Protocol",
    "breadCrumbItems": ["Hardware", "Developing An IOX", "IO Expander Protocol"]
};

const pageSections: TableOfContentsItem[] = [
    {
        "elementId": "generalDescription",
        "summary": "General Description",
        "details": ""
    },
    {
        "elementId": "polling",
        "summary": "Polling",
        "details": ""
    },
    {
        "elementId": "wakingUpTheGoDevice",
        "summary": "Waking Up The Go Device",
        "details": ""
    },
    {
        "elementId": "commands",
        "summary": "Commands",
        "details": ""
    },
    {
        "elementId": "sequenceDiagrams",
        "summary": "Sequence Diagrams",
        "details": ""
    }
]

export default function messagingProtocol() {
    return (
        <Page section={HeaderSections.Hardware}>
            febg
        </Page>
    )
};