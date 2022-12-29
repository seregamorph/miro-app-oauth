import * as React from "react";

export const CommandViewportZoom: React.VFC = () => {
  const onRead = async () => {
    try {
      const items = await miro.board.widgets.get();
      const item = items.find((i) => i.type !== "tag");
      if (!item) {
        throw new Error("no items found on the board");
      }
      await miro.board.viewport.zoomToObject(item);
    } catch (err: unknown) {
      console.error(err);
    }
  };
  const onCreate = async () => {
    try {
      const item = await miro.board.widgets.create({
        type: "sticker",
        text: "This is a sticky note.",
      });

      await miro.board.viewport.zoomToObject(item);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <>
      <p>
        <button onClick={onRead}>
          Read the board and zoom to the first element
        </button>
      </p>
      <p className="sdkapp-space">
        <button onClick={onCreate}>Create a sticky note and zoom to it</button>
      </p>
    </>
  );
};
