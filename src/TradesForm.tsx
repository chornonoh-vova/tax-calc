import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { TradesSchema, type TradesSchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";
import { Button } from "./Button";
import { useTaxWizardStore } from "./store";

export function TradesForm() {
  const back = useTaxWizardStore((state) => state.back);
  const trades = useTaxWizardStore((state) => state.trades);
  const completeTrades = useTaxWizardStore((state) => state.completeTrades);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(TradesSchema),
    defaultValues: { trades },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "trades",
  });

  const onSubmit = (data: TradesSchemaType) => {
    console.log(data);
    completeTrades(data.trades);
  };

  return (
    <form className="grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
      <ul className="space-y-2">
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 relative p-3 bg-white border border-gray-300 rounded-md"
          >
            <Input
              id={`trades.${index}.stockName`}
              label="Stock"
              type="text"
              error={errors.trades?.[index]?.stockName?.message}
              required
              placeholder="Stock name"
              {...register(`trades.${index}.stockName`)}
            />

            <Input
              id={`trades.${index}.stockCurrency`}
              label={"Currency"}
              error={errors.trades?.[index]?.stockCurrency?.message}
              required
              placeholder="Stock currency"
              {...register(`trades.${index}.stockCurrency`)}
            />

            <Input
              id={`trades.${index}.buyDate`}
              label="Buy date"
              type="date"
              error={errors.trades?.[index]?.buyDate?.message}
              required
              {...register(`trades.${index}.buyDate`)}
            />

            <Input
              id={`trades.${index}.buyPrice`}
              label="Buy price"
              type="text"
              error={errors.trades?.[index]?.buyPrice?.message}
              required
              {...register(`trades.${index}.buyPrice`, {
                valueAsNumber: true,
              })}
            />

            <Input
              id={`trades.${index}.buyExchangeRate`}
              label="Buy rate"
              type="text"
              error={errors.trades?.[index]?.buyExchangeRate?.message}
              required
              placeholder="Buying exchange rate"
              {...register(`trades.${index}.buyExchangeRate`, {
                valueAsNumber: true,
              })}
            />
            <Input
              id={`trades.${index}.sellDate`}
              label="Sell date"
              type="date"
              error={errors.trades?.[index]?.sellDate?.message}
              required
              {...register(`trades.${index}.sellDate`)}
            />

            <Input
              id={`trades.${index}.sellPrice`}
              label="Sell price"
              type="text"
              error={errors.trades?.[index]?.sellPrice?.message}
              required
              {...register(`trades.${index}.sellPrice`, {
                valueAsNumber: true,
              })}
            />

            <Input
              id={`trades.${index}.sellExchangeRate`}
              label="Sell rate"
              type="text"
              error={errors.trades?.[index]?.sellExchangeRate?.message}
              required
              {...register(`trades.${index}.sellExchangeRate`, {
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
            buyDate: "",
            buyPrice: 0,
            buyExchangeRate: 0,
            sellDate: "",
            sellPrice: 0,
            sellExchangeRate: 0,
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
