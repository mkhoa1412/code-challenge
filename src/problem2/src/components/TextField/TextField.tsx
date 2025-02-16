import type { FC, InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextField: FC<TextFieldProps> = (props) => {
	const { className = "", ...rest } = props;

	return (
		<input
			className={`input input-bordered w-full max-w-xs ${className}`}
			{...rest}
		/>
	);
};

export default TextField;
