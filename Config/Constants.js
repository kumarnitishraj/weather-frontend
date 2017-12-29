import { Dimensions } from "react-native";
const window = Dimensions.get("window");

export const Metrics = {
  FULL_WIDTH: window.width,
  FULL_HEIGHT: window.height
};

export const Colors = {
  GENERIC_BORDER_COLOR: "#dddddd",
  GENERIC_TEXT_COLOR: "#1E6F89",
  GENERIC_TEXT_COLOR_BLACK: "#000",
  GENERIC_TEXT_COLOR_GRAY: "#9B9B9B",
  GENERIC_TEXT_COLOR_WHITE: "#FFFFFF",
  GRADIENT_COLOR_DARK:'#24B8DD',
  GRADIENT_COLOR_LIGHT:'#82E3F4',
  TRANSPRANT_BLACK: "rgba(0,0,0,0)"
};

export const Fonts = {
  RBNB_BOLD_CURVED: "Lobster-Regular",
  RBNB_BOLDEST: "Catamaran-ExtraBold",
  RBNB_BOLD: "Catamaran-Bold",
  RBNB_MEDIUM: "Catamaran-Medium",
  RBNB_REGULAR: "Catamaran-Regular",
  RBNB_SEMI_BOLD: "Catamaran-SemiBold",
  RBNB_THIN: "Catamaran-Thin",
  RBNB_EXTRA_LIGHT: "Catamaran-ExtraLight"
};
