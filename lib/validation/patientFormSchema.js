import { z } from "zod";


const PHONE_REGEX = /^\d{9,10}$/;

const requiredText = () => z.string().trim().min(1, "required");

export const patientFormSchema = z
  .object({
    firstName: requiredText(),
    middleName: z.string().trim().optional(),
    lastName: requiredText(),
    dateOfBirth: requiredText(),
    gender: requiredText(),
    phoneNumber: z.string().trim().min(1, "required").regex(PHONE_REGEX, "invalidPhone"),
    email: z.string().trim().min(1, "required").pipe(z.email("invalidEmail")),
    address: requiredText(),
    preferredLanguage: requiredText(),
    nationality: requiredText(),
    religion: z.string().trim().optional(),
    emergencyContactName: z.string().trim().optional(),
    emergencyContactRelationship: z.string().trim().optional(),
  })
  .refine(
    (data) =>
      Boolean(data.emergencyContactName) === Boolean(data.emergencyContactRelationship),
    {
      message: "emergencyContactPair",
      path: ["emergencyContactRelationship"],
    },
  );

export function validatePatientForm(values) {
  const result = patientFormSchema.safeParse(values);
  if (result.success) {
    return { success: true, data: result.data, errors: {} };
  }

  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return { success: false, errors };
}
