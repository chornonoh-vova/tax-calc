import { clsx } from "clsx";
import type { ComponentPropsWithRef } from "react";

type InputProps = {
  label: string;
  error?: string | undefined;
} & ComponentPropsWithRef<"input">;

export function Input({ id, label, error, className, ...rest }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-gray-700">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        className={clsx(
          "rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
          className,
        )}
        {...rest}
      />
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}
