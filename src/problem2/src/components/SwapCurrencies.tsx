import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Switch from "src/assets/images/switch-white.svg";
import { Label } from "@radix-ui/react-label";
import { SelectCurrencies } from "./SelectCurrencies";
import { fetchCurrencyPrices, Currency } from "../services/apiService";
import { Loader2 } from "lucide-react";

export const SwapCurrencies = () => {
    const form = useForm();
    const balance = 1000;
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [sendAmount, setSendAmount] = useState("");
    const [receiveAmount, setReceiveAmount] = useState("");
    const [sendCurrency, setSendCurrency] = useState("USD");
    const [receiveCurrency, setReceiveCurrency] = useState("ETH");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        const loadPrices = async () => {
            const data = await fetchCurrencyPrices();
            setCurrencies(data);
        };

        loadPrices();
    }, []);

    useEffect(() => {
        if (!sendAmount || isNaN(parseFloat(sendAmount))) {
            setReceiveAmount("");
            setError("");
            return;
        }

        if (parseFloat(sendAmount) > balance) {
            setError("Insufficient balance");
            return;
        }

        setError("");

        const fromCurrency = currencies.find((c) => c.currency === sendCurrency);
        const toCurrency = currencies.find((c) => c.currency === receiveCurrency);

        if (fromCurrency && toCurrency) {
            const exchangeRate = fromCurrency.price / toCurrency.price;
            setReceiveAmount((parseFloat(sendAmount) * exchangeRate).toFixed(6));
        }
    }, [sendAmount, sendCurrency, receiveCurrency, currencies, balance]);

    const handleConfirmSwap = () => {
        if (!sendAmount || error) return;

        setIsLoading(true); 

        setTimeout(() => {
            setSuccessMessage(`Swap ${sendAmount} ${sendCurrency} to ${receiveAmount} ${receiveCurrency} successful!`);
            setTimeout(() => setSuccessMessage(""), 5000);
            setSendAmount("");
            setReceiveAmount("");
            setIsLoading(false); 
        }, 2000); 
    };

    return (
        <>
            <FormProvider {...form}>
                <div className="bg-cover rounded-xl" style={{ backgroundImage: "url('/src/assets/images/bg.svg')" }}>
                    <Card className="backdrop-blur-md bg-opacity-80 bg-card p-2 shadow-xl">
                        <CardHeader>
                            <CardTitle>Swap</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={() => (
                                        <FormItem>
                                            <div className="relative w-[500px]">
                                                {/* Amount to Send */}
                                                <div className="grid items-left bg-[#b1b1b53b] px-2 py-5 rounded-[5px]">
                                                    <div className="flex justify-between">
                                                        <Label htmlFor="sendAmount" className="text-left text-sm">
                                                            Amount to send
                                                        </Label>
                                                        <Label htmlFor="balance" className="text-right text-sm">
                                                            Available: {balance}
                                                        </Label>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <SelectCurrencies
                                                            currencyList={currencies}
                                                            selectedCurrency={sendCurrency}
                                                            onSelect={setSendCurrency}
                                                        />
                                                        <Input
                                                            id="sendAmount"
                                                            type="number"
                                                            step="any"
                                                            min="0"
                                                            placeholder="0.00"
                                                            value={sendAmount}
                                                            onChange={(e) => setSendAmount(e.target.value)}
                                                            className="border-none shadow-none focus:border-none text-right pr-0"
                                                        />
                                                    </div>
                                                    {error && <p className="text-red-500 text-right text-[10px]">{error}</p>}
                                                </div>

                                                {/* Swap Icon */}
                                                <div className="relative h-[10px]">
                                                    <div
                                                        className="rotate-90 absolute rounded-full p-1.5 left-1/2 -translate-y-[10px] -translate-x-1/2 h-[30px] w-[30px] bg-[#211e41b8] cursor-pointer"
                                                        onClick={() => {
                                                            setSendCurrency(receiveCurrency);
                                                            setReceiveCurrency(sendCurrency);
                                                            setSendAmount(receiveAmount);
                                                            setReceiveAmount(sendAmount);
                                                        }}
                                                    >
                                                        <img src={Switch} alt="swap" width={25} height={25} />
                                                    </div>
                                                </div>

                                                {/* Amount to Receive */}
                                                <div className="grid items-left bg-[#b1b1b53b] px-2 py-5 rounded-[5px]">
                                                    <Label htmlFor="receiveAmount" className="text-left text-sm">
                                                        Amount to receive
                                                    </Label>
                                                    <div className="flex justify-between">
                                                        <SelectCurrencies
                                                            currencyList={currencies}
                                                            selectedCurrency={receiveCurrency}
                                                            onSelect={setReceiveCurrency}
                                                        />
                                                        <Input
                                                            id="receiveAmount"
                                                            type="number"
                                                            step="any"
                                                            min="0"
                                                            placeholder="0.00"
                                                            value={receiveAmount}
                                                            readOnly
                                                            className="border-none shadow-none focus:border-none text-right pr-0"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </form>

                            {/* Exchange Rate Display */}
                            {sendCurrency && receiveCurrency && currencies.length > 0 && (() => {
                                const fromCurrency = currencies.find((c) => c.currency === sendCurrency);
                                const toCurrency = currencies.find((c) => c.currency === receiveCurrency);

                                if (fromCurrency && toCurrency) {
                                    return (
                                        <div className="text-center text-sm text-white-400 mt-2">
                                            1 {sendCurrency} = {(fromCurrency.price / toCurrency.price).toFixed(6)} {receiveCurrency}
                                        </div>
                                    );
                                }
                                return null;
                            })()}
                        </CardContent>

                        <CardFooter className="flex justify-center pt-6">
                            <Button
                                variant="outline"
                                className="bg-[#211E41] flex items-center justify-center"
                                disabled={!!error || !sendAmount || isLoading}
                                onClick={handleConfirmSwap}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin w-4 h-4" />
                                    </>
                                ) : (
                                    "CONFIRM SWAP"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </FormProvider>
            
            {successMessage && (
                <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
                    {successMessage}
                </div>
            )}
        </>
    );
};
