import { create } from "zustand";

export const useStaffStore = create((set) => ({
  sessions: [],
  selectedId: null,

  setSessionList: (sessions) => set({ sessions }),

  upsertSession: (session) =>
    set((state) => {
      const exists = state.sessions.some((s) => s.patientId === session.patientId);
      return {
        sessions: exists
          ? state.sessions.map((s) => (s.patientId === session.patientId ? session : s))
          : [...state.sessions, session],
      };
    }),

  updateSessionFields: (patientId, fields, status, lastUpdated) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.patientId === patientId ? { ...s, fields, status, lastUpdated } : s,
      ),
    })),

  updateSessionStatus: (patientId, status, connected) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.patientId === patientId ? { ...s, status, connected } : s,
      ),
    })),

  selectSession: (patientId) => set({ selectedId: patientId }),
  clearSelection: () => set({ selectedId: null }),
}));
