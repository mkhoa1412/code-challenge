import React, { useMemo } from 'react'
import { useWalletBalances, usePrices } from 'your-hooks' // Replace with actual import paths
import WalletRow from 'your-components/WalletRow' // Replace with actual import paths

interface BoxProps {}
interface WalletBalance {
  currency: string
  amount: number
  blockchain: string
}

interface Props extends BoxProps {}

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

const useSortedBalances = (balances: WalletBalance[]): WalletBalance[] => {
  return useMemo(() => {
    return balances
      .filter((balance) => {
        const balancePriority = getPriority(balance.blockchain)
        return balancePriority > -99 && balance.amount > 0
      })
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        return rightPriority - leftPriority
      })
  }, [balances])
}

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()
  const sortedBalances = useSortedBalances(balances)

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount
    return (
      <WalletRow
        className='row-class' // Replace with actual className if necessary
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    )
  })

  return <div {...rest}>{rows}</div>
}

export default WalletPage
