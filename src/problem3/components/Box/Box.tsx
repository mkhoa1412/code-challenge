import React, { type HTMLAttributes, type FC } from "react";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

const Box: FC<BoxProps> = (props) => <div {...props} />;

export default Box;
