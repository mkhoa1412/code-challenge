import type { ButtonHTMLAttributes, FC } from "react";
import Spinner from "../../Spinner/Spinner";

export interface ButtonBaseProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
}

const ButtonBase: FC<ButtonBaseProps> = (props) => {
	const { children, className, disabled, loading, ...rest } = props;

	return (
		<button
			className={`btn ${className}`}
			disabled={disabled || loading}
			{...rest}
		>
			{loading && <Spinner size="xs" />} {children}
		</button>
	);
};

export default ButtonBase;
