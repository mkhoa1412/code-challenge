import { FC, ChangeEvent, memo } from "react";
import { Box, Typography, MenuItem, styled } from "@mui/material";
import InputField, {
  Props as InputFieldProps,
} from "~/components/bases/InputField";
import { TokenPrice } from "~/hooks/useGetTokensPrice";

type Props = InputFieldProps & {
  label: string;
  token?: string;
  currencyTokens?: TokenPrice[];
  onChangeToken?: (event: ChangeEvent<HTMLInputElement>) => void;
};
const TokenImage = styled("img")({
  marginRight: "6px",
});

const TokenInput: FC<Props> = ({
  value: currencyValue,
  token,
  error,
  label,
  currencyTokens,
  onChange,
  onChangeToken,
}) => {
  return (
    <>
      <Typography
        sx={{
          color: "#383839",
          alignSelf: "flex-start",
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <InputField
          value={currencyValue}
          fullWidth
          type="number"
          placeholder="Ex: 1.03"
          isDirtyValidation
          helperText="Invalid number range"
          error={error}
          onChange={onChange}
        />
        {currencyTokens?.length !== 0 && (
          <InputField
            id="outlined-select-currency"
            select
            value={token}
            defaultValue={token}
            sx={{
              width: "200px",
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeToken?.(e)}
          >
            {currencyTokens?.map((token) => (
              <MenuItem key={token.currency} value={token.currency}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TokenImage
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                  />
                  <Typography component="span">{token.currency}</Typography>
                </Box>
              </MenuItem>
            ))}
          </InputField>
        )}
      </Box>
    </>
  );
};

export default memo(TokenInput);
