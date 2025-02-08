import * as React from "react";
import Popover from "@mui/material/Popover";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Styles from "./currencyPopover.module.scss";
import { ICurrency } from "../../state/stateTypes/ICurrency";

interface Props {
  currencies: ICurrency[];
  currencyDefault: ICurrency | null;
  callback: (currency: ICurrency) => void;
}

export default function CurrencyPopover({
  currencies,
  currencyDefault,
  callback,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [currencySelected, setCurrencySelected] =
    React.useState<ICurrency | null>(null);
  const [currencyFilter, setCurrencyFilter] = React.useState<ICurrency[]>([]);
  const [searchValue, setSearchValue] = React.useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strData = e.target.value;
    setSearchValue(strData);
  };

  const searchCurrency = () => {
    if (searchValue.length > 0) {
      const newArray = currencies.filter((item: ICurrency) => {
        return item.currency
          .toLowerCase()
          .startsWith(searchValue.toLowerCase());
      });
      setCurrencyFilter(newArray);
    } else {
      setCurrencyFilter(currencies);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrencyFilter(currencies);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "currency-popover" : undefined;

  const handleListItemClick = (currency: ICurrency) => {
    setCurrencySelected(currency);
    handleClose();
    callback(currency);
  };

  const url = currencySelected?.urlToken || currencyDefault?.urlToken;
  return (
    <div className={Styles.wrapper}>
      <IconButton
        className={Styles.btnCurrency}
        aria-describedby={id}
        onClick={handleClick}
      >
        <img src={url} alt="token" />
        &nbsp;
        {currencySelected?.currency || currencyDefault?.currency}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className={Styles.wrapperList}>
          <TextField
            name="search"
            placeholder="Search..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            value={searchValue}
            onKeyUp={searchCurrency}
            onChange={onChangeSearch}
          />
          <List className={Styles.listCurrency}>
            {currencyFilter?.length > 0 ? (
              currencyFilter.map((item: ICurrency) => (
                <ListItem disablePadding key={`${item.currency}-${item.id}`}>
                  <ListItemButton onClick={() => handleListItemClick(item)}>
                    <img src={item.urlToken} alt="token" />
                    &nbsp;&nbsp;
                    <ListItemText primary={item.currency} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <div>No data</div>
            )}
          </List>
        </div>
      </Popover>
    </div>
  );
}
