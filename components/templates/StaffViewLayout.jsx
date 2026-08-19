import MobileBackHeader from "@/components/molecules/MobileBackHeader";

export default function StaffViewLayout({
  hasSelection,
  selectedLabel,
  onBack,
  backLabel,
  list,
  detail,
  header,
}) {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        {header}
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-full overflow-y-auto border-r border-zinc-200 bg-white md:block md:w-72 lg:w-80 ${
            hasSelection ? "hidden" : "block"
          }`}
        >
          {list}
        </aside>
        <section
          className={`flex-1 overflow-y-auto bg-white md:block ${
            hasSelection ? "block" : "hidden"
          }`}
        >
          {hasSelection && (
            <MobileBackHeader onBack={onBack} backLabel={backLabel}>
              {selectedLabel}
            </MobileBackHeader>
          )}
          {detail}
        </section>
      </div>
    </div>
  );
}
