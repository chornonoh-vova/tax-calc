import { DividendsForm } from "./DividendsForm";

export function DividendsStep() {
  return (
    <>
      <div>
        <h2 className="text-xl text-gray-800 font-semibold">Dividends</h2>
        <p className="text-sm text-gray-700">
          Information about dividends received for a report period
        </p>
      </div>
      <DividendsForm />
    </>
  );
}
