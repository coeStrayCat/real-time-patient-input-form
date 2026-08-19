import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";

export default function EmergencyContactFields({ values, errors, onChange, t }) {
  return (
    <>
      <FormField id="emergencyContactName" label={t("fields.emergencyContactName")} error={errors.emergencyContactName}>
        <Input
          name="emergencyContactName"
          placeholder={t("placeholders.emergencyContactName")}
          value={values.emergencyContactName}
          onChange={onChange}
        />
      </FormField>
      <FormField
        id="emergencyContactRelationship"
        label={t("fields.emergencyContactRelationship")}
        error={errors.emergencyContactRelationship}
      >
        <Input
          name="emergencyContactRelationship"
          placeholder={t("placeholders.emergencyContactRelationship")}
          value={values.emergencyContactRelationship}
          onChange={onChange}
        />
      </FormField>
    </>
  );
}
