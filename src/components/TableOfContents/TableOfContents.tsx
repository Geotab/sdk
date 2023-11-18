import "./tableOfContents.scss";

export default function TableOfContents() {
    return (
        <ul className="tableOfContents">
            <li className="tableOfContents__heading">
                Table of contents
            </li>
            <li>
                <a href="#device-data">Accessing the device's data</a>
            </li>
            <li>
                <a href="#introduction">Importing, exporting and synchronizing</a>
            </li>
        </ul>
    );
};