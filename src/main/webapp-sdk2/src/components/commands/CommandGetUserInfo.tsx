import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";
import { getUserData } from "../../utils/api";

export const CommandGetUserInfo: FC<CommandProps> = ({
  onSuccess,
  onError,
}) => {
  const onIdToken = async () => {
    try {
      const user = await miro.board.getUserInfo();
      onSuccess(`User id is ${user.id}`);
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  const onApiId = async () => {
    try {
      const user = await getUserData();
      onSuccess(`User id is ${user.id}\nUser name is ${user.name}`);
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  return (
    <>
      <p>
        <Button onClick={onIdToken} type="primary" size="medium">
          Get user id via FE
        </Button>
      </p>
      <p className="sdkapp-space">
        <Button onClick={onApiId} type="primary" size="medium">
          Get user id via BE
        </Button>
      </p>
    </>
  );
};
