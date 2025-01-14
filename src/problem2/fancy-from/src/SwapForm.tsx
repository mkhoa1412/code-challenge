import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const tokenPricesUrl = 'https://interview.switcheo.com/prices.json';
const tokenIconsBaseUrl = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const SwapForm: React.FC = () => {
    const [tokens, setTokens] = useState<any[]>([]);
    const [prices, setPrices] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            const pricesResponse = await axios.get(tokenPricesUrl); setPrices(pricesResponse.data);
            const tokensResponse = await axios.get('https://api.coingecko.com/api/v3/coins/list');
            setTokens(tokensResponse.data);
        }

        fetchData();
    }, []);

    const tokenOptions = tokens.map(token => ({
        value: token.id,
        label: (
            <div>
                <img src={`${tokenIconsBaseUrl}${token.symbol.toUpperCase()}.svg`} alt={token.symbol} width={20} height={20} />
                {token.name}
            </div>
        )
    }));

    const onSubmit = (values: any) => {
        const fromPrice = prices[values.fromToken];
        const toPrice = prices[values.toToken];
        const exchangedAmount = (values.amount * fromPrice) / toPrice;
        alert(`You will receive ${exchangedAmount} ${values.toToken}`);
    }

    const SwapSchema = Yup.object().shape({
        fromToken: Yup.string().required('Required'),
        toToken: Yup.string().required('Required'),
        amount: Yup.number().positive('Must be positive').required('Required')
    });

    return (
        <Formik
            initialValues={{ fromToken: '', toToken: '', amount: '' }}
            validationSchema={SwapSchema}
            onSubmit={onSubmit}>
            {({ errors,touched }) => (
                <Form>
                    <Field name="fromToken">
                        {({ field }) => <Select {...field} options={tokenOptions} placeholder="Select From Token" />}
                    </Field>
                    {errors.fromToken && touched.fromToken ? <div>{errors.fromToken}</div> : null}

                    <Field name="toToken">
                        {({ field }) => <Select {...field} options={tokenOptions} placeholder="Select To Token" />}
                    </Field>
                    {errors.toToken && touched.toToken ? <div>{errors.toToken}</div> : null}

                    <Field name="amount" type="number" placeholder="Amount" />
                    {errors.amount && touched.amount ? <div>{errors.amount}</div> : null}

                    <button type="submit">Swap</button>
                </Form>
            )}
        </Formik>
    );
}

export default SwapForm;