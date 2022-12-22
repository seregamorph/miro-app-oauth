import { FC } from "react";
import { Command } from "../../utils/commands";

interface Props {
  command: Command;
}
export const DefaultCommandLayout: FC<Props> = ({ command }) => {
  return (
    <p className="p-medium sdkapp-text-centered">
      <span>The layout for {command} is not implemented yet.</span>
    </p>
  );
};
