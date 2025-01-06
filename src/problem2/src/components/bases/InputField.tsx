import {
  TextField,
  OutlinedTextFieldProps,
  styled,
  Typography,
} from "@mui/material";
import { memo, useCallback, useMemo, useState } from "react";

type TextFieldCustomProps = {
  ariaLabel?: string;
  maxLength?: number;
  minLength?: number;
  isDirtyValidation?: boolean;
  readOnly?: boolean;
  startAdornment?: NonNullable<
    OutlinedTextFieldProps["InputProps"]
  >["startAdornment"];
};

type TextFieldInheritedProps = Pick<
  OutlinedTextFieldProps,
  | "id"
  | "value"
  | "select"
  | "size"
  | "error"
  | "disabled"
  | "fullWidth"
  | "placeholder"
  | "helperText"
  | "onBlur"
  | "onChange"
  | "onClick"
  | "onKeyDown"
  | "className"
  | "children"
  | "defaultValue"
  | "slotProps"
>;

export type Props = TextFieldInheritedProps &
  TextFieldCustomProps & {
    color?: Extract<
      OutlinedTextFieldProps["color"],
      "error" | "success" | "warning"
    >;
    type?: Extract<
      OutlinedTextFieldProps["type"],
      "text" | "number" | "email" | "password"
    >;
  };

const InputField = styled(
  ({
    isDirtyValidation,
    startAdornment,
    maxLength,
    minLength,
    ariaLabel,
    readOnly,
    size = "medium",
    ...props
  }: Props) => {
    const [isDirty, setIsDirty] = useState(false);

    const handleOnBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setIsDirty(true);
        props.onBlur?.(event);
      },
      [props]
    );

    const componentProps = useMemo(() => {
      const customProps: OutlinedTextFieldProps = {
        size,
        variant: "outlined",
        inputProps: {
          maxLength,
          minLength,
          "aria-label": ariaLabel,
        },
        InputProps: {
          readOnly,
          startAdornment: startAdornment ? (
            <div className="textField-startAdornment">{startAdornment}</div>
          ) : undefined,
        },
      };

      const tempProps: Props = { ...props };
      if (isDirtyValidation) {
        tempProps.onBlur = handleOnBlur;
        tempProps.error = isDirty && props.error;
        tempProps.helperText = isDirty && props.error && props.helperText;
      }

      return { ...customProps, ...tempProps };
    }, [
      maxLength,
      minLength,
      ariaLabel,
      readOnly,
      startAdornment,
      props,
      isDirtyValidation,
      size,
      handleOnBlur,
      isDirty,
    ]);

    const helperTextFormatted = useMemo(() => {
      if (!componentProps.helperText) return;

      switch (componentProps.color) {
        case "error":
          return (
            <Typography
              sx={{
                color: "#E01728",
              }}
            >
              {componentProps.helperText}
            </Typography>
          );
        case "success":
          return (
            <Typography
              sx={{
                color: "#00800A",
              }}
            >
              {componentProps.helperText}
            </Typography>
          );
        case "warning":
          return (
            <Typography
              sx={{
                color: "#E06E00",
              }}
            >
              {componentProps.helperText}
            </Typography>
          );
        default:
          return componentProps.helperText;
      }
    }, [componentProps.color, componentProps.helperText]);

    return (
      <TextField
        {...componentProps}
        helperText={helperTextFormatted ? <>{helperTextFormatted}</> : null}
      />
    );
  }
)();

export default memo(InputField);
