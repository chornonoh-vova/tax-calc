import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { Loader } from "./Loader";
import { TaxWizard } from "./TaxWizard";

function App() {
  const { t } = useTranslation();

  return (
    <main className="container py-4 px-2 mx-auto space-y-5">
      <Suspense fallback={<Loader />}>
        <header className="flex flex-row gap-2 items-center justify-between">
          <h1 className="text-2xl">{t("title")}</h1>

          <LanguageSelector />
        </header>

        <TaxWizard />
      </Suspense>
    </main>
  );
}

export default App;
