export function calculateOutputAmount(
  inputAmount: number,
  inputPrice: number | null,
  outputPrice: number | null
): number {
  if (inputPrice === null || !outputPrice) return 0;

  return (inputAmount * inputPrice) / outputPrice;
}
