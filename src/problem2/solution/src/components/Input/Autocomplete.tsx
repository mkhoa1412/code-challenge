import { TextField } from '@mui/material';
import MUIAutocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { SyntheticEvent } from 'react';
import { useController } from 'react-hook-form';

import { option } from '@/constant/global';

type AutocompleteProps = {
  options: option[] | undefined;
  label: string;
  name: string;
  required?: boolean;
};

export const Autocomplete = ({ name, options, label, ...rest }: AutocompleteProps) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <MUIAutocomplete
      options={options || []}
      onChange={(_event: SyntheticEvent<Element, Event>, item: option | null) =>
        onChange(item?.value || null)
      }
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.label}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          error={!!error}
          helperText={error && error.message}
          {...rest}
        />
      )}
    />
  );
};
