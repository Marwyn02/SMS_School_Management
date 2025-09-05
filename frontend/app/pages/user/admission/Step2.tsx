import { ChevronRight } from "lucide-react";
import AdmissionParentForm from "~/components/form/admission/AdmissionParentForm";

export default function AdmissionStep2() {
  return (
    <main>
      <div className="container mx-auto px-4 pt-20 pb-4">
        <h1 className="flex items-center text-green-600 font-medium">
          Admission Step - 2 <ChevronRight className="h-4" />
        </h1>

        <AdmissionParentForm />
      </div>
    </main>
  );
}
