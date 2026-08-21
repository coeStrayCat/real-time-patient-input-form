"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FieldGroup from "@/components/molecules/FieldGroup";
import FormField from "@/components/molecules/FormField";
import EmergencyContactFields from "@/components/molecules/EmergencyContactFields";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";
import AngleLeftIcon from "@/assets/icons/angle-left-solid-full.svg";
import { validatePatientForm } from "@/lib/validation/patientFormSchema";
import { usePatientStore } from "@/lib/store/usePatientStore";
import { getSocket } from "@/lib/socket/socketClient";
import { getOrCreatePatientId, resetPatientId } from "@/lib/utils/patientId";
import { EVENTS } from "@/lib/socket/events";
import { useTranslate } from "@/lib/i18n/useTranslate";
import { translateFormErrors } from "@/lib/i18n/translateErrors";

export default function PatientForm() {
  const t = useTranslate();
  const router = useRouter();
  const values = usePatientStore((state) => state.values);
  const errors = usePatientStore((state) => state.errors);
  const submitted = usePatientStore((state) => state.submitted);
  const setField = usePatientStore((state) => state.setField);
  const setErrors = usePatientStore((state) => state.setErrors);
  const markSubmitted = usePatientStore((state) => state.markSubmitted);
  const resetForm = usePatientStore((state) => state.reset);
  const setConnectionStatus = usePatientStore((state) => state.setConnectionStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genderOptions = [
    { value: "female", label: t("genderOptions.female") },
    { value: "male", label: t("genderOptions.male") },
    { value: "other", label: t("genderOptions.other") },
    { value: "prefer_not_to_say", label: t("genderOptions.preferNotToSay") },
  ];

  useEffect(() => {
    const patientId = getOrCreatePatientId();
    const socket = getSocket();
    socket.emit(EVENTS.PATIENT_JOIN, { patientId });

    function updateStatus() {
      if (!navigator.onLine) setConnectionStatus("offline");
      else if (socket.connected) setConnectionStatus("connected");
      else setConnectionStatus("reconnecting");
    }

    updateStatus();
    socket.on("connect", updateStatus);
    socket.on("disconnect", updateStatus);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      socket.off("connect", updateStatus);
      socket.off("disconnect", updateStatus);
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, [setConnectionStatus]);

  useEffect(() => {
    const patientId = getOrCreatePatientId();
    const socket = getSocket();
    const timeoutId = setTimeout(() => {
      socket.emit(EVENTS.PATIENT_FIELD_UPDATE, {
        patientId,
        fields: values,
        timestamp: Date.now(),
      });
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [values]);
  
  useEffect(() => {
    function handleUnload() {
      getSocket().disconnect();
    }
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
      getSocket().disconnect();
    };
  }, []);

  function handleExit() {
    getSocket().disconnect();
    router.push("/");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const cleanedValue = name === "phoneNumber" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setField(name, cleanedValue);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = validatePatientForm(values);
    setErrors(translateFormErrors(result.errors, t));
    if (!result.success) return;

    setIsSubmitting(true);
    const patientId = getOrCreatePatientId();
    const socket = getSocket();
    socket.emit(EVENTS.PATIENT_SUBMIT, { patientId, formData: result.data }, (ack) => {
      setIsSubmitting(false);
      if (ack?.success) {
        markSubmitted();
      } else {
        setErrors(translateFormErrors(ack?.errors ?? {}, t));
      }
    });
  }

  function handleStartNewForm() {
    const newPatientId = resetPatientId();
    resetForm();
    getSocket().emit(EVENTS.PATIENT_JOIN, { patientId: newPatientId });
  }

  if (submitted) {
    return (
      <div className="space-y-4 rounded-md border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-sm text-green-800">{t("formActions.successMessage")}</p>
        <Button type="button" variant="secondary" onClick={handleStartNewForm}>
          {t("formActions.newForm")}
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit} noValidate>
      <div className="flex justify-start">
        <button
          type="button"
          onClick={handleExit}
          className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          <AngleLeftIcon className="h-3 w-3 fill-current" />
          {t("common.back")}
        </button>
      </div>

      <FieldGroup title={t("sections.personal")}>
        <FormField id="firstName" label={t("fields.firstName")} required error={errors.firstName}>
          <Input
            name="firstName"
            placeholder={t("placeholders.firstName")}
            value={values.firstName}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="middleName" label={t("fields.middleName")} error={errors.middleName}>
          <Input
            name="middleName"
            placeholder={t("placeholders.middleName")}
            value={values.middleName}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="lastName" label={t("fields.lastName")} required error={errors.lastName}>
          <Input
            name="lastName"
            placeholder={t("placeholders.lastName")}
            value={values.lastName}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="dateOfBirth" label={t("fields.dateOfBirth")} required error={errors.dateOfBirth}>
          <Input name="dateOfBirth" type="date" value={values.dateOfBirth} onChange={handleChange} />
        </FormField>
        <FormField id="gender" label={t("fields.gender")} required error={errors.gender}>
          <Select
            name="gender"
            placeholder={t("placeholders.genderSelect")}
            options={genderOptions}
            value={values.gender}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="nationality" label={t("fields.nationality")} required error={errors.nationality}>
          <Input
            name="nationality"
            placeholder={t("placeholders.nationality")}
            value={values.nationality}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="religion" label={t("fields.religion")} error={errors.religion}>
          <Input
            name="religion"
            placeholder={t("placeholders.religion")}
            value={values.religion}
            onChange={handleChange}
          />
        </FormField>
      </FieldGroup>

      <FieldGroup title={t("sections.contact")}>
        <FormField id="phoneNumber" label={t("fields.phoneNumber")} required error={errors.phoneNumber}>
          <Input
            name="phoneNumber"
            type="tel"
            maxLength={10}
            placeholder={t("placeholders.phoneNumber")}
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </FormField>
        <FormField id="email" label={t("fields.email")} required error={errors.email}>
          <Input
            name="email"
            type="email"
            placeholder={t("placeholders.email")}
            value={values.email}
            onChange={handleChange}
          />
        </FormField>
        <FormField
          id="preferredLanguage"
          label={t("fields.preferredLanguage")}
          required
          error={errors.preferredLanguage}
        >
          <Input
            name="preferredLanguage"
            placeholder={t("placeholders.preferredLanguage")}
            value={values.preferredLanguage}
            onChange={handleChange}
          />
        </FormField>
        <div className="md:col-span-2">
          <FormField id="address" label={t("fields.address")} required error={errors.address}>
            <TextArea
              name="address"
              rows={3}
              placeholder={t("placeholders.address")}
              value={values.address}
              onChange={handleChange}
            />
          </FormField>
        </div>
      </FieldGroup>

      <FieldGroup title={t("sections.emergency")}>
        <EmergencyContactFields values={values} errors={errors} onChange={handleChange} t={t} />
      </FieldGroup>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("formActions.submitting") : t("formActions.submit")}
        </Button>
      </div>
    </form>
  );
}
