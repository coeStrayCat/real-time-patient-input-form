import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";


export default function EmergencyContactFields({ values, errors, onChange }) {
  return (
    <>
      <FormField
        id="emergencyContactName"
        label="Emergency Contact Name (optional)"
        error={errors.emergencyContactName}
      >
        <Input
          name="emergencyContactName"
          placeholder="Manee Jaidee"
          value={values.emergencyContactName}
          onChange={onChange}
        />
      </FormField>
      <FormField
        id="emergencyContactRelationship"
        label="Relationship (optional)"
        error={errors.emergencyContactRelationship}
      >
        <Input
          name="emergencyContactRelationship"
          placeholder="e.g. Spouse"
          value={values.emergencyContactRelationship}
          onChange={onChange}
        />
      </FormField>
    </>
  );
}
