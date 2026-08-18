export default function TextArea({ id, invalid = false, className = "", rows = 3, ...rest }) {
  return (
    <textarea
      id={id}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
        invalid
          ? "border-red-500 focus:ring-red-500"
          : "border-zinc-300 focus:ring-zinc-500"
      } ${className}`}
      {...rest}
    />
  );
}
