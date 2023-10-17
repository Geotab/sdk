
import { Tabs } from "@geotab/react-component-library";
import CodeSample from "./CodeSample";


interface CodeSamplesContainerProps {
  props: {
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
 * @param {CodeSamplesContainerProps} props - An object containing code examples for various programming languages.
 * Example usage:
 * <CodeSamplesContainer
 *    props ={{
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

export default function CodeSamplesContainer({props}: CodeSamplesContainerProps): JSX.Element {

    return ( 
      <div>
          <h2>Try me</h2>
          <Tabs tabs={[
            {
              content: CodeSample({
                language: "javascript",
                code:  props.javascript.code,
              }),
              name: "Javascript"
            },
            {
              content: CodeSample({
                language: "csharp",
                code:  props.csharp.code,
              }),
              name: "C#"
            },
            {
              content: CodeSample({
                language: "java",
                code:  props.java.code,
              }),
              name: "Java"
            },
            {
              content: CodeSample({
                language: "python",
                code:  props.python.code,
              }),
              name: "Python"
            }
            ]}
          />
    </div>
    );
}
