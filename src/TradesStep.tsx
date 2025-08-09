import { TradesForm } from "./TradesForm";

export function TradesStep() {
  return (
    <>
      <div>
        <h2 className="text-xl text-gray-800 font-semibold">Trades</h2>
        <p className="text-sm text-gray-700">
          Information about trades performed for a report period
        </p>
      </div>
      <TradesForm />
    </>
  );
}
