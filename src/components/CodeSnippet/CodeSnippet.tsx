
import { Tabs } from "@geotab/react-component-library";
import CodeSample from "./CodeSample";


interface CodeSnippetProps {
  codeExamples: {
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
 * Renders a component that displays code Examples in different programming languages.
 *
 * @param {CodeSnippetProps} codeExamples - An object containing code examples for various programming languages.
 * Example usage:
 * <CodeSnippet
 *   codeExamples={{
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

export default function CodeSnippet({codeExamples}: CodeSnippetProps): JSX.Element {

    return ( 
      <div>
          <h2>Try me</h2>
          <Tabs tabs={[
            {
              content: CodeSample({
                language: "javascript",
                code:  codeExamples.javascript.code,
              }),
              name: "Javascript"
            },
            {
              content: CodeSample({
                language: "csharp",
                code:  codeExamples.csharp.code,
              }),
              name: "C#"
            },
            {
              content: CodeSample({
                language: "java",
                code:  codeExamples.java.code,
              }),
              name: "Java"
            },
            {
              content: CodeSample({
                language: "python",
                code:  codeExamples.python.code,
              }),
              name: "Python"
            }
            ]}
          />
    </div>
    );
}
