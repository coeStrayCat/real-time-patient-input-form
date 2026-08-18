export default function EmptyState({ children }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 p-8 text-center text-sm text-zinc-500">
      {children}
    </div>
  );
}
