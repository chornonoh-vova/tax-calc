import { useMemo } from "react";
import { useTaxWizardStore } from "./store";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Button } from "./Button";

function Time({ date }: { date: Date }) {
  const { i18n } = useTranslation();
  return (
    <time dateTime={date.toISOString()}>
      {Intl.DateTimeFormat(i18n.language).format(date)}
    </time>
  );
}

function Number({ value, sign = false }: { value: number; sign?: boolean }) {
  const { i18n } = useTranslation();
  return (
    <>
      {Intl.NumberFormat(i18n.language, {
        signDisplay: sign ? "exceptZero" : "auto",
      }).format(value)}
    </>
  );
}

export function ResultsStep() {
  const back = useTaxWizardStore((state) => state.back);
  const setup = useTaxWizardStore((state) => state.setup);
  const trades = useTaxWizardStore((state) => state.trades);
  const dividends = useTaxWizardStore((state) => state.dividends);

  const tradesResults = useMemo(() => {
    const allTrades = trades.map((trade) => {
      const convertedBuyPrice = trade.buyPrice * trade.buyExchangeRate;
      const convertedSellPrice = trade.sellPrice * trade.sellExchangeRate;

      const profit = convertedSellPrice - convertedBuyPrice;

      return {
        stockName: trade.stockName,
        stockCurrency: trade.stockCurrency,

        buyDate: new Date(trade.buyDate),
        buyPrice: trade.buyPrice,
        buyExchangeRate: trade.buyExchangeRate,
        convertedBuyPrice,

        sellDate: new Date(trade.sellDate),
        sellPrice: trade.sellPrice,
        sellExchangeRate: trade.sellExchangeRate,
        convertedSellPrice,

        profit,
      };
    });

    const totalProfit = allTrades.reduce((prev, curr) => prev + curr.profit, 0);

    let tradesIncomeTax = 0,
      tradesArmyTax = 0;

    if (totalProfit > 0) {
      tradesIncomeTax = totalProfit * (setup.incomeTax / 100);
      tradesArmyTax = totalProfit * (setup.armyTax / 100);
    }

    return {
      allTrades,
      totalProfit,
      tradesIncomeTax,
      tradesArmyTax,
    };
  }, [setup, trades]);

  const dividendsResults = useMemo(() => {
    const allDividends = dividends.map((dividend) => {
      const convertedPayAmount = dividend.payAmount * dividend.payExchangeRate;

      return {
        stockName: dividend.stockName,
        stockCurrency: dividend.stockCurrency,

        payDate: new Date(dividend.payDate),
        payAmount: dividend.payAmount,
        payExchangeRate: dividend.payExchangeRate,
        convertedPayAmount,
      };
    });

    const totalProfit = allDividends.reduce(
      (prev, curr) => prev + curr.convertedPayAmount,
      0,
    );

    const dividendsIncomeTax = totalProfit * (setup.incomeTax / 100);
    const dividendsArmyTax = totalProfit * (setup.armyTax / 100);

    return {
      allDividends,
      totalProfit,
      dividendsIncomeTax,
      dividendsArmyTax,
    };
  }, [setup, dividends]);

  const totalIncomeTax =
    tradesResults.tradesIncomeTax + dividendsResults.dividendsIncomeTax;
  const totalArmyTax =
    tradesResults.tradesArmyTax + dividendsResults.dividendsArmyTax;

  const totalTax = totalIncomeTax + totalArmyTax;

  const classNameCell = "border border-gray-200 text-left py-2 px-3.5";
  const classNameHeader = "bg-gray-50";

  return (
    <div className="grid grid-cols-1 gap-5">
      <div>
        <h2 className="text-xl text-gray-800 font-semibold">Results</h2>
        <p className="text-sm text-gray-700">{setup.name} tax results</p>
      </div>

      <div className="overflow-auto space-y-2.5">
        <h3 className="font-semibold">Trade results</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <caption className="caption-bottom pt-2 text-xs">
            All trade results for {setup.name}
          </caption>
          <thead>
            <tr>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Stock name
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Stock currency
              </th>

              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Buy date
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Buy price
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Buy exchange rate
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Buy price in {setup.targetCurrency}
              </th>

              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Sell date
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Sell price
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Sell exchange rate
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Sell price in {setup.targetCurrency}
              </th>

              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Profit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tradesResults.allTrades.map((trade, idx) => (
              <tr key={`${trade.stockName}-${idx}`}>
                <th scope="row" className={classNameCell}>
                  {trade.stockName}
                </th>
                <td className={classNameCell}>{trade.stockCurrency}</td>

                <td className={classNameCell}>
                  <Time date={trade.buyDate} />
                </td>
                <td className={classNameCell}>
                  <Number value={trade.buyPrice} />
                </td>
                <td className={classNameCell}>
                  <Number value={trade.buyExchangeRate} />
                </td>
                <td className={classNameCell}>
                  <Number value={trade.convertedBuyPrice} />
                </td>

                <td className={classNameCell}>
                  <Time date={trade.sellDate} />
                </td>
                <td className={classNameCell}>
                  <Number value={trade.sellPrice} />
                </td>
                <td className={classNameCell}>
                  <Number value={trade.sellExchangeRate} />
                </td>
                <td className={classNameCell}>
                  <Number value={trade.convertedSellPrice} />
                </td>

                <td className={classNameCell}>
                  <Number value={trade.profit} sign />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={10} scope="row" className={classNameCell}>
                Total profit
              </th>
              <td className={classNameCell}>
                <Number value={tradesResults.totalProfit} sign />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="overflow-auto space-y-2.5">
        <h3 className="font-semibold">Dividend results</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <caption className="caption-bottom pt-2 text-xs">
            All dividend results for {setup.name}
          </caption>
          <thead>
            <tr>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Stock name
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Stock currency
              </th>

              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Pay date
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Pay amount
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Pay exchange rate
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Pay amount in {setup.targetCurrency}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {dividendsResults.allDividends.map((dividend, idx) => (
              <tr key={`${dividend.stockName}-${idx}`}>
                <th scope="row" className={classNameCell}>
                  {dividend.stockName}
                </th>
                <td className={classNameCell}>{dividend.stockCurrency}</td>

                <td className={classNameCell}>
                  <Time date={dividend.payDate} />
                </td>
                <td className={classNameCell}>
                  <Number value={dividend.payAmount} />
                </td>
                <td className={classNameCell}>
                  <Number value={dividend.payExchangeRate} />
                </td>
                <td className={classNameCell}>
                  <Number value={dividend.convertedPayAmount} sign />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={5} scope="row" className={classNameCell}>
                Total profit
              </th>
              <td className={classNameCell}>
                <Number value={dividendsResults.totalProfit} sign />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="overflow-auto space-y-2.5">
        <h3 className="font-semibold">Tax results</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <caption className="caption-bottom pt-2 text-xs">
            All tax results for {setup.name}
          </caption>
          <thead>
            <tr>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Category
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Income tax
              </th>
              <th scope="col" className={clsx(classNameCell, classNameHeader)}>
                Army tax
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <th scope="row" className={classNameCell}>
                Trades
              </th>
              <td className={classNameCell}>
                <Number value={tradesResults.tradesIncomeTax} />
              </td>
              <td className={classNameCell}>
                <Number value={tradesResults.tradesArmyTax} />
              </td>
            </tr>
            <tr>
              <th scope="row" className={classNameCell}>
                Dividends
              </th>
              <td className={classNameCell}>
                <Number value={dividendsResults.dividendsIncomeTax} />
              </td>
              <td className={classNameCell}>
                <Number value={dividendsResults.dividendsArmyTax} />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className={classNameCell}>
                Totals
              </th>
              <td className={classNameCell}>
                <Number value={totalIncomeTax} />
              </td>
              <td className={classNameCell}>
                <Number value={totalArmyTax} />
              </td>
            </tr>
            <tr>
              <th colSpan={2} scope="row" className={classNameCell}>
                Summary
              </th>
              <td className={classNameCell}>
                <Number value={totalTax} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="grid grid-cols-1 justify-self-center gap-5">
        <Button type="button" className="justify-evenly" onClick={back}>
          <ArrowLeft className="size-4.5" /> Back
        </Button>
      </div>
    </div>
  );
}
