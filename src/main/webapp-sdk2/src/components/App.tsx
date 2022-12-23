import { StrictMode, useState, FC, useCallback } from "react";
import { CommandSelector } from "./CommandSelector";
import { CommandLayout } from "./commands/CommandLayout";
import { Command } from "../utils/commands";

export const App: FC = () => {
  const [command, setCommand] = useState<Command>("WIDGET_CREATE");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const updateLayout = useCallback((cmd: Command) => {
    setCommand(cmd);
    setOutput("");
    setIsError(false);
  }, []);

  const onSuccess = useCallback((msg: string) => {
    setIsError(false);
    setOutput(msg);
  }, []);

  const onError = useCallback((msg: string) => {
    setIsError(true);
    setOutput(msg);
  }, []);

  return (
    <StrictMode>
      <header>
        <CommandSelector command={command} setCommand={updateLayout} />
      </header>
      <section>
        <h2 className="h3">Command</h2>
        <CommandLayout
          command={command}
          onSuccess={onSuccess}
          onError={onError}
        />
      </section>
      <section>
        <h2 className="h3">Output</h2>
        <p
          className={
            isError
              ? "sdkapp-output sdkapp-output-danger"
              : "sdkapp-output sdkapp-output-info"
          }
        >
          {output}
        </p>
      </section>
    </StrictMode>
  );
};
