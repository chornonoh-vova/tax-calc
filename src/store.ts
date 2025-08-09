import { create } from "zustand";
import {
  DEFAULT_ARMY_TAX,
  DEFAULT_INCOME_TAX,
  DEFAULT_TARGET_CURRENCY,
  type DividendsSchemaType,
  type SetupSchemaType,
  type TradesSchemaType,
} from "./schema";

type TaxWizardState = {
  currentStep: number;
  setup: SetupSchemaType;
  trades: TradesSchemaType["trades"];
  dividends: DividendsSchemaType["dividends"];
};

type TaxWizardActions = {
  back: () => void;
  goTo: (step: 0 | 1 | 2) => void;
  completeSetup: (newSetup: SetupSchemaType) => void;
  completeTrades: (newTrades: TradesSchemaType["trades"]) => void;
  completeDividends: (newDividends: DividendsSchemaType["dividends"]) => void;
  reset: () => void;
};

export const useTaxWizardStore = create<TaxWizardState & TaxWizardActions>()(
  (set, _get, store) => ({
    currentStep: 0,

    setup: {
      name: "",
      targetCurrency: DEFAULT_TARGET_CURRENCY,
      leftover: 0,
      armyTax: DEFAULT_ARMY_TAX,
      incomeTax: DEFAULT_INCOME_TAX,
    },
    trades: [],
    dividends: [],

    back: () =>
      set(({ currentStep, ...other }) => ({
        ...other,
        currentStep: Math.max(currentStep - 1, 0),
      })),
    goTo: (step) =>
      set(({ currentStep, ...other }) => ({
        ...other,
        currentStep: step,
      })),
    completeSetup: (newSetup) =>
      set(({ currentStep, ...other }) => ({
        ...other,
        setup: newSetup,
        currentStep: currentStep + 1,
      })),
    completeTrades: (newTrades) =>
      set(({ currentStep, ...other }) => ({
        ...other,
        trades: newTrades,
        currentStep: currentStep + 1,
      })),
    completeDividends: (newDividends) =>
      set(({ currentStep, ...other }) => ({
        ...other,
        dividends: newDividends,
        currentStep: currentStep + 1,
      })),
    reset: () => set(store.getInitialState()),
  }),
);
