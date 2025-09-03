import AdmissionForm from "~/components/form/admission/AdmissionStudentForm";
import { ChevronRight } from "lucide-react";

export default function AdmissionStep1() {
  return (
    <main>
      <div className="container mx-auto px-4 pt-20 pb-4">
        <h1 className="flex items-center text-green-600 font-medium">
          Admission <ChevronRight className="h-4" />
        </h1>

        <AdmissionForm />
      </div>
    </main>
  );
}
