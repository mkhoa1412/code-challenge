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

    const filteredBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            return getPriority(balance.blockchain) > -99 && balance.amount > 0;
        });
    }, [balances]);

    const sortedBalances = useMemo(() => {
        return filteredBalances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
            return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
        });
    }, [filteredBalances]);

    const formattedBalances = useMemo(() => {
        return sortedBalances.map((balance: WalletBalance) => {
            return {
                ...balance,
                formatted: balance.amount.toFixed(2) // Providing fixed precision
            };
        });
    }, [sortedBalances]);

    const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={`${balance.currency}-${balance.blockchain}`} // Using a unique key
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        );
    });

    return (
        <div {...rest}>
            {rows}
        </div>
    );
};