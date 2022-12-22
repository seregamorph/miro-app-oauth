import { ChangeEvent, FC, useCallback } from "react";
import { Command, COMMANDS, isCommand } from "../utils/commands";

interface Props {
  command?: Command;
  setCommand: (command: Command) => void;
}

export const CommandSelector: FC<Props> = ({ command, setCommand }) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const cmd = event.target.value;
      if (!isCommand(cmd)) {
        return;
      }
      setCommand(cmd);
    },
    [setCommand]
  );

  return (
    <p>
      <label htmlFor="command-selector" className="p-small">
        Command
      </label>
      <select
        className="select select-small"
        id="command-selector"
        value={command}
        onChange={onChange}
      >
        {COMMANDS.map((cmd) => (
          <option key={cmd} value={cmd}>
            {cmd}
          </option>
        ))}
      </select>
    </p>
  );
};
