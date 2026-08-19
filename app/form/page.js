import PatientFormLayout from "@/components/templates/PatientFormLayout";
import PatientForm from "@/components/organisms/PatientForm";
import PatientConnectionStatus from "@/components/organisms/PatientConnectionStatus";

export default function FormPage() {
  return (
    <PatientFormLayout headerRight={<PatientConnectionStatus />}>
      <PatientForm />
    </PatientFormLayout>
  );
}
