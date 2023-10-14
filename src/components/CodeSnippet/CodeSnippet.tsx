
import { Tabs } from "@geotab/react-component-library";
import { CodeSample } from "./CodeBlock";


interface CodeSnippetProps {
  snippets: {
      javascript: {
          code: string;
      };
      csharp: {
          code: string;
      };
      java: {
        code: string;
    };
     python: {
      code: string;
    } ;
  };
}
/**
 * Renders a component that displays code snippets in different programming languages.
 *
 * @param {CodeSnippetProps} snippets - An object containing code snippets for various programming languages.
 * Example usage:
 * <CodeSnippet
 *   snippets={{
 *     javascript: {
 *       code: `// Your JavaScript code here`
 *     },
 *     csharp: {
 *       code: `// Your C# code here`
 *     },
 *     java: {
 *       code: `// Your Java code here`
 *     },
 *     python: {
 *       code: `// Your Python code here`
 *     },
 *   }}
 * />
 *
 */

export default function CodeSnippet({snippets}: CodeSnippetProps): JSX.Element {

    return ( 
      <div>
          <h2>Try me</h2>
          <Tabs tabs={[
            {
              content: CodeSample({
                language: "javascript",
                code:  snippets.javascript.code,
              }),
              name: "Javascript"
            },
            {
              content: CodeSample({
                language: "csharp",
                code:  snippets.csharp.code,
              }),
              name: "C#"
            },
            {
              content: CodeSample({
                language: "java",
                code:  snippets.java.code,
              }),
              name: "Java"
            },
            {
              content: CodeSample({
                language: "python",
                code:  snippets.python.code,
              }),
              name: "Python"
            }
            ]}
          />
    </div>
    );
}
