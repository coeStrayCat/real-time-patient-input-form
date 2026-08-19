const LOCALES = [
  { value: "th", label: "ไทย" },
  { value: "en", label: "EN" },
];

export default function LanguageToggle({ locale, onSelect }) {
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-zinc-300 text-xs font-medium">
      {LOCALES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onSelect(value)}
          aria-pressed={locale === value}
          className={`px-2 py-1 transition-colors ${
            locale === value ? "bg-zinc-900 text-white" : "bg-white text-zinc-600 hover:bg-zinc-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
