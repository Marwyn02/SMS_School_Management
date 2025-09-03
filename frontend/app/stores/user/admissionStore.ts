import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudentInfo {
  firstName: string;
  lastName: string;
  middleName: string;
  dob: string;
  gender: "Male" | "Female" | "";
  nationality: string;
  religion: string;
  email: string;
  phone: string;
  permanentAddress: string;
  currentAddress: string;
  previousSchool: string;
  lastGradeLevel: string;
  guardianFullName: string;
  guardianOccupation: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianAddress: string;
  guardianRelationship: string;
  emergencyContactPerson: string;
  emergencyContactNumber: string;
}

interface Documents {
  birthCert?: string;
  reportCard?: string;
  goodMoral?: string;
  idParent?: string;
}

interface AdmissionState {
  studentInfo: StudentInfo | null;
  documents: Documents;
  setStudentInfo: (info: StudentInfo) => void;
  setDocuments: (docs: Partial<Documents>) => void;
  reset: () => void;
}

export const useAdmissionStore = create<AdmissionState>()(
  persist(
    (set) => ({
      studentInfo: null,
      documents: {},
      setStudentInfo: (info) => set({ studentInfo: info }),
      setDocuments: (docs) =>
        set((state) => ({ documents: { ...state.documents, ...docs } })),
      reset: () => set({ studentInfo: null, documents: {} }),
    }),
    {
      name: "admission-storage",
    }
  )
);
