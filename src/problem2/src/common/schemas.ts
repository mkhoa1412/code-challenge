import * as yup from "yup";

export const tokenSwapSchema = yup
	.object({
		input: yup
			.number()
			.positive("Amount to send must be greater than 0")
			.required("Amount to send is required"),
		inputCurrency: yup.string().required(),
		outputCurrency: yup.string().required(),
	})
	.required();
