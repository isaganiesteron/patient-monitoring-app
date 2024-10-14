import { create } from 'zustand';

type Case = {
  id: number;
  patientName: string;
  status: string;
  lastUpdated: string;
  comments: { text: string; timestamp: string }[];
};

type CaseState = {
  cases: Case[];
  addCase: (newCase: Case) => void;
  updateCase: (id: number, updatedCase: Partial<Case>) => void;
  deleteCase: (id: number) => void;
  addComment: (id: number, comment: string) => void;
};

export const useCaseStore = create<CaseState>((set) => ({
  cases: [
    {
      id: 1,
      patientName: 'John Doe',
      status: 'Active',
      lastUpdated: new Date().toISOString(),
      comments: [],
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      status: 'Resolved',
      lastUpdated: new Date().toISOString(),
      comments: [],
    },
  ],
  addCase: (newCase) => set((state) => ({ cases: [...state.cases, newCase] })),
  updateCase: (id, updatedCase) =>
    set((state) => ({
      cases: state.cases.map((c) =>
        c.id === id ? { ...c, ...updatedCase, lastUpdated: new Date().toISOString() } : c
      ),
    })),
  deleteCase: (id) =>
    set((state) => ({
      cases: state.cases.filter((c) => c.id !== id),
    })),
  addComment: (id, comment) =>
    set((state) => ({
      cases: state.cases.map((c) =>
        c.id === id
          ? {
              ...c,lastUpdated: new Date().toISOString(),
              comments: [
                ...c.comments,
                { text: comment, timestamp: new Date().toISOString() },
              ],
            }
          : c
      ),
    })),
}));