const COLOR_CLASSES = {
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-800",
  indigo: "bg-indigo-100 text-indigo-800",
  zinc: "bg-zinc-100 text-zinc-700",
};

export default function Badge({ color = "zinc", children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${COLOR_CLASSES[color]} ${className}`}
    >
      {children}
    </span>
  );
}
