import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (newLanguage: string) => {
    localStorage.setItem("i18nextLng", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      <label htmlFor="language-selector" className="sr-only md:not-sr-only">
        {t("languageSelector")}
      </label>

      <select
        name="languages"
        id="language-selector"
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={i18n.language}
        onChange={(event) => changeLanguage(event.target.value)}
      >
        <option value="en">🇺🇸 {t("languages.english")}</option>
        <option value="uk">🇺🇦 {t("languages.ukrainian")}</option>
      </select>
    </div>
  );
}
