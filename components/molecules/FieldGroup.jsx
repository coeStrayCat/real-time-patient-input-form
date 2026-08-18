export default function FieldGroup({ title, children }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-base font-semibold text-zinc-900">{title}</legend>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}
