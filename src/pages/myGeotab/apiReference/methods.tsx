import React from 'react';
import { Header, Button } from '@geotab/react-component-library';
import myGParser from './myGParser';

function createString(inputString: string) {
    const lines = inputString.split('\n');
    const content: JSX.Element[] = [];
    let listItems: JSX.Element[] = [];
    let inList = false;

    lines.forEach((line, index) => {
        if (line.trim().startsWith('- ')) {
        // Start or continue a bullet point list
            if (!inList) {
                inList = true;
                listItems = [];
            }
            listItems.push(<li key={index}>{line.trim().substring(2)}</li>);
        } else {
            // Treat as a paragraph
            if (inList) {
                // If we were in a list, wrap it up
                content.push(
                    <ul key={`ul-${index}`}>
                        {listItems.map((item, itemIndex) => (
                            <React.Fragment key={`li-${itemIndex}`}>{item}</React.Fragment>
                        ))}
                    </ul>
                );
                inList = false;
            }
            content.push(<p key={index}>{line}</p>);
        }
    });

    // Check if there are remaining list items
    if (inList && listItems.length > 0) {
        content.push(
            <ul key="remaining-list-items">
                {listItems.map((item, itemIndex) => (
                    <React.Fragment key={`remaining-li-${itemIndex}`}>{item}</React.Fragment>
                ))}
            </ul>
        );
    }

    return <div>{content}</div>;
}

const methods = [
    {
        name: "Add(...)",
        description: "Adds a new Entity to the database. This method is used to add the different entities to the database, for example Device, User or Zone. In addition to the credentials, the method will require a minimum of two parameters - the type of entity that is being added (typeName) and the entity itself. In most cases, the entity being added will need to be fully constructed. In other words, all its properties need to be defined. These requirements are defined in each of the entity definitions below."
    }, 
    {
        name: "Authenticate(...)",
        description: "Authenticates a user and provides a LoginResult if successful. The authentication pattern is documented in the Concepts sections of the SDK.\nMaximum 10 Authentication requests per minute, per user.\nThrows:\n- InvalidUserException\n- DbUnavailableException\n- OverLimitException"
    }, 
    {
        name: "CreateDatabase(...)",
        description: "Creates new uniquely named database on a server in the federation. Requires either a valid CaptchaAnswer and/or valid MyAdmin user credentials. See https://github.com/Geotab/sample-registration for an example."
    }
]
const methodItems = methods.map((d) => <div><Header title={d.name}><Button>View</Button></Header><p>{createString(d.description)}</p></div>);
//onClick error
// is the way I'm going so far correct?
// how to deal with changing table of contents and populating each heading for each parameter
export default function Methods() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://mypreview.geotab.com/sdk.xml", false);
    request.send();
    let xml: any = request.responseXML;
    console.log(xml);
    myGParser(xml);
    
    async function testClick() {
        alert('Test click!');
    }
    return (
        <div>
            <Header title="Methods"></Header>
            {methodItems}
        </div>
    );
};