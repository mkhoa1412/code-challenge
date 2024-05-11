import { TextField as MUITextField } from '@mui/material';
import { CSSProperties } from '@mui/styles';
import { useController } from 'react-hook-form';

type TextFieldProps = {
  label: string;
  name: string;
  fullWidth: boolean;
  sx?: CSSProperties;
};

export const TextField = ({ name, label, ...rest }: TextFieldProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <MUITextField
      onChange={onChange}
      label={label}
      value={value}
      variant="standard"
      error={!!error}
      helperText={error ? error.message : ''}
      {...rest}
    />
  );
};
