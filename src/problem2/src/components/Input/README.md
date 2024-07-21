# Overview

The `Input` component extends the functionality of the Ant Design Input component by providing additional customization and support for stricter type safety.

# Props

| Prop             | Type                                   | Optional | Default | Description                                                                                        |
| ---------------- | -------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------- |
| addonAfter       | `ReactNode`                            | Yes      | -       | The element to display on the right side of the input field.                                       |
| addonBefore      | `ReactNode`                            | Yes      | -       | The element to display on the left side of the input field.                                        |
| allowClear       | `boolean`                              | Yes      | true    | Whether a clear button is displayed when there is input.                                           |
| className        | `string`                               | Yes      | -       | Custom CSS class for styling the input.                                                            |
| disabled         | `boolean`                              | Yes      | false   | Whether the input is disabled.                                                                     |
| maxLength        | `number`                               | Yes      | -       | The maximum length of the input value.                                                             |
| onBlur           | `Function`                             | Yes      | -       | Callback function triggered when the input is blurred.                                             |
| onFocus          | `Function`                             | Yes      | -       | Callback function triggered when the input is focused.                                             |
| placeholder      | `string`                               | Yes      | -       | The placeholder text for the input.                                                                |
| prefix           | `ReactNode`                            | Yes      | -       | The prefix icon or text for the input.                                                             |
| suffix           | `ReactNode`                            | Yes      | -       | The suffix icon or text for the input.                                                             |
| value            | `string`                               | Yes      | -       | The value of the input.                                                                            |
| onChange         | `(value: string \| undefined) => void` | Yes      | -       | Callback function triggered when the input value changes.                                          |
| onDebounceChange | `(value: string \| undefined) => void` | Yes      | -       | Callback function that is triggered when the input value changes, but only after a debounce delay. |

# Usage

```jsx
import { Input } from "path-to-Input";

// Example usage
<Input className="custom-input" prefix={<Icon type="user" />} suffix={<Icon type="search" />} allowClear disabled={false} maxLength={50} onBlur={() => console.log("Blur")} onFocus={() => console.log("Focus")} value="" onChange={(value) => console.log(value)} />;
```
