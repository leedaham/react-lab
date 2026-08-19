import type { HTMLAttributes } from "react";

export type GlassContainerProps = HTMLAttributes<HTMLDivElement> & {
  isHoverable?: boolean;
  isClickable?: boolean;
  isDisabled?: boolean;
  showEdgePoints?: boolean;
};

const GlassContainer = ({
  className,
  isHoverable = false,
  isClickable = false,
  isDisabled = false,
  showEdgePoints = true,
  children,
  ...rest
}: GlassContainerProps) => {
  const classes = [
    "glass-container",
    className,
    isHoverable ? "is-hoverable" : "",
    isClickable ? "is-clickable" : "",
    isDisabled ? "is-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      <div className="glass-container-decorations" aria-hidden="true">
        <span className="glass-container-border" />
        {showEdgePoints && (
          <>
            <span className="glass-container-top-line" />
            <span className="glass-container-bottom-line" />
            <span className="glass-container-left-line" />
            <span className="glass-container-right-line" />
          </>
        )}
        <span className="glass-container-ellipse" />
      </div>
      {children}
    </div>
  );
};

export default GlassContainer;
