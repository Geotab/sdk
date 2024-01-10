// Usage: node .\utils\buildSearchIndex.js
const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');

let count = 0;
let searchIndex = [];

function buildSearchIndex(folderPath, basePath) {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            buildSearchIndex(filePath, basePath);
        } else {
            if (filePath.endsWith('.tsx')) {
                try {
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const relativePath = path.relative(basePath, filePath);

                    let searchObject = {
                        id: count++,
                        title: getTitle(fileContent),
                        headers: getHeaders(fileContent),
                        headersIds: getHeaderIds(fileContent),
                        content: getContent(fileContent),
                        link: getLink(relativePath),
                        breadcrumb: getBreadcrumb(fileContent),
                        category: getCategory(fileContent)
                    };

                    searchIndex.push(searchObject);
                } catch (error) {
                    console.error(`Error processing module from ${filePath}: ${error.message}`);
                }
            }
        }
    }
}

function getTitle(fileContent) {
    const pageTitleRegex = /{\s*"title"\s*:\s*"([^"]*)"|{\s*title\s*:\s*"([^"]*)"/;
    const matches = fileContent.match(pageTitleRegex);
    return (matches && (matches[1] || matches[2])) ? matches[1] || matches[2] : "";
}

function getHeaders(fileContent) {
    const pageSectionsSummaryRegex = /"summary"\s*:\s*"([^"]+)"|summary\s*:\s*"([^"]+)"/g;
    const matches = [...fileContent.matchAll(pageSectionsSummaryRegex)];
    return (matches.length > 0) ? matches.map(match => match[1] || match[2]) : "";
}

function getHeaderIds(fileContent) {
    const pageSectionsElementIdRegex = /"elementId"\s*:\s*"([^"]+)"|elementId\s*:\s*"([^"]+)"/g;
    const matches = [...fileContent.matchAll(pageSectionsElementIdRegex)];
    return (matches.length > 0) ? matches.map(match => match[1] || match[2]) : "";
}

function getContent(fileContent) {
    const pageSectionsContentRegex = /<div className="paragraph">([\s\S]*?)<\/div>\s*\);/g;
    const matches = [...fileContent.matchAll(pageSectionsContentRegex)];
    if (matches.length > 0) {
        let content = matches.map(match => {
            const dom = new JSDOM(match[1].trim());
            const document = dom.window.document;

            return Array.from(document.body.children, element =>
                element.textContent.replace(/\s{2,}/g, ' ').replace(/[\n\t]/g, '').replace(/\\\"/g, '"').trim()
            ).join(" ");
        });

        return content.join(" ");
    } else {
        return "";
    }
}

function getLink(relativePath) {
    return "/" + relativePath.replace(/\\/g, '/');
}

function getBreadcrumb(fileContent) {
    const pageBreadCrumbsRegex = /"breadCrumbItems"\s*:\s*(\[[^\]]*\])|breadCrumbItems\s*:\s*(\[[^\]]*\])/;
    const matches = fileContent.match(pageBreadCrumbsRegex);

    if (matches && matches.length > 1) {
        try {
            return (matches[1]) ? JSON.parse(matches[1]) : (matches[2]) ? JSON.parse(matches[2]) : "";
        } catch (error) {
            return "";
        }
    } else {
        return "";
    }
}

function getCategory(fileContent) {
    const pageTitleRegex = /{\s*"title"\s*:\s*"([^"]*)"|{\s*title\s*:\s*"([^"]*)"/;
    const matches = fileContent.match(pageTitleRegex);

    if (matches && (matches[1] || matches[2])) {
        if (matches[1] === "Objects" || matches[2] === "Objects" || matches[1] === "Methods" || matches[2] === "Methods") {
            return 'reference';
        }
    }
    return 'guide';
}


//  MAIN
(() => {

    const startFolderPath = './src/pages';

    buildSearchIndex(startFolderPath, startFolderPath);

    fs.writeFile("./utils/searchIndex.js", JSON.stringify(searchIndex), (error) => {
        if (error) {
            console.error('Error writing to file:', error);
        } else {
            console.log('Content written to file successfully.');
        }
    });
})();