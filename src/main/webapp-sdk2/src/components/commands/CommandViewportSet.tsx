import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";

export const CommandViewportSet: FC<CommandProps> = ({
  onSuccess,
  onError,
}) => {
  const onViewport = async () => {
    try {
      await miro.board.viewport.set({
        viewport: {
          x: 1000,
          y: 1000,
          height: 100,
          width: 100,
        },
      });
      onSuccess("success!");
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  return (
    <p>
      <Button onClick={onViewport} type="primary" size="medium">
        Set viewport
      </Button>
    </p>
  );
};
