# SelectMultiple

## Overview

The `SelectMultiple` component extends the functionality of the Ant Design Select component by providing support for selecting multiple options while ensuring type safety. It enforces stricter type checks compared to the standard Ant Design Select component.

## Props

| Name                    | Type                                                                                       | Optional | Default            | Description                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------ | -------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| options                 | `Option<ValueType[number], RawData>[]`                                                     | No       | -                  | An array of options for the SelectMultiple component.                                                        |
| value                   | `ValueType[]`                                                                              | Yes      | -                  | The current value(s) of the SelectMultiple component.                                                        |
| onChange                | `(value: ValueType[] \| undefined, option?: Option<ValueType[number], RawData>[]) => void` | Yes      | -                  | Callback function invoked when the value(s) of the SelectMultiple component changes.                         |
| className               | `string`                                                                                   | Yes      | -                  | Custom CSS class for styling the component.                                                                  |
| allowClear              | `boolean`                                                                                  | Yes      | -                  | Whether to show a clear button allowing the user to clear the input.                                         |
| loading                 | `boolean`                                                                                  | Yes      | -                  | Whether the component is in a loading state.                                                                 |
| notFoundContent         | `ReactNode`                                                                                | Yes      | -                  | Content to display when no options match the input.                                                          |
| placeholder             | `string`                                                                                   | Yes      | -                  | Placeholder text to display when the input is empty.                                                         |
| disabled                | `boolean`                                                                                  | Yes      | -                  | Whether the SelectMultiple component is disabled.                                                            |
| autoClearSearchValue    | `boolean`                                                                                  | Yes      | `true`             | Whether to clear the search input when an option is selected.                                                |
| filterOption            | `boolean \| ((inputValue: string, option: Option<ValueType[number], RawData>) => boolean)` | Yes      | `baseFilterOption` | Custom filter function to determine whether an option should be shown in the dropdown.                       |
| direction               | `string`                                                                                   | Yes      | -                  | The direction of the dropdown menu ('ltr' or 'rtl').                                                         |
| optionLabelProp         | `'displayLabel'`                                                                           | Yes      | -                  | Prop specifying the property of the option object to be used as the label. If set, should be 'displayLabel'. |
| onBlur                  | `Function`                                                                                 | Yes      | -                  | Callback function that is triggered when the input loses focus.                                              |
| onFocus                 | `Function`                                                                                 | Yes      | -                  | Callback function that is triggered when the input gains                                                     |
| searchValue             | `string`                                                                                   | Yes      | -                  | The value of the search input.                                                                               |
| open                    | `boolean`                                                                                  | Yes      | -                  | Whether the dropdown menu is open.                                                                           |
| onDropdownVisibleChange | `Function`                                                                                 | Yes      | -                  | Callback function that is triggered when the dropdown visibility changes.                                    |
| onSearch                | `Function`                                                                                 | Yes      | -                  | Callback function that is triggered when the search input value changes.                                     |

## Usage

```jsx
import { SelectMultiple } from "select-multiple-component";

// Example usage
const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const handleChange = (value) => {
  console.log("Selected value(s):", value);
};

<SelectMultiple options={options} value={["option1", "option2"]} onChange={handleChange} placeholder="Select option(s)" />;
```

# SelectSingle

## Overview

The `SelectSingle` component extends the functionality of the Ant Design Select component by providing support for selecting a single option while ensuring type safety. It enforces stricter type checks compared to the standard Ant Design Select component.

## Props

| Name                 | Type                                                                               | Default            | Description                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| options              | `Option<ValueType, RawData>[]`                                                     | -                  | An array of options for the SelectSingle component.                                                          |
| value                | `ValueType`                                                                        | -                  | The current value of the SelectSingle component.                                                             |
| onChange             | `(value: ValueType \| undefined, option?: Option<ValueType, RawData>) => void`     | -                  | Callback function invoked when the value of the SelectSingle component changes.                              |
| className            | `string`                                                                           | -                  | Custom CSS class for styling the component.                                                                  |
| allowClear           | `boolean`                                                                          | -                  | Whether to show a clear button allowing the user to clear the input.                                         |
| loading              | `boolean`                                                                          | -                  | Whether the component is in a loading state.                                                                 |
| notFoundContent      | `ReactNode`                                                                        | -                  | Content to display when no options match the input.                                                          |
| placeholder          | `string`                                                                           | -                  | Placeholder text to display when the input is empty.                                                         |
| disabled             | `boolean`                                                                          | -                  | Whether the SelectSingle component is disabled.                                                              |
| autoClearSearchValue | `boolean`                                                                          | `true`             | Whether to clear the search input when an option is selected.                                                |
| filterOption         | `boolean \| ((inputValue: string, option: Option<ValueType, RawData>) => boolean)` | `baseFilterOption` | Custom filter function to determine whether an option should be shown in the dropdown.                       |
| direction            | `string`                                                                           | -                  | The direction of the dropdown menu ('ltr' or 'rtl').                                                         |
| optionLabelProp      | `'displayLabel'`                                                                   | -                  | Prop specifying the property of the option object to be used as the label. If set, should be 'displayLabel'. |

## Usage

```jsx
import { SelectSingle } from "select-single-component";

// Example usage
const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];
```
