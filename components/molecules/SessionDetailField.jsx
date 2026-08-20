import { useEffect, useRef, useState } from "react";

export default function SessionDetailField({ label, value }) {
  const [isFlashing, setIsFlashing] = useState(false);
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) return;
    previousValue.current = value;
    setIsFlashing(true);
    const timeoutId = setTimeout(() => setIsFlashing(false), 900);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div
      className={`min-w-0 -mx-1.5 -my-1 rounded-md px-1.5 py-1 transition-colors duration-500 ${
        isFlashing ? "bg-amber-100" : "bg-transparent"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</p>
      <p className="mt-0.5 wrap-break-word text-sm text-zinc-900">
        {value || <span className="text-zinc-400">—</span>}
      </p>
    </div>
  );
}
