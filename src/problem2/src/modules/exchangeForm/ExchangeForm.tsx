import InputField from "@components/Input/InputField";
import {
  ArrowDownIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  LoopIcon,
} from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Callout,
  Flex,
  Skeleton,
  Spinner,
} from "@radix-ui/themes";
import { cn, formatBalance, isEmpty } from "@utils/helpers";
import { Form, Formik } from "formik";
import { Toast } from "radix-ui";
import * as React from "react";
import useGetCryptoData from "src/api/data/useGetCryptoData";
import * as Yup from "yup";
import CryptoSelectModal from "./components/CryptoSelectModal";
import SwapButton from "./components/SwapButton";
import "./styles/ExchangeForm.css";
import { IExchangeFormValue } from "./types";
import { CRYPTO_LIST, DEFAULT_EXCHANGE_VALUE } from "./utils";

interface IExchangeFormProps {}

const ExchangeForm: React.FunctionComponent<IExchangeFormProps> = (props) => {
  const { data, isLoading } = useGetCryptoData();

  const [initialValues, setInitValues] = React.useState<IExchangeFormValue>(
    DEFAULT_EXCHANGE_VALUE
  );
  const [openConfirmDialog, setOpenConfirmDialog] =
    React.useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState(false);

  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  console.log("isSubmitting", isSubmitting);
  const validateSchema = Yup.object().shape({
    fromValueSelectedPrice: Yup.number()
      .required("Price is required!")
      .positive("Price must be a positive number!"),
    toValueSelectedPrice: Yup.number()
      .required("Price is required!")
      .positive("Price must be a positive number!"),
  });

  const handleSubmit = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirm = (values: IExchangeFormValue) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOpenConfirmDialog(false);
      setOpenToast(true);
      console.log("values", values);
    }, 2000); // Fake API delay (2s)
  };

  React.useEffect(() => {
    if (openToast) {
      setTimeout(() => {
        setOpenToast(false);
      }, 1000);
    }
  }, [openToast]);

  React.useEffect(() => {
    const fromCryptoConfig = CRYPTO_LIST.find(
      (elmx) => elmx.currency === data?.[0]?.currency
    );
    const toCryptoConfig = CRYPTO_LIST.find(
      (elmx) => elmx.currency === data?.[1]?.currency
    );

    setInitValues({
      ...DEFAULT_EXCHANGE_VALUE,
      fromValueSelected: data?.[0]
        ? { ...data?.[0], icon: fromCryptoConfig?.icon }
        : null,
      toValueSelected: data?.[1]
        ? { ...data?.[1], icon: toCryptoConfig?.icon }
        : null,
    });
  }, [data]);

  if (!data && !isLoading) return <></>;
  return (
    <>
      <div className="flex w-full justify-center p-4 mt-[10px] md:mt-[20px]">
        <div className="border-t rounded-2xl border w-full md:max-w-[556px] bg-white border-gray-100 md:shadow-xs p-4 pb-6 md:p-8">
          <div className="flex justify-center items-center rounded-2xl font-extrabold">
            <h1 className="text-2xl">Swap</h1>
          </div>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, resetForm }) => {
              console.log("errors", errors);
              return (
                <>
                  {!values?.toValueSelected?.price ||
                  !values?.fromValueSelected?.price ? (
                    <></>
                  ) : (
                    <Form className="w-full">
                      <div className="flex flex-col gap-4 mt-6">
                        <div className="flex flex-col gap-2 justify-start items-start w-full font-normal rounded-2xl bg-gray-100 px-3 py-4">
                          <div className="flex items-center gap-x-2">
                            <span>From</span>
                            <CryptoSelectModal
                              defaultValue={values?.fromValueSelected}
                              onSelectValue={(value) => {
                                setFieldValue("fromValueSelected", value);
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
                              value={values?.fromValueSelectedPrice}
                              onChange={(e) => {
                                setFieldValue(
                                  "fromValueSelectedPrice",
                                  Number(e.target.value)
                                );
                                if (values?.toValueSelected?.price) {
                                  setFieldValue(
                                    "toValueSelectedPrice",
                                    Number(e.target.value) /
                                      values?.toValueSelected?.price
                                  );
                                }
                              }}
                            />
                            {!!(
                              values?.fromValueSelectedPrice &&
                              values?.fromValueSelected?.price
                            ) && (
                              <span className="text-xs text-gray-500 mt-[-12px] ml-[2px]">
                                {values?.fromValueSelectedPrice *
                                  values?.fromValueSelected?.price}
                                $
                              </span>
                            )}
                          </Skeleton>
                        </div>
                        <div className="flex justify-center items-center">
                          <SwapButton />
                        </div>
                        <div className="flex flex-col gap-2 justify-start items-start w-full font-normal rounded-2xl bg-gray-100 px-3 py-4">
                          <div className="flex items-center gap-x-2">
                            <span>To</span>
                            <CryptoSelectModal
                              defaultValue={values?.toValueSelected}
                              onSelectValue={(value) => {
                                setFieldValue("toValueSelected", value);
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
                              value={values?.toValueSelectedPrice}
                              onChange={(e) => {
                                setFieldValue(
                                  "toValueSelectedPrice",
                                  Number(e.target.value)
                                );
                                if (values?.fromValueSelected?.price) {
                                  setFieldValue(
                                    "toValueSelectedPrice",
                                    values?.fromValueSelected?.price /
                                      Number(e.target.value)
                                  );
                                }
                              }}
                            />
                          </Skeleton>
                        </div>
                      </div>
                      <span className="text-xs flex justify-between mt-4">
                        <span className="font-bold">Order Price</span>
                        {values?.fromValueSelected?.price &&
                          values?.toValueSelected?.price && (
                            <span className="font-bold flex gap-1">
                              <LoopIcon
                                width="14"
                                height="14"
                                className="rotate"
                              />
                              1&nbsp;{values?.fromValueSelected?.currency}
                              &nbsp;=&nbsp;
                              {formatBalance(
                                values?.fromValueSelected?.price /
                                  values?.toValueSelected?.price
                              )}
                              &nbsp;
                              {values?.toValueSelected?.currency}&nbsp;
                            </span>
                          )}
                      </span>
                      {!isEmpty(errors) && (
                        <>
                          <Callout.Root color="red" size="1" className="mt-4">
                            <Callout.Icon>
                              <ExclamationTriangleIcon />
                            </Callout.Icon>
                            <Callout.Text>
                              {errors?.fromValueSelectedPrice ||
                                errors?.toValueSelectedPrice}
                            </Callout.Text>
                          </Callout.Root>
                        </>
                      )}
                      <AlertDialog.Root open={openConfirmDialog}>
                        <AlertDialog.Trigger>
                          <div>
                            <Button
                              color="indigo"
                              variant="solid"
                              type="submit"
                              className="!w-full !mt-6 !min-h-[48px]"
                            >
                              <span className="font-bold">Swap Token</span>
                            </Button>
                          </div>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px">
                          <AlertDialog.Title>Confirm Swap</AlertDialog.Title>
                          <AlertDialog.Description size="2">
                            <div className="w-full flex flex-col gap-3 py-4">
                              <div className="w-full flex justify-between items-center">
                                <span className="flex gap-1 items-center">
                                  {values?.fromValueSelected?.icon}&nbsp;
                                  <span className="font-bold text-base">
                                    {values?.fromValueSelectedPrice}
                                  </span>
                                </span>
                                <span className="font-bold text-base">
                                  {values?.fromValueSelected?.currency}
                                </span>
                              </div>
                              <ArrowDownIcon />
                              <div className="w-full flex justify-between items-center">
                                <span className="flex gap-1 items-center">
                                  {values?.toValueSelected?.icon}&nbsp;
                                  <span className="font-bold text-base">
                                    {formatBalance(
                                      values?.toValueSelectedPrice || 0
                                    )}
                                  </span>
                                </span>
                                <span className="font-bold text-base">
                                  {values?.toValueSelected?.currency}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs italic">
                              Output is estimated. You will receive
                              atleast&nbsp;
                              <strong>
                                {formatBalance(
                                  values?.toValueSelectedPrice || 0
                                )}
                                &nbsp; {values?.toValueSelected?.currency}
                              </strong>
                              &nbsp;after this swap.
                            </span>
                          </AlertDialog.Description>

                          <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                              <Button variant="soft" color="gray">
                                Cancel
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <Button
                                disabled={isSubmitting}
                                color="indigo"
                                variant="solid"
                                type="button"
                                onClick={() => handleConfirm(values)}
                              >
                                <Spinner loading={isSubmitting}></Spinner>
                                Confirm Swap
                              </Button>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </Form>
                  )}
                </>
              );
            }}
          </Formik>
        </div>
      </div>
      <Toast.Provider swipeDirection="right" duration={1000}>
        <Toast.Root className="ToastRoot" open={openToast}>
          <Toast.Description asChild>
            <Callout.Root color="green" className="!bg-white shadow-md">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>You transaction is successful.</Callout.Text>
            </Callout.Root>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </>
  );
};

export default ExchangeForm;
