import { cloneElement } from "react";
import Label from "@/components/atoms/Label";
import ErrorText from "@/components/atoms/ErrorText";

export default function FormField({ id, label, required = false, error, children }) {
  const errorId = error ? `${id}-error` : undefined;

  const field = cloneElement(children, {
    id,
    invalid: Boolean(error),
    "aria-describedby": errorId,
  });

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="mt-1">{field}</div>
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}
