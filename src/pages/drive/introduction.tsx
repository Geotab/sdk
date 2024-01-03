import { Page } from "../../components";
import { HeaderSections } from "../../components/Header/headerSectionsEnum";
import { PageTitleProps } from "../../components/PageTitle/PageTitle";
import { TableOfContentsItem } from "../../components/TableOfContents/TableOfContents";

// TODO: Update this page once Product Management has provided content

const pageTitle: PageTitleProps = {
  title: "Introduction",
  breadCrumbItems: ["Drive", "Introduction"]
};

const pageSections: TableOfContentsItem[] = [
  {
    elementId: "introduction",
    summary: "Introduction",
    details: null
  }
];

export default function Introduction() {
  return (
    <Page
      section={HeaderSections.Drive}
      pageTitle={pageTitle}
      tableOfContents={pageSections}
    />
  );
}