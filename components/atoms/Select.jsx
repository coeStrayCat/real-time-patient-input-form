export default function Select({
  id,
  options = [],
  placeholder = "กรุณาเลือก",
  invalid = false,
  className = "",
  ...rest
}) {
  return (
    <select
      id={id}
      aria-invalid={invalid || undefined}
      className={`w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
        invalid
          ? "border-red-500 focus:ring-red-500"
          : "border-zinc-300 focus:ring-zinc-500"
      } ${className}`}
      {...rest}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
