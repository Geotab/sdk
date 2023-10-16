import copyCode from "./CopyCode";
import { CodeBlock} from 'react-code-blocks';
import './CodeSample.scss';
import copyIcon from "./CopyIcon";
import CustomTheme from "./CustomTheme";
import CodeSampleTheme from "./CodeSampleTheme";
import { Button, ButtonVariant,useToast } from "@geotab/react-component-library";

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
    <div>
      <CodeBlock
          text={props.code}
          language= {props.language}
          showLineNumbers={false}
          theme={	CustomTheme() }
          customStyle={ CodeSampleTheme() }
      />

      <Button variant = {ButtonVariant.Secondary} className="copyButton" onClick={handleCopyClick} >
          Copy
          {copyIcon()}
      </Button>

    </div>
      
    )
  } 


