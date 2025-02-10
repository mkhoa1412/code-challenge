/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICurrency } from "./containers/Swap/store/type";
import { currencyRequest } from "./containers/Swap/action";
import Form from "./containers/Swap/Form";

const Home = async () => {
  const requestCurrency = await currencyRequest();
  const res: Partial<{
    data: ICurrency[]
  }> = requestCurrency || {};
  const { data } = res;
  const initialValues = data?.map((item) => {
    return {
      label: item?.currency,
      value: item?.currency,
    }
  });
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form initialValues={initialValues} />
      </main>
    </div>
  );
};
export default Home;