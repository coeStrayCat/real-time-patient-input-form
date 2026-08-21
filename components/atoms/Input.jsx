export default function Input({ id, invalid = false, className = "", ...rest }) {
  return (
    <input
      id={id}
      aria-invalid={invalid || undefined}
      className={`w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
        invalid
          ? "border-red-500 focus:ring-red-500"
          : "border-zinc-300 focus:ring-zinc-500"
      } ${className}`}
      {...rest}
    />
  );
}
