export default function MobileBackHeader({ onBack, backLabel, children }) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 md:hidden">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        &larr; {backLabel}
      </button>
      <span className="text-sm font-semibold text-zinc-900">{children}</span>
    </div>
  );
}
