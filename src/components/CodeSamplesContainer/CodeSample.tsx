import copyCode from "./CopyCode";
import { CodeBlock } from 'react-code-blocks';
import './CodeSample.scss';
import copyIcon from "./CopyIcon";
import CustomTheme from "./CustomTheme";
import CodeSampleStyle from "./CodeSampleStyle";
import { Button, ButtonVariant,useToast } from "@geotab/react-component-library";
import "../../App.scss";

//Documentation for react-code-blocks: https://www.npmjs.com/package/react-code-blocks

interface CodeSampleProps {
    language: string;
    code: string;
  }

export default function CodeSample(props: CodeSampleProps): JSX.Element{

    const toast = useToast();

    const handleCopyClick = (): void => {
      copyCode(props.code);
      toast.info({ 
        sensitivity: "foreground", 
        body: "Copied to clipboard", 
        duration: 2000,
        icon: null
      });
    };

    return (
    <div className="snippetBox">
      <CodeBlock
          text={props.code}
          language= {props.language}
          showLineNumbers={false}
          theme={	CustomTheme() }
          customStyle={ CodeSampleStyle() }
      />

      <Button variant = {ButtonVariant.CheveronButton} className="copyButton" onClick={handleCopyClick} ariaLabel="Copy code sample button">
          {copyIcon()}
      </Button>

    </div>
      
    )
  } 


