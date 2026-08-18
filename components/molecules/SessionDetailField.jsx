export default function SessionDetailField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-zinc-900">
        {value || <span className="text-zinc-400">—</span>}
      </p>
    </div>
  );
}
