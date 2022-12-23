import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";

export const CommandGetBoardInfo: FC<CommandProps> = ({
  onSuccess,
  onError,
}) => {
  const onIdToken = async () => {
    try {
      const board = await miro.board.getInfo();
      onSuccess(`The board id is ${board.id}`);
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  return (
    <p>
      <Button onClick={onIdToken} type="primary" size="medium">
        Get board id
      </Button>
    </p>
  );
};
