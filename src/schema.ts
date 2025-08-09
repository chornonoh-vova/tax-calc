import * as z from "zod";

export const DEFAULT_TARGET_CURRENCY = "UAH";
export const DEFAULT_ARMY_TAX = 5;
export const DEFAULT_INCOME_TAX = 18;

const num = (val: unknown) => {
  if (val === "" || val === undefined) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

export const SetupSchema = z.object({
  name: z.string().nonempty(),
  targetCurrency: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .default(DEFAULT_TARGET_CURRENCY),
  leftover: z.preprocess(num, z.number().min(0).optional()).default(0),
  armyTax: z
    .preprocess(num, z.number().min(0).max(100).optional())
    .default(DEFAULT_ARMY_TAX),
  incomeTax: z
    .preprocess(num, z.number().min(0).max(100).optional())
    .default(DEFAULT_INCOME_TAX),
});

export type SetupSchemaType = z.infer<typeof SetupSchema>;

export const TradeSchema = z
  .object({
    stockName: z.string().trim().nonempty(),
    stockCurrency: z.string().trim().nonempty(),
    buyDate: z.iso.date(),
    buyPrice: z.number(),
    buyExchangeRate: z.number(),
    sellDate: z.iso.date(),
    sellPrice: z.number(),
    sellExchangeRate: z.number(),
  })
  .refine((data) => new Date(data.buyDate) < new Date(data.sellDate), {
    message: "Buy date must be before sell date",
    path: ["buyDate"],
  });

export type TradeSchemaType = z.infer<typeof TradeSchema>;

export const TradesSchema = z.object({
  trades: z.array(TradeSchema),
});

export type TradesSchemaType = z.infer<typeof TradesSchema>;

export const DividendSchema = z.object({
  stockName: z.string().trim().nonempty(),
  stockCurrency: z.string().trim().nonempty(),
  payDate: z.iso.date(),
  payAmount: z.number(),
  payExchangeRate: z.number(),
});

export type DividendSchemaType = z.infer<typeof DividendSchema>;

export const DividendsSchema = z.object({
  dividends: z.array(DividendSchema),
});

export type DividendsSchemaType = z.infer<typeof DividendsSchema>;
