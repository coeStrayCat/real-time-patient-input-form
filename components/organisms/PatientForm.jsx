"use client";

import { useEffect } from "react";
import FieldGroup from "@/components/molecules/FieldGroup";
import FormField from "@/components/molecules/FormField";
import EmergencyContactFields from "@/components/molecules/EmergencyContactFields";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";
import { validatePatientForm } from "@/lib/validation/patientFormSchema";
import { usePatientStore } from "@/lib/store/usePatientStore";
import { getSocket } from "@/lib/socket/socketClient";
import { getOrCreatePatientId } from "@/lib/utils/patientId";
import { EVENTS } from "@/lib/socket/events";

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export default function PatientForm() {
  const values = usePatientStore((state) => state.values);
  const errors = usePatientStore((state) => state.errors);
  const submitted = usePatientStore((state) => state.submitted);
  const setField = usePatientStore((state) => state.setField);
  const setErrors = usePatientStore((state) => state.setErrors);
  const markSubmitted = usePatientStore((state) => state.markSubmitted);

  useEffect(() => {
    const patientId = getOrCreatePatientId();
    const socket = getSocket();
    socket.emit(EVENTS.PATIENT_JOIN, { patientId });
  }, []);

  useEffect(() => {
    const patientId = getOrCreatePatientId();
    const socket = getSocket();
    const timeoutId = setTimeout(() => {
      socket.emit(EVENTS.PATIENT_FIELD_UPDATE, {
        patientId,
        fields: values,
        timestamp: Date.now(),
      });
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [values]);

  function handleChange(event) {
    const { name, value } = event.target;
    setField(name, value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = validatePatientForm(values);
    setErrors(result.errors);
    if (result.success) {
      markSubmitted();
      console.log("Patient form submitted:", result.data);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 p-6 text-center text-sm text-green-800">
        ส่งข้อมูลเรียบร้อยแล้ว ขอบคุณค่ะ
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit} noValidate>
      <FieldGroup title="Personal Information">
        <FormField id="firstName" label="First Name" required error={errors.firstName}>
          <Input name="firstName" placeholder="Manee" value={values.firstName} onChange={handleChange} />
        </FormField>
        <FormField id="middleName" label="Middle Name (optional)" error={errors.middleName}>
          <Input name="middleName" placeholder="Michael" value={values.middleName} onChange={handleChange} />
        </FormField>
        <FormField id="lastName" label="Last Name" required error={errors.lastName}>
          <Input name="lastName" placeholder="Jaidee" value={values.lastName} onChange={handleChange} />
        </FormField>
        <FormField id="dateOfBirth" label="Date of Birth" required error={errors.dateOfBirth}>
          <Input name="dateOfBirth" type="date" value={values.dateOfBirth} onChange={handleChange} />
        </FormField>
        <FormField id="gender" label="Gender" required error={errors.gender}>
          <Select
            name="gender"
            placeholder="Select gender"
            options={GENDER_OPTIONS}
            value={values.gender}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="nationality" label="Nationality" required error={errors.nationality}>
          <Input name="nationality" placeholder="e.g. Thai" value={values.nationality} onChange={handleChange} />
        </FormField>
        <FormField id="religion" label="Religion (optional)" error={errors.religion}>
          <Input name="religion" placeholder="e.g. Buddhist" value={values.religion} onChange={handleChange} />
        </FormField>
      </FieldGroup>

      <FieldGroup title="Contact Information">
        <FormField id="phoneNumber" label="Phone Number" required error={errors.phoneNumber}>
          <Input
            name="phoneNumber"
            type="tel"
            placeholder="081-234-5678"
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="email" label="Email" required error={errors.email}>
          <Input
            name="email"
            type="email"
            placeholder="manee@example.com"
            value={values.email}
            onChange={handleChange}
          />
        </FormField>
        <FormField
          id="preferredLanguage"
          label="Preferred Language"
          required
          error={errors.preferredLanguage}
        >
          <Input
            name="preferredLanguage"
            placeholder="e.g. Thai"
            value={values.preferredLanguage}
            onChange={handleChange}
          />
        </FormField>
        <div className="md:col-span-2">
          <FormField id="address" label="Address" required error={errors.address}>
            <TextArea
              name="address"
              rows={3}
              placeholder="House no., street, city, postal code"
              value={values.address}
              onChange={handleChange}
            />
          </FormField>
        </div>
      </FieldGroup>

      <FieldGroup title="Emergency Contact (optional)">
        <EmergencyContactFields values={values} errors={errors} onChange={handleChange} />
      </FieldGroup>

      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
