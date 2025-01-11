import type { Currency } from '../../types/SwapToken';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
const defaultImage = `/icons/loading-icon.svg`

type Props = {
    defaultValue: string;
    value: Currency;
    options: Currency[];
    handleChange: (newValue: Currency | null) => void;
};

export default function SelectToken({
    defaultValue,
    value,
    options,
    handleChange,
}: Props) {
    return (
        <Autocomplete
            value={value}
            onChange={(_event, newValue) => {
                handleChange(newValue);
            }}
            data-testid={`select-token-control-` + { value }}
            options={options}
            autoHighlight
            getOptionLabel={(option: Currency) => option.currency || defaultValue}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box
                        key={key}
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                    >
                        <img
                            loading="lazy"
                            src={`/tokens/${option.currency}.svg`}
                            alt={option.currency}
                            className="w-6 h-6 mr-2"
                        />
                        {option.currency}
                    </Box>
                );
            }}
            renderInput={(params) => (
                <>
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: params.inputProps.value ? (
                                <img
                                    loading="lazy"
                                    src={`/tokens/${params.inputProps.value}.svg`}
                                    onError={(e) => {
                                        e.currentTarget.src = defaultImage; // Set to default image on error
                                    }}
                                    className="w-6 h-6 mr-2"
                                />
                            ) : null,
                        }}
                    />
                </>
            )}
            size="small"
        />
    );
}
