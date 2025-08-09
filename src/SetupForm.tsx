import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SetupSchema, type SetupSchemaType } from "./schema";
import { useTranslation } from "react-i18next";
import { Input } from "./Input";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";
import { useTaxWizardStore } from "./store";

export function SetupForm() {
  const { t } = useTranslation();

  const setup = useTaxWizardStore((state) => state.setup);
  const completeSetup = useTaxWizardStore((state) => state.completeSetup);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SetupSchema),
    defaultValues: setup,
  });

  const onSubmit = (data: SetupSchemaType) => {
    completeSetup(data);
  };

  return (
    <form
      className="grid grid-cols-1 gap-5 max-w-[600px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-2">
        <Input
          id="setup-name"
          label={t("setup.name")}
          error={errors.name?.message}
          type="text"
          required
          autoComplete="name"
          placeholder="Enter the report name"
          {...register("name")}
        />

        <Input
          id="setup-target-currency"
          label={t("setup.targetCurrency")}
          error={errors.targetCurrency?.message}
          type="text"
          placeholder="UAH"
          {...register("targetCurrency")}
        />
      </div>

      <Input
        id="setup-leftover"
        label={t("setup.leftover")}
        error={errors.leftover?.message}
        type="number"
        placeholder="0"
        {...register("leftover")}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          id="setup-army-tax"
          label={t("setup.armyTax")}
          error={errors.armyTax?.message}
          type="number"
          min={0}
          max={100}
          {...register("armyTax")}
        />

        <Input
          id="setup-income-tax"
          label={t("setup.incomeTax")}
          error={errors.incomeTax?.message}
          type="number"
          min={0}
          max={100}
          {...register("incomeTax")}
        />
      </div>

      <Button
        type="submit"
        className="justify-evenly justify-self-end"
        disabled={isSubmitting}
      >
        {t("continue")} <ArrowRight className="size-4.5" />
      </Button>
    </form>
  );
}
