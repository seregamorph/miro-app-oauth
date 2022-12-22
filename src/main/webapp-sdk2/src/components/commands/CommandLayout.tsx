import { FC } from "react";
import { Command } from "../../utils/commands";
import { DefaultCommandLayout } from "./DefaultCommandLayout";
import { CommandNotification } from "./CommandNotification";
import { CommandProps } from "./types";
import { CommandViewportZoom } from "./CommandViewportZoom";
import { CommandViewportGet } from "./CommandViewportGet";
import { CommandViewportSet } from "./CommandViewportSet";
import { CommandGetIdToken } from "./CommandGetIdToken";
import { CommandGetUserInfo } from "./CommandGetUserInfo";
import { CommandGetBoardInfo } from "./CommandGetBoardInfo";
import { CommandWithNoScope } from "./CommandWithNoScope";
import { CommandGetAppData } from "./CommandGetAppData";
import { CommandSetAppData } from "./CommandSetAppData";

interface Props {
  command: Command;
}
export const CommandLayout: FC<Props & CommandProps> = ({
  command,
  onSuccess,
  onError,
}) => {
  switch (command) {
    case "WIDGET_CREATE":
      return <DefaultCommandLayout command={command} />;
    case "WIDGET_UPDATE":
      return <DefaultCommandLayout command={command} />;
    case "WIDGET_REMOVE":
      return <DefaultCommandLayout command={command} />;
    case "WIDGET_GET":
      return <DefaultCommandLayout command={command} />;
    case "WIDGET_GET_METADATA":
      return <DefaultCommandLayout command={command} />;
    case "WIDGET_SET_METADATA":
      return <DefaultCommandLayout command={command} />;
    case "BRING_TO_FRONT":
      return <DefaultCommandLayout command={command} />;
    case "SEND_TO_BACK":
      return <DefaultCommandLayout command={command} />;
    case "GET_SELECTION":
      return <DefaultCommandLayout command={command} />;
    case "GET_USER_INFO":
      return <CommandGetUserInfo onSuccess={onSuccess} onError={onError} />;
    case "GET_BOARD_INFO":
      return <CommandGetBoardInfo onSuccess={onSuccess} onError={onError} />;
    case "GET_BOARD_APP_DATA":
      return <CommandGetAppData onSuccess={onSuccess} onError={onError} />;
    case "SET_BOARD_APP_DATA":
      return <CommandSetAppData onSuccess={onSuccess} onError={onError} />;
    case "CLEAR_BOARD_APP_DATA":
      return <DefaultCommandLayout command={command} />;
    case "UI_OPEN_PANEL":
      return <CommandWithNoScope command={command} />;
    case "UI_CLOSE_PANEL":
      return <CommandWithNoScope command={command} />;
    case "UI_OPEN_MODAL":
      return <CommandWithNoScope command={command} />;
    case "UI_CLOSE_MODAL":
      return <CommandWithNoScope command={command} />;
    case "UI_DRAG_START":
      return <CommandWithNoScope command={command} />;
    case "UI_DRAG_MOVE":
      return <CommandWithNoScope command={command} />;
    case "UI_DRAG_DROP":
      return <CommandWithNoScope command={command} />;
    case "UI_DRAG_END":
      return <CommandWithNoScope command={command} />;
    case "UI_REGISTER_EVENT":
      return <CommandWithNoScope command={command} />;
    case "UI_UNREGISTER_EVENT":
      return <CommandWithNoScope command={command} />;
    case "GET_ID_TOKEN":
      return <CommandGetIdToken onSuccess={onSuccess} onError={onError} />;
    case "VIEWPORT_GET":
      return <CommandViewportGet onSuccess={onSuccess} onError={onError} />;
    case "VIEWPORT_SET":
      return <CommandViewportSet onSuccess={onSuccess} onError={onError} />;
    case "VIEWPORT_ZOOM_TO":
      return <CommandViewportZoom onSuccess={onSuccess} onError={onError} />;
    case "SHOW_NOTIFICATION":
      return <CommandNotification onSuccess={onSuccess} onError={onError} />;
    default:
      return <DefaultCommandLayout command={command} />;
  }
};
