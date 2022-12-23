import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";

export const CommandGetAppData: FC<CommandProps> = ({ onSuccess, onError }) => {
  const onAppData = async () => {
    try {
      const data = await miro.board.getAppData<Record<string, string>>();
      onSuccess(`The app data is ${data.foo}`);
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  return (
    <p>
      <Button onClick={onAppData} type="primary" size="medium">
        Get app data
      </Button>
    </p>
  );
};
