import { ChevronDownIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  IconButton,
  Skeleton,
  TextField,
} from "@radix-ui/themes";
import { cn } from "@utils/helpers";
import * as React from "react";
import useGetCryptoData from "src/api/data/useGetCryptoData";
import "../styles/CryptoSelectModal.css";
import { ICrypto } from "../types";
import { CRYPTO_LIST } from "../utils";

interface ICryptoSelectModalProps {
  onSelectValue?: (value: ICrypto) => void;
  defaultValue?: ICrypto;
}

const CryptoSelectModal: React.FunctionComponent<ICryptoSelectModalProps> = ({
  onSelectValue,
  defaultValue,
}) => {
  const { data, isLoading } = useGetCryptoData();

  const [open, setOpen] = React.useState<boolean>(false);
  const [valueSelected, setValueSelected] = React.useState<ICrypto | null>(
    null
  );

  React.useEffect(() => {
    const cryptoConfig = CRYPTO_LIST.find(
      (elmx) => elmx.currency === defaultValue?.currency
    );
    setValueSelected(
      defaultValue ? { ...defaultValue, icon: cryptoConfig?.icon } : null
    );
  }, [defaultValue]);

  const onItemClick = (item: ICrypto) => {
    onSelectValue && onSelectValue(item);
    setValueSelected(item);
    setOpen(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger>
        <div>
          <Skeleton loading={isLoading}>
            <Button variant="soft" color="gray">
              {valueSelected?.icon && (
                <span className="w-[24px] h-[24px]">{valueSelected?.icon}</span>
              )}
              <span className="font-bold text-black">
                {valueSelected?.currency}
              </span>
              <ChevronDownIcon width="18" height="18" />
            </Button>
          </Skeleton>
        </div>
      </Dialog.Trigger>
      <Dialog.Content
        height="550px"
        style={{ position: "relative", padding: "16px 12px" }}
      >
        <Dialog.Title className="flex justify-center">
          Select Crypto
        </Dialog.Title>
        <div className="absolute top-6 right-4">
          <Dialog.Close>
            <IconButton variant="ghost" color="gray">
              <Cross1Icon width="18" height="18" />
            </IconButton>
          </Dialog.Close>
        </div>

        <Dialog.Description
          size="2"
          className="flex flex-col gap-4 h-[calc(100%-64px)] w-full"
        >
          <TextField.Root size="3" placeholder="Search crypto by name or ID" />
          <div className="h-full overflow-auto flex flex-col gap-4 md:pr-1">
            {data?.map((elm, idx) => {
              const cryptoConfig = CRYPTO_LIST.find(
                (elmx) => elmx.currency === elm.currency
              );
              return (
                <div
                  key={idx}
                  className={cn(
                    "cursor-pointer flex items-center justify-between rounded-md gap-1 h-[56px] p-4 border !border-gray-100 item"
                  )}
                  onClick={() =>
                    onItemClick({ ...elm, icon: cryptoConfig?.icon })
                  }
                >
                  <div className="flex gap-1 items-center">
                    <span className="w-[24px] h-[24px]">
                      {cryptoConfig?.icon}
                    </span>
                    <span className="text-gray-400 !font-bold">
                      {elm.currency}
                    </span>
                  </div>
                  <span className="text-gray-500 !font-bold">${elm.price}</span>
                </div>
              );
            })}
          </div>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CryptoSelectModal;
