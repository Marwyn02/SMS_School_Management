import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StudentDetails {
  firstName: string;
  lastName: string;
  middleName?: string;
  dob: string; // Stored as string (e.g., 'yyyy-MM-dd')
  gender: "Male" | "Female" | "";
  nationality: string;
  religion: string;
  email: string;
  phone: string;
  permanentAddress: string;
  currentAddress: string;
}

interface StudentAcademic {
  previousSchool: string;
  levelCategory: string;
  gradeLevels: string;
  academicStrands: string;
}

interface StudentParents {
  guardianFullName: string;
  guardianOccupation: string;
  guardianContactNumber: string;
  guardianEmailAddress: string;
  guardianAddress: string;
  guardianRelationship: string;
}

export interface AdmissionState {
  studentDetails: StudentDetails | null;
  studentAcademic: StudentAcademic | null;
  studentParents: StudentParents | null;
  setStudentDetails: (info: StudentDetails) => void;
  setStudentAcademic: (info: StudentAcademic) => void;
  setStudentParents: (info: StudentParents) => void;
  reset: () => void;
}

export const useAdmissionStore = create<AdmissionState>()(
  persist(
    (set) => ({
      studentDetails: null,
      studentAcademic: null,
      studentParents: null,
      setStudentDetails: (info) => set({ studentDetails: info }),
      setStudentAcademic: (info) => set({ studentAcademic: info }),
      setStudentParents: (info) => set({ studentParents: info }),
      reset: () =>
        set({
          studentDetails: null,
          studentAcademic: null,
          studentParents: null,
        }),
    }),
    {
      name: "admission-storage",
    }
  )
);
