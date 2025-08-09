import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

export function Button({
  icon = false,
  className,
  children,
  ...rest
}: ComponentPropsWithRef<"button"> & {
  icon?: boolean;
}) {
  const padding = icon ? "p-1" : "py-1.5 px-3";
  return (
    <button
      className={clsx(
        "rounded-sm shadow-sm inline-flex flex-row items-center border border-gray-300 gap-0.5 bg-gray-50 hover:bg-gray-100",
        padding,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
