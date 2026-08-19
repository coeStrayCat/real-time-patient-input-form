import { z } from "zod";

const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;

const requiredText = (label) =>
  z
    .string()
    .trim()
    .min(1, `กรุณากรอก${label}`);

export const patientFormSchema = z
  .object({
    firstName: requiredText("ชื่อจริง"),
    middleName: z.string().trim().optional(),
    lastName: requiredText("นามสกุล"),
    dateOfBirth: requiredText("วันเกิด"),
    gender: requiredText("เพศ"),
    phoneNumber: z
      .string()
      .trim()
      .min(1, "กรุณากรอกเบอร์โทรศัพท์")
      .regex(PHONE_REGEX, "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง"),
    email: z
      .string()
      .trim()
      .min(1, "กรุณากรอกอีเมล")
      .pipe(z.email("รูปแบบอีเมลไม่ถูกต้อง")),
    address: requiredText("ที่อยู่"),
    preferredLanguage: requiredText("ภาษาที่ต้องการสื่อสาร"),
    nationality: requiredText("สัญชาติ"),
    religion: z.string().trim().optional(),
    emergencyContactName: z.string().trim().optional(),
    emergencyContactRelationship: z.string().trim().optional(),
  })
  .refine(
    (data) =>
      Boolean(data.emergencyContactName) === Boolean(data.emergencyContactRelationship),
    {
      message: "กรุณากรอกทั้งชื่อผู้ติดต่อฉุกเฉินและความสัมพันธ์ให้ครบทั้งสองช่อง",
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
