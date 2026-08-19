import PatientFormLayout from "@/components/templates/PatientFormLayout";
import PatientForm from "@/components/organisms/PatientForm";
import PatientFormHeader from "@/components/organisms/PatientFormHeader";

export default function FormPage() {
  return (
    <PatientFormLayout header={<PatientFormHeader />}>
      <PatientForm />
    </PatientFormLayout>
  );
}
