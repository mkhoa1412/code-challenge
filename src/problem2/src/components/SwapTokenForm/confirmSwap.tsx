import SwapVertIcon from '@mui/icons-material/SwapVert';
import { swapConfirmStyles } from './variants';


type Props = {
    swapFromCurrency: string;
    swapToCurrency: string;
    swapAmount: number | string;
    exchangeBalance: number;
};

export default function confirmSwap({
    swapFromCurrency,
    swapToCurrency,
    swapAmount,
    exchangeBalance,
}: Props) {
    return (
        <>
            <div className={`${swapConfirmStyles().wrapper()}`}>
                <div className={`${swapConfirmStyles().currencyWrapper()}`}>
                    <img
                        loading="lazy"
                        src={`/tokens/${swapFromCurrency}.svg`}
                        alt={swapFromCurrency}
                        className={`${swapConfirmStyles().currencyIcon()}`}
                    />
                    <span className={`${swapConfirmStyles().currencyAmount()}`}>
                        {swapAmount}
                    </span>
                </div>
                <div className={`${swapConfirmStyles().currencyAmount()}`}>{swapFromCurrency}</div>
            </div>
            <div className="text-left py-3"><SwapVertIcon /></div>
            <div className={`${swapConfirmStyles().wrapper()}`}>
                <div className={`${swapConfirmStyles().currencyWrapper()}`}>
                    <img
                        loading="lazy"
                        src={`/tokens/${swapToCurrency}.svg`}
                        alt={swapToCurrency}
                        className={`${swapConfirmStyles().currencyIcon()}`}
                    />
                    <span className={`${swapConfirmStyles().currencyAmount()}`}>
                        {exchangeBalance}
                    </span>
                </div>
                <div className={`${swapConfirmStyles().currencyAmount()}`}>{swapToCurrency}</div>
            </div>
        </>
    );
}
