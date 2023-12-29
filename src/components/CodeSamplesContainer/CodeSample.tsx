import copyCode from "./CopyCode";
import { CodeBlock } from "react-code-blocks";
import "./CodeSample.scss";
import { IconCopy, IconDarkModeMoon, IconLightModeSun } from "./icons";
import CustomDarkModeTheme from "./themes/CustomDarkModeTheme";
import CustomLightModeTheme from "./themes/CustomLightModeTheme";
import CodeSampleStyle from "./CodeSampleStyle";
import {
  Button,
  ButtonVariant,
  useToast,
} from "@geotab/react-component-library";
import "../../App.scss";
import { useContext } from "react";
import CodeSampleLightDarkModeContext from "./CodeSampleLightDarkModeContext";

//Documentation for react-code-blocks: https://www.npmjs.com/package/react-code-blocks

interface CodeSampleProps {
  language: string;
  code: string;
}

export default function CodeSample(props: CodeSampleProps): JSX.Element {
  const { lightMode, setLightMode } = useContext(
    CodeSampleLightDarkModeContext
  );
  const toast = useToast();

  const handleCopyClick = (): void => {
    copyCode(props.code);
    toast.info({
      sensitivity: "foreground",
      body: "Copied to clipboard",
      duration: 2000,
      icon: null,
    });
  };

  const handleLightDarkModeToggleButtonClick = (): void => {
    setLightMode(!lightMode);
  };

  return (
    <div className={lightMode ? "snippetBox" : "snippetBox snippetBox--dark-mode"}>
      <CodeBlock
        text={props.code}
        language={props.language}
        showLineNumbers={false}
        theme={lightMode ? CustomLightModeTheme() : CustomDarkModeTheme()}
        customStyle={CodeSampleStyle()}
      />

      <div className="snippetBox__toolsContainer">
        <Button
          variant={ButtonVariant.CheveronButton}
          className={
            lightMode
              ? ""
              : "snippetBox__tool--dark-mode"
          }
          onClick={handleLightDarkModeToggleButtonClick}
          ariaLabel="Toggle light/dark mode"
        >
          {lightMode ? <IconDarkModeMoon/> : <IconLightModeSun/>}
        </Button>

        <Button
          variant={ButtonVariant.CheveronButton}
          className={lightMode ? "" : "snippetBox__tool--dark-mode"}
          onClick={handleCopyClick}
          ariaLabel="Copy code sample button"
        >
          <IconCopy/>
        </Button>
      </div>
    </div>
  );
}
