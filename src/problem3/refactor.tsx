interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

const getPriority = (blockchain: string): number => {
    switch (blockchain) {
        case 'Osmosis':
            return 100
        case 'Ethereum':
            return 50
        case 'Arbitrum':
            return 30
        case 'Zilliqa':
            return 20
        case 'Neo':
            return 20
        default:
            return -99
    }
}

const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => { balance.amount > 0 })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                getPriority(lhs.blockchain) - getPriority(rhs.blockchain);
            });
    }, [balances, prices]);

    const formattedBalances = sortedBalances.map(balance => ({
        ...balance,
        formatted: balance.amount.toFixed()
    }));

    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...props}>
            {rows}
        </div>
    )
}