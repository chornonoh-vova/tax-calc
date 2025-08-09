import { useFieldArray, useForm } from "react-hook-form";
import { DividendsSchema, type DividendsSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./Button";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { Input } from "./Input";
import { useTaxWizardStore } from "./store";

export function DividendsForm() {
  const back = useTaxWizardStore((state) => state.back);
  const dividends = useTaxWizardStore((state) => state.dividends);
  const completeDividends = useTaxWizardStore(
    (state) => state.completeDividends,
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(DividendsSchema),
    defaultValues: { dividends },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dividends",
  });

  const onSubmit = (data: DividendsSchemaType) => {
    console.log(data);
    completeDividends(data.dividends);
  };

  return (
    <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
      <ul className="space-y-2">
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="grid grid-cols-5 gap-1 relative p-3 bg-white border border-gray-300 rounded-md"
          >
            <Input
              id={`dividends.${index}.stockName`}
              label="Stock"
              type="text"
              error={errors.dividends?.[index]?.stockName?.message}
              required
              placeholder="Stock name"
              {...register(`dividends.${index}.stockName`)}
            />

            <Input
              id={`dividends.${index}.stockCurrency`}
              label={"Currency"}
              error={errors.dividends?.[index]?.stockCurrency?.message}
              required
              placeholder="Stock currency"
              {...register(`dividends.${index}.stockCurrency`)}
            />

            <Input
              id={`dividends.${index}.payDate`}
              label="Pay date"
              type="date"
              error={errors.dividends?.[index]?.payDate?.message}
              required
              {...register(`dividends.${index}.payDate`)}
            />

            <Input
              id={`dividends.${index}.payAmount`}
              label="Pay amount"
              type="text"
              error={errors.dividends?.[index]?.payAmount?.message}
              required
              {...register(`dividends.${index}.payAmount`, {
                valueAsNumber: true,
              })}
            />

            <Input
              id={`dividends.${index}.payExchangeRate`}
              label="Pay rate"
              type="text"
              error={errors.dividends?.[index]?.payExchangeRate?.message}
              required
              {...register(`dividends.${index}.payExchangeRate`, {
                valueAsNumber: true,
              })}
            />

            <Button
              type="button"
              icon
              onClick={() => remove(index)}
              className="absolute top-0.5 right-0.5"
              title={`Remove entry ${index}`}
            >
              <X className="size-4.5" />
            </Button>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        className="justify-self-center"
        onClick={() =>
          append({
            stockName: "",
            stockCurrency: "",
            payDate: "",
            payAmount: 0,
            payExchangeRate: 0,
          })
        }
      >
        <Plus className="size-4.5" /> Add entry
      </Button>
      <div className="grid grid-cols-2 justify-self-center gap-5">
        <Button
          type="button"
          className="justify-evenly"
          disabled={isSubmitting}
          onClick={back}
        >
          <ArrowLeft className="size-4.5" /> Back
        </Button>
        <Button
          type="submit"
          className="justify-evenly"
          disabled={isSubmitting}
        >
          Next
          <ArrowRight className="size-4.5" />
        </Button>
      </div>
    </form>
  );
}
