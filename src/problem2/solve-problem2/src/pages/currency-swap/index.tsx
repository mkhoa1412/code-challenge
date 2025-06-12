import type React from "react";

import { useState } from "react";

import {
  ArrowUpDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Separator } from "@radix-ui/react-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGetCurrencyQuery } from "@/query/use-get-currency-query";

// // Mock exchange rates - in a real app, this would come from an API
// const exchangeRates = {
//   USD: { EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.35, AUD: 1.52, CHF: 0.88 },
//   EUR: { USD: 1.09, GBP: 0.86, JPY: 162.8, CAD: 1.47, AUD: 1.65, CHF: 0.96 },
//   GBP: { USD: 1.27, EUR: 1.16, JPY: 189.2, CAD: 1.71, AUD: 1.92, CHF: 1.12 },
//   JPY: {
//     USD: 0.0067,
//     EUR: 0.0061,
//     GBP: 0.0053,
//     CAD: 0.009,
//     AUD: 0.01,
//     CHF: 0.0059,
//   },
//   CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 110.7, AUD: 1.13, CHF: 0.65 },
//   AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 98.3, CAD: 0.88, CHF: 0.58 },
//   CHF: { USD: 1.14, EUR: 1.04, GBP: 0.89, JPY: 169.9, CAD: 1.54, AUD: 1.72 },
// };

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
];

export default function CurrencySwapForm() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0);

  const { data: currencyData } = useGetCurrencyQuery();
  console.log(currencyData);
  // // Calculate exchange rate and convert amount
  // useEffect(() => {
  //   if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
  //     const rate = exchangeRates[fromCurrency]?.[toCurrency] || 0;
  //     setExchangeRate(rate);

  //     if (fromAmount && !isNaN(Number.parseFloat(fromAmount))) {
  //       const converted = (Number.parseFloat(fromAmount) * rate).toFixed(2);
  //       setToAmount(converted);
  //     } else {
  //       setToAmount("");
  //     }
  //   } else {
  //     setExchangeRate(1);
  //     setToAmount(fromAmount);
  //   }
  // }, [fromCurrency, toCurrency, fromAmount]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    setError("");
    setSuccess(false);
  };

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    const tempAmount = fromAmount;

    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const validateForm = () => {
    if (!fromAmount || isNaN(Number.parseFloat(fromAmount))) {
      setError("Please enter a valid amount");
      return false;
    }

    if (Number.parseFloat(fromAmount) <= 0) {
      setError("Amount must be greater than 0");
      return false;
    }

    if (Number.parseFloat(fromAmount) > 1000000) {
      setError("Amount cannot exceed $1,000,000");
      return false;
    }

    if (fromCurrency === toCurrency) {
      setError("Please select different currencies");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setSuccess(false);
      setFromAmount("");
      setToAmount("");
    }, 3000);
  };

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency);
  const toCurrencyData = currencies.find((c) => c.code === toCurrency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Currency Swap
          </CardTitle>
          <CardDescription>
            Exchange your assets instantly at competitive rates
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Currency Section */}
            <div className="space-y-3">
              <Label
                htmlFor="from-amount"
                className="text-sm font-medium text-gray-700"
              >
                From
              </Label>
              <div className="space-y-2">
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="h-12">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {fromCurrencyData?.flag}
                        </span>
                        <span className="font-medium">{fromCurrency}</span>
                        <span className="text-gray-500 text-sm">
                          {fromCurrencyData?.name}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-gray-500 text-sm">
                            {currency.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Input
                    id="from-amount"
                    type="number"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={handleFromAmountChange}
                    className="h-12 text-lg pl-8 pr-4"
                    step="0.01"
                    min="0"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    {fromCurrencyData?.symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwapCurrencies}
                className="rounded-full h-10 w-10 border-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* To Currency Section */}
            <div className="space-y-3">
              <Label
                htmlFor="to-amount"
                className="text-sm font-medium text-gray-700"
              >
                To
              </Label>
              <div className="space-y-2">
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="h-12">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{toCurrencyData?.flag}</span>
                        <span className="font-medium">{toCurrency}</span>
                        <span className="text-gray-500 text-sm">
                          {toCurrencyData?.name}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-gray-500 text-sm">
                            {currency.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Input
                    id="to-amount"
                    type="number"
                    placeholder="0.00"
                    value={toAmount}
                    readOnly
                    className="h-12 text-lg pl-8 pr-4 bg-gray-50"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    {toCurrencyData?.symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Exchange Rate Display */}
            {fromCurrency !== toCurrency && exchangeRate > 0 && (
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Exchange Rate
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </Badge>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Message */}
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Swap completed successfully! Your transaction is being
                  processed.
                </AlertDescription>
              </Alert>
            )}

            <Separator />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              disabled={isLoading || !fromAmount || !toAmount}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Swap...
                </>
              ) : (
                `Swap ${fromAmount || "0"} ${fromCurrency} → ${
                  toAmount || "0"
                } ${toCurrency}`
              )}
            </Button>
          </form>

          {/* Additional Info */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>• No hidden fees • Instant processing • Secure transactions</p>
            <p>Exchange rates update every 30 seconds</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
