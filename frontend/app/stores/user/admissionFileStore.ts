import { create } from "zustand";

interface FileState {
  files: {
    birthCert: File | null;
    goodMoral: File | null;
    reportCard: File | null;
    idParent: File | null;
  };
  setFile: (key: keyof FileState["files"], file: File | null) => void;
  clearFiles: () => void;
}

export const useFileStore = create<FileState>((set) => ({
  files: {
    birthCert: null,
    goodMoral: null,
    reportCard: null,
    idParent: null,
  },
  setFile: (key, file) =>
    set((state) => ({
      files: { ...state.files, [key]: file },
    })),
  clearFiles: () =>
    set({
      files: {
        birthCert: null,
        goodMoral: null,
        reportCard: null,
        idParent: null,
      },
    }),
}));
