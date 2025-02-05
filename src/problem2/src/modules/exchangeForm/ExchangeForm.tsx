import InputField from "@components/Input/InputField";
import { BookmarkIcon, LoopIcon } from "@radix-ui/react-icons";
import { Button, Skeleton } from "@radix-ui/themes";
import { cn } from "@utils/helpers";
import * as React from "react";
import useGetCryptoData from "src/api/data/useGetCryptoData";
import CryptoSelectModal from "./components/CryptoSelectModal";
import SwapButton from "./components/SwapButton";
import "./styles/ExchangeForm.css";
interface IExchangeFormProps {}

const ExchangeForm: React.FunctionComponent<IExchangeFormProps> = (props) => {
  const { data, isLoading } = useGetCryptoData();
  console.log("data?.[0]", data?.[0]);
  if (!data && !isLoading) return <></>;
  return (
    <div className="flex w-full justify-center p-4 mt-[40px] md:mt-[60px]">
      <div className="border-t rounded-2xl border pt-8 w-full md:max-w-[556px] bg-white border-gray-100 md:shadow-xs p-4 md:p-8">
        <div className="flex justify-center items-center rounded-2xl bg-gray-200 font-extrabold h-[52px]">
          <h1 className="text-2xl">Swap</h1>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2 justify-start items-start w-full font-normal rounded-2xl bg-gray-100 px-3 py-4">
            <div className="flex items-center gap-x-2">
              <span>From</span>
              <CryptoSelectModal defaultValue={data?.[0]} />
            </div>
            <Skeleton loading={isLoading}>
              <InputField
                variant="soft"
                placeholder="0.0"
                radius="none"
                size={"3"}
                type="number"
                className={cn("input-price !rounded-sm", {
                  "!bg-gray-100": !isLoading,
                })}
              />
              <span className="text-xs text-gray-500 mt-[-12px] ml-[2px]">
                0.0$
              </span>
            </Skeleton>
          </div>
          <div className="flex justify-center items-center">
            <SwapButton />
          </div>
          <div className="flex flex-col gap-2 justify-start items-start w-full font-normal rounded-2xl bg-gray-100 px-3 py-4">
            <div className="flex items-center gap-x-2">
              <span>To</span>
              <CryptoSelectModal
                defaultValue={data?.[1]}
                onSelectValue={(value) => {
                  console.log("value", value);
                }}
              />
            </div>
            <Skeleton loading={isLoading}>
              <InputField
                variant="soft"
                placeholder="0.0"
                radius="none"
                size={"3"}
                type="number"
                className={cn("input-price !rounded-sm", {
                  "!bg-gray-100": !isLoading,
                })}
              />
            </Skeleton>
          </div>
        </div>{" "}
        <span className="text-xs flex justify-between mt-2">
          <span className="font-bold">Order Price (Price Impact)</span>
          <span className="font-bold flex gap-1">
            <LoopIcon width="14" height="14" className="rotate" />
            1&nbsp;ATOM&nbsp;=&nbsp;9.49&nbsp;USD&nbsp;
          </span>
        </span>{" "}
        <span className="text-xs flex justify-between mt-2">
          <span className="font-bold">Swap Fees</span>
          <span className="font-bold">69.36&nbsp;USD</span>
        </span>
        <Button
          color="indigo"
          variant="soft"
          className="!w-full !mt-6 !min-h-[48px]"
        >
          <span className="font-bold">Swap Token</span>
        </Button>
      </div>
    </div>
  );
};

export default ExchangeForm;
