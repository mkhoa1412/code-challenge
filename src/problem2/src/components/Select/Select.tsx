import type { FC, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select: FC<SelectProps> = (props) => {
	const { className = "", ...rest } = props;

	return <select className={`select select-bordered ${className}`} {...rest} />;
};

export default Select;
