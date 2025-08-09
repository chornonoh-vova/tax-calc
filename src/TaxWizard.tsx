import { SetupStep } from "./SetupStep";
import { TradesStep } from "./TradesStep";
import { DividendsStep } from "./DividendsStep";
import { ResultsStep } from "./ResultsStep";
import { useTaxWizardStore } from "./store";

function CurrentStep() {
  const currentStep = useTaxWizardStore((state) => state.currentStep);
  switch (currentStep) {
    case 0:
      return <SetupStep />;
    case 1:
      return <TradesStep />;
    case 2:
      return <DividendsStep />;
    case 3:
      return <ResultsStep />;
    default:
      throw new Error("Invalid step");
  }
}

export function TaxWizard() {
  return (
    <div className="rounded-xl border border-gray-300 bg-gray-50 p-5 space-y-5">
      <CurrentStep />
    </div>
  );
}
