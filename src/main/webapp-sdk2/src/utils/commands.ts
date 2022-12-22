export const COMMANDS = [
  "WIDGET_CREATE",
  "WIDGET_UPDATE",
  "WIDGET_REMOVE",
  "WIDGET_GET",
  "WIDGET_GET_METADATA",
  "WIDGET_SET_METADATA",
  "BRING_TO_FRONT",
  "SEND_TO_BACK",
  "GET_SELECTION",
  "GET_USER_INFO",
  "GET_BOARD_INFO",
  "GET_BOARD_APP_DATA",
  "SET_BOARD_APP_DATA",
  "CLEAR_BOARD_APP_DATA",
  "UI_OPEN_PANEL",
  "UI_CLOSE_PANEL",
  "UI_OPEN_MODAL",
  "UI_CLOSE_MODAL",
  "UI_DRAG_START",
  "UI_DRAG_MOVE",
  "UI_DRAG_DROP",
  "UI_DRAG_END",
  "UI_REGISTER_EVENT",
  "UI_UNREGISTER_EVENT",
  "GET_ID_TOKEN",
  "VIEWPORT_GET",
  "VIEWPORT_SET",
  "VIEWPORT_ZOOM_TO",
  "SHOW_NOTIFICATION",
] as const;

export type Command = typeof COMMANDS[number];

export const isCommand = (value: string): value is Command => {
  return COMMANDS.some((cmd) => value === cmd);
};
