export default function PatientFormLayout({ children, header }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="grid-cols-1 sm:flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        {header}
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
