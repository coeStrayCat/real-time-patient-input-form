import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";

export default function EmergencyContactFields() {
  return (
    <>
      <FormField id="emergencyContactName" label="Emergency Contact Name (optional)">
        <Input name="emergencyContactName" placeholder="Manee Jaidee" />
      </FormField>
      <FormField id="emergencyContactRelationship" label="Relationship (optional)">
        <Input name="emergencyContactRelationship" placeholder="e.g. Spouse" />
      </FormField>
    </>
  );
}
