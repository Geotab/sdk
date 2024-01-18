import { TabConfig, Tabs } from "@geotab/react-component-library";
import CodeSample from "./CodeSample";

export interface CodeSamples {
    javascript?: string;
    csharp?: string;
    java?: string;
    python?: string;
}

const languages: Record<string, string> = {
    javascript: "JavaScript",
    csharp: "C#",
    java: "Java",
    python: "Python"
};

/*Renders a component that displays code Examples in different programming languages.

@param { CodeSamples } props - An object containing code examples for various programming languages.
Example usage:
const samples: CodeSamples = {
 javascript: `// Your JavaScript code here`,
 csharp: `// Your C# code here`,
 java: `// Your Java code here`,
 python: `## Your Python code here`
};
<CodeSamplesContainer {...samples}></CodeSamplesContainer>
};*/

export default function CodeSamplesContainer(props: CodeSamples): JSX.Element {
    let tabsArray: TabConfig[] = Object.keys(props).map((language) => ({
        content: <CodeSample language={language} code={props[language as keyof CodeSamples]!}></CodeSample>,
        name: languages[language as keyof CodeSamples]
    }));

  return (
      <Tabs tabs={tabsArray} defaultTab={languages.javascript} />
  );
}
