import { FC } from "react";
import { Command } from "../../utils/commands";

interface Props {
  command: Command;
}
export const CommandWithNoScope: FC<Props> = ({ command }) => {
  return (
    <p className="p-medium sdkapp-text-centered">
      <span>The command {command} does not require any permissions.</span>
    </p>
  );
};
