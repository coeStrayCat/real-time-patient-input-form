export default function PatientFormLayout({ children, headerRight }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold text-zinc-900">Patient Registration</h1>
        {headerRight}
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
