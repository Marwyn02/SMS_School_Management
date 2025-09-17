import { create } from "zustand";

export interface FileState {
  files: {
    birthCert: File | null;
    goodMoral: File | null;
    reportCard: File | null;
    idParent: File | null;
  };
  isReadable: {
    birthCert: boolean;
    goodMoral: boolean;
    reportCard: boolean;
    idParent: boolean;
  };
  setFile: (key: keyof FileState["files"], file: File | null) => void;
  setReadable: (key: keyof FileState["isReadable"], value: boolean) => void;
  clearFiles: () => void;
  clearReadables: () => void;
}

export const useFileStore = create<FileState>((set) => ({
  files: {
    birthCert: null,
    goodMoral: null,
    reportCard: null,
    idParent: null,
  },
  isReadable: {
    birthCert: false,
    goodMoral: false,
    reportCard: false,
    idParent: false,
  },
  setFile: (key, file) =>
    set((state) => ({
      files: { ...state.files, [key]: file },
    })),
  setReadable: (key, value) =>
    set((state) => ({
      isReadable: { ...state.isReadable, [key]: value },
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
  clearReadables: () =>
    set({
      isReadable: {
        birthCert: false,
        goodMoral: false,
        reportCard: false,
        idParent: false,
      },
    }),
}));
