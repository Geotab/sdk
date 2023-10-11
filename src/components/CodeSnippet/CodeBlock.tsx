import { useState } from "react";
import copyCode from "./CopyCode";
import customTheme from "./CustomTheme";
import { CodeBlock} from 'react-code-blocks';
import styles from './codeBlock.module.scss';
import { copyIcon } from "./CopyIcon";

//Documentation for react-code-blocks: https://www.npmjs.com/package/react-code-blocks

interface CodeBlockProps {
    language: string;
    code: string;

  }

export function CodeSample(props: CodeBlockProps): JSX.Element{

    const [buttonText, setButtonText] = useState<string>('Copy');
    const [showIcon, setShowIcon] = useState<boolean>(true);

    const handleCopyClick = () => {
      copyCode(props.code);
      setButtonText('Copied!');
      setShowIcon(false);
      setTimeout(() => {
        setShowIcon(true);
        setButtonText('Copy');
      }, 2000);
    };

    return (
    <div>
      <CodeBlock
          text={props.code}
          language= {props.language}
          showLineNumbers={false}
          theme={	customTheme() }
          customStyle={{  
            height: "350px", 
            borderRadius: "8px",
            fontFamily: "roboto",
            fontSize: "14px",
            overflowY: 'auto',
            padding: "20px",
          }}
      />
      <button className={styles.copyButton} onClick={handleCopyClick}> 
        {buttonText}
        {showIcon && copyIcon()}
      </button>
    </div>
      
    )
  } 


