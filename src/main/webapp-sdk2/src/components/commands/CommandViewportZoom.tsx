import { FC } from "react";
import { Button } from "../Button";
import { CommandProps } from "./types";

export const CommandViewportZoom: FC<CommandProps> = ({
  onSuccess,
  onError,
}) => {
  const onRead = async () => {
    try {
      const items = await miro.board.get();
      const item = items.find((i) => i.type !== "tag");
      if (!item) {
        onError("No items are on the board");
        return;
      }
      // @ts-expect-error it is actually an Item, all good
      await miro.board.viewport.zoomTo(item);
      onSuccess("success!");
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };
  const onCreate = async () => {
    try {
      const item = await miro.board.createStickyNote({
        content: "<p>This is a sticky note.</p>",
        style: {
          fillColor: "light_yellow",
          textAlign: "center",
          textAlignVertical: "middle",
        },
        x: 0,
        y: 0,
        shape: "square",
        width: 200,
      });
      await miro.board.viewport.zoomTo(item);
      onSuccess("success!");
    } catch (err: unknown) {
      onError(`${err}`);
      console.error(err);
    }
  };

  return (
    <>
      <p>
        <Button onClick={onRead} type="primary" size="medium">
          Read the board and zoom to element
        </Button>
      </p>
      <p className="sdkapp-space">
        <Button onClick={onCreate} type="primary" size="medium">
          Create a sticky note and zoom
        </Button>
      </p>
    </>
  );
};
