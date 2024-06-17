import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

interface FormValues {
  fromCurrency: string;
  toCurrency: string;
  fromCurrencyValue: number;
  toCurrencyValue: number;
}
interface CurrencyObject {
  currency: string;
  date: Date;
  price: number;
}

const validationSchema = Yup.object({
  fromCurrency: Yup.string().required("Required").typeError("Must be string"),
  fromCurrencyValue: Yup.number().required("Required").typeError("Must be nunber"),
  toCurrency: Yup.string()
    .notOneOf([Yup.ref("fromCurrency"), null], "Currencies must be different")
    .required("Required")
    .typeError("Must be string"),
  toCurrencyValue: Yup.number().required("Required").typeError("Must be number")
});

const CurrencySwapForm: React.FC = () => {
  const [currenciesInformation, setCurrenciesInformation] = useState<any[]>([]);
  const [imageHashMap, setImageHashMap] = useState<any>({});
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fromCurrency: "",
      toCurrency: "",
      fromCurrencyValue: 0,
      toCurrencyValue: 0
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const [response, responseFromGithub] = await Promise.all([
        axios.get("https://interview.switcheo.com/prices.json"),
        axios.get("https://api.github.com/repos/Switcheo/token-icons/git/trees/main?recursive=1")
      ]);

      let objectImage = {};

      responseFromGithub.data?.tree.forEach((file: any) => {
        if (file.path.includes("tokens/")) {
          const fileName: string = file.path.replace("tokens/", "");
          const keyName: string = fileName.replace(".svg", "").toLowerCase();
          objectImage = {
            ...objectImage,
            [keyName]: {
              ...file,
              imageName: fileName
            }
          };
        }
      });
      setCurrenciesInformation(response.data);
      setImageHashMap(objectImage);
    };
    fetchData();
  }, []);

  const onSubmit = (data: FormValues) => {
    const fromPrice = data.fromCurrency;
    const toPrice = data.toCurrency;
    const getFromCurrencyInfo = currenciesInformation.find((item) => item.currency === fromPrice);
    const getToCurrencyInfo = currenciesInformation.find((item) => item.currency === toPrice);

    const ratio = getFromCurrencyInfo.price / getToCurrencyInfo.price;

    const result = data.fromCurrencyValue * ratio;
    console.log(result);
    setValue("toCurrencyValue", result);
  };

  return (
    // div centering the form
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1 max-w-[186px]">
            <Controller
              control={control}
              name="fromCurrency"
              render={({ field: { onChange } }) => {
                return (
                  <Select className="min-w-[100px]" label="Currency" defaultSelectedKeys={[0]} onChange={onChange}>
                    {currenciesInformation.map((item, index) => {
                      return (
                        <SelectItem
                          startContent={
                            <img
                              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${
                                imageHashMap[item.currency.toLowerCase()].imageName
                              }`}
                              alt={item.currency}
                              width="20"
                            />
                          }
                          key={item.currency}
                        >
                          {item.currency}
                        </SelectItem>
                      );
                    })}
                  </Select>
                );
              }}
            />
          </div>
          <div className="col-span-1 max-w-[186px]">
            <Controller
              control={control}
              name="fromCurrencyValue"
              render={({ field: { onChange } }) => {
                return (
                  <Input
                    label="From"
                    type="text"
                    errorMessage={errors.fromCurrencyValue?.message}
                    isInvalid={!!errors.fromCurrencyValue?.message}
                    onChange={onChange}
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="col-span-1 max-w-[186px]">
            <Controller
              control={control}
              name="toCurrency"
              render={({ field: { onChange } }) => {
                return (
                  <Select className="min-w-[100px]" label="Currency" defaultSelectedKeys={[0]} onChange={onChange}>
                    {currenciesInformation.map((item, index) => {
                      return (
                        <SelectItem
                          startContent={
                            <img
                              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${
                                imageHashMap[item.currency.toLowerCase()].imageName
                              }`}
                              alt={item.currency}
                              width="20"
                            />
                          }
                          key={item.currency}
                        >
                          {item.currency}
                        </SelectItem>
                      );
                    })}
                  </Select>
                );
              }}
            />
          </div>
          <div className="col-span-1 max-w-[186px]">
            <Controller
              control={control}
              name="toCurrencyValue"
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    label="To"
                    type="text"
                    disabled
                    onChange={onChange}
                    errorMessage={errors.toCurrencyValue?.message}
                    isInvalid={!!errors.toCurrencyValue?.message}
                    value={value.toString()}
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button type="submit">Exchange</Button>
        </div>
      </form>
    </div>
  );
};

export default CurrencySwapForm;
