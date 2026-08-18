import FieldGroup from "@/components/molecules/FieldGroup";
import FormField from "@/components/molecules/FormField";
import EmergencyContactFields from "@/components/molecules/EmergencyContactFields";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export default function PatientForm() {
  return (
    <form className="space-y-8">
      <FieldGroup title="Personal Information">
        <FormField id="firstName" label="First Name" required>
          <Input name="firstName" placeholder="Manee" />
        </FormField>
        <FormField id="middleName" label="Middle Name (optional)">
          <Input name="middleName" placeholder="Michael" />
        </FormField>
        <FormField id="lastName" label="Last Name" required>
          <Input name="lastName" placeholder="Jaidee" />
        </FormField>
        <FormField id="dateOfBirth" label="Date of Birth" required>
          <Input name="dateOfBirth" type="date" />
        </FormField>
        <FormField id="gender" label="Gender" required>
          <Select name="gender" placeholder="Select gender" options={GENDER_OPTIONS} />
        </FormField>
        <FormField id="nationality" label="Nationality" required>
          <Input name="nationality" placeholder="e.g. Thai" />
        </FormField>
        <FormField id="religion" label="Religion (optional)">
          <Input name="religion" placeholder="e.g. Buddhist" />
        </FormField>
      </FieldGroup>

      <FieldGroup title="Contact Information">
        <FormField id="phoneNumber" label="Phone Number" required>
          <Input name="phoneNumber" type="tel" placeholder="081-234-5678" />
        </FormField>
        <FormField id="email" label="Email" required>
          <Input name="email" type="email" placeholder="john@example.com" />
        </FormField>
        <FormField id="preferredLanguage" label="Preferred Language" required>
          <Input name="preferredLanguage" placeholder="e.g. Thai" />
        </FormField>
        <div className="md:col-span-2">
          <FormField id="address" label="Address" required>
            <TextArea
              name="address"
              rows={3}
              placeholder="House no., street, city, postal code"
            />
          </FormField>
        </div>
      </FieldGroup>

      <FieldGroup title="Emergency Contact (optional)">
        <EmergencyContactFields />
      </FieldGroup>

      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
