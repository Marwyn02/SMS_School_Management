import { ChevronRight } from "lucide-react";
import AdmissionDocumentForm from "~/components/form/admission/AdmissionDocumentForm";

export default function AdmissionStep4() {
  return (
    <main>
      <div className="container mx-auto px-4 pt-20 pb-4">
        <h1 className="flex items-center text-green-600 font-medium">
          Admission Step - 4 <ChevronRight className="h-4" />
        </h1>

        <AdmissionDocumentForm />
      </div>
    </main>
  );
}
