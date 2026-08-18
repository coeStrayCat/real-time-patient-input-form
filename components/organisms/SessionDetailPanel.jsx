import SessionDetailField from "@/components/molecules/SessionDetailField";
import EmptyState from "@/components/molecules/EmptyState";
import StatusBadge from "@/components/molecules/StatusBadge";

const FIELDS = [
  ["firstName", "First Name"],
  ["middleName", "Middle Name"],
  ["lastName", "Last Name"],
  ["dateOfBirth", "Date of Birth"],
  ["gender", "Gender"],
  ["phoneNumber", "Phone Number"],
  ["email", "Email"],
  ["address", "Address"],
  ["preferredLanguage", "Preferred Language"],
  ["nationality", "Nationality"],
  ["religion", "Religion"],
  ["emergencyContactName", "Emergency Contact Name"],
  ["emergencyContactRelationship", "Emergency Contact Relationship"],
];

export default function SessionDetailPanel({ session }) {
  if (!session) {
    return <EmptyState>Select a patient session to see live details.</EmptyState>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-zinc-900">{session.label}</h2>
        <StatusBadge status={session.status} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map(([key, label]) => (
          <SessionDetailField key={key} label={label} value={session.fields?.[key]} />
        ))}
      </div>
    </div>
  );
}
