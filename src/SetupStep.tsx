import { SetupForm } from "./SetupForm";

export function SetupStep() {
  return (
    <>
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-xl text-gray-800 font-semibold">Setup</h2>
        <p className="text-sm text-gray-700">
          Setup general settings for calculation
        </p>
      </div>
      <SetupForm />
    </>
  );
}
