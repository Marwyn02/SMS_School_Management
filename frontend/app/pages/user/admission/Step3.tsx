import { ChevronRight } from "lucide-react";
import AdmissionGradeLevelForm from "app/components/form/admission/AdmissionGradeLevelForm";

export default function AdmissionStep3() {
  return (
    <main>
      <div className="container mx-auto px-4 pt-20 pb-4">
        <h1 className="flex items-center text-green-600 font-medium">
          Admission Step - 3 <ChevronRight className="h-4" />
        </h1>

        <AdmissionGradeLevelForm />
      </div>
    </main>
  );
}
