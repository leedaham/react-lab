import { createElement, type HTMLAttributes } from "react";

export type AppIconSize = "xs" | "sm" | "md" | "lg" | number;

export type AppIconProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  name: string;
  size?: AppIconSize;
};

const ICON_SIZE_MAP: Record<Exclude<AppIconSize, number>, number> = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
};

const AppIcon = ({
  name,
  size = "sm",
  className = "",
  style,
  ...rest
}: AppIconProps) => {
  const pixelSize = typeof size === "number" ? size : ICON_SIZE_MAP[size];

  return createElement(
    "app-icon",
    {
      "aria-hidden": true,
      ...rest,
      className: ["material-symbols-outlined", "icon-sm", className]
        .filter(Boolean)
        .join(" "),
      style: {
        fontFamily: '"Material Symbols Outlined"',
        fontStyle: "normal",
        fontWeight: "normal",
        letterSpacing: "normal",
        textTransform: "none",
        whiteSpace: "nowrap",
        direction: "ltr",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        MozOsxFontSmoothing: "grayscale",
        fontFeatureSettings: '"liga"',
        fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 20',
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        verticalAlign: "middle",
        fontSize: `${pixelSize}px`,
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        ...style,
      },
    },
    name,
  );
};

export default AppIcon;
