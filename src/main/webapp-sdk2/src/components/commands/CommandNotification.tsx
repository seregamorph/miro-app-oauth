import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";

export const CommandNotification: FC<CommandProps> = ({
  onSuccess,
  onError,
}) => {
  const onShow = async () => {
    try {
      // @ts-expect-error for some reason this notificaitons.show() namespace is not described in the SDK
      await miro.board.notifications.show({
        message: "You got lucky!",
        type: "error",
      });
      onSuccess("success!");
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  return (
    <p>
      <Button onClick={onShow} type="primary" size="medium">
        Show notification
      </Button>
    </p>
  );
};
