import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";

export const CommandSetAppData: FC<CommandProps> = ({ onSuccess, onError }) => {
  const onAppData = async () => {
    try {
      const data = await miro.board.setAppData<Record<string, string>>(
        "foo",
        "bar"
      );
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
