export function translateFormErrors(errors, t) {
  const translated = {};
  for (const [field, code] of Object.entries(errors)) {
    translated[field] =
      code === "required" ? t("validation.required", t(`fields.${field}`)) : t(`validation.${code}`);
  }
  return translated;
}
