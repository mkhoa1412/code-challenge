import type { FC } from "react";

import ButtonBase, { type ButtonBaseProps } from "../ButtonBase";

interface ButtonPrimaryProps extends ButtonBaseProps {}

const ButtonPrimary: FC<ButtonPrimaryProps> = (props) => {
	const { className, ...rest } = props;

	return <ButtonBase className={`btn-primary ${className}`} {...rest} />;
};

export default ButtonPrimary;
