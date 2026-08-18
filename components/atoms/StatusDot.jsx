const COLOR_CLASSES = {
  green: "bg-green-500",
  amber: "bg-amber-500",
  indigo: "bg-indigo-500",
  zinc: "bg-zinc-400",
};

export default function StatusDot({ color = "zinc", className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 rounded-full ${COLOR_CLASSES[color]} ${className}`}
    />
  );
}
