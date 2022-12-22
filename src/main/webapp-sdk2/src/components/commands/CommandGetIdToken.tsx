import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";

export const CommandGetIdToken: FC<CommandProps> = ({ onSuccess, onError }) => {
  const onIdToken = async () => {
    try {
      const token = await miro.board.getIdToken();
      onSuccess(`The token is ${token}`);
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  return (
    <p>
      <Button onClick={onIdToken} type="primary" size="medium">
        Get id token
      </Button>
    </p>
  );
};
