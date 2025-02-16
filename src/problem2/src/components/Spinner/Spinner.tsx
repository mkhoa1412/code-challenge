import type { FC } from "react";

import type { ComponentSize } from "../../common/types";

interface SpinnerProps {
	size?: ComponentSize;
}

const Spinner: FC<SpinnerProps> = (props) => {
	const { size = "md" } = props;

	return <span className={`loading loading-spinner loading-${size}`} />;
};

export default Spinner;
