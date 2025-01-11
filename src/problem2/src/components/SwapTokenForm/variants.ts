import { tv } from 'tailwind-variants';

export const formStyles = tv({
  slots: {
    swapIconWrapper: 'relative h-10 flex w-full items-center',
    swapButton: '!bg-white !border !border-solid !border-gray-100 !absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] !transition-all !duration-100 !ease-linear hover:scale-110',
    swapIcon: 'w-6 h-6 ',
    amount:'text-[#898989] text-sm',
  },
});
export const swapConfirmStyles = tv({
  slots: {
    wrapper: 'flex justify-between',
    currencyWrapper:'flex',
    currencyIcon:'w-6 h-6 mr-2',
    currencyAmount:'text-[#3f2871] text-lg font-bold',
  },
});
