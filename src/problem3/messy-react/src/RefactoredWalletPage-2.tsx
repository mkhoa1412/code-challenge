import React from 'react';

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Added blockchain field for filtering purposes
}

interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis': return 100;
            case 'Ethereum': return 50;
            case 'Arbitrum': return 30;
            case 'Zilliqa': return 20;
            case 'Neo': return 20;
            default: return -99;
        }
    };

    const sortedBalances = balances
        .filter((balance: WalletBalance) =>{
            return balance.amount > 0 && getPriority(balance.blockchain) > -99
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
            return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
        });

    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
        const formatted = balance.amount.toFixed();
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow className={classes.row}
                       key={index}
                       amount={balance.amount}
                       usdValue={usdValue}
                       formattedAmount={formatted} />
        );
    });

    return <div {...rest}>{rows}</div>;
}