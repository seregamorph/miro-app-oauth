import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";

export const CommandViewportGet: FC<CommandProps> = ({
  onSuccess,
  onError,
}) => {
  const onViewport = async () => {
    try {
      const res = await miro.board.viewport.get();
      const str = `x = ${res.x}\ny = ${res.y}\nheight = ${res.height}\nwidth = ${res.width}`;
      onSuccess(str);
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  return (
    <p>
      <Button onClick={onViewport} type="primary" size="medium">
        Get viewport
      </Button>
    </p>
  );
};
