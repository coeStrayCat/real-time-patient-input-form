import { create } from "zustand";
import { persist } from "zustand/middleware";

export const INITIAL_VALUES = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  religion: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
};

export const usePatientStore = create(
  persist(
    (set) => ({
      values: INITIAL_VALUES,
      errors: {},
      submitted: false,
      connectionStatus: "reconnecting",

      setField: (name, value) =>
        set((state) => ({ values: { ...state.values, [name]: value } })),

      setErrors: (errors) => set({ errors }),

      setConnectionStatus: (connectionStatus) => set({ connectionStatus }),

      markSubmitted: () => set({ submitted: true }),

      reset: () => set({ values: INITIAL_VALUES, errors: {}, submitted: false }),
    }),
    {
      name: "patient-form-storage",
      partialize: (state) => ({ values: state.values }),
    },
  ),
);
