# Overview

The `InputNumber` component extends the functionality of the Ant Design InputNumber component by providing additional customization and support for stricter type safety.

# Props

| Prop        | Type                                              | Optional | Default | Description                                                         |
| ----------- | ------------------------------------------------- | -------- | ------- | ------------------------------------------------------------------- |
| addonAfter  | `ReactNode`                                       | Yes      | -       | The element to display on the right side of the input number field. |
| addonBefore | `ReactNode`                                       | Yes      | -       | The element to display on the left side of the input number field.  |
| className   | `string`                                          | Yes      | -       | Custom CSS class for styling the input number.                      |
| controls    | `boolean`                                         | Yes      | true    | Whether to show the controls.                                       |
| disabled    | `boolean`                                         | Yes      | -       | Whether the input number is disabled.                               |
| formatter   | `(value?: number) => string`                      | Yes      | -       | Specifies the format of the value presented.                        |
| max         | `number`                                          | Yes      | -       | The maximum value of the input number.                              |
| min         | `number`                                          | Yes      | 0       | The minimum value of the input number.                              |
| onBlur      | `(e: React.FocusEvent<HTMLInputElement>) => void` | Yes      | -       | Callback function triggered when the input number is blurred.       |
| onFocus     | `(e: React.FocusEvent<HTMLInputElement>) => void` | Yes      | -       | Callback function triggered when the input number is focused.       |
| parser      | `(value?: string) => number`                      | Yes      | -       | Specifies the value extracted from the formatted value.             |
| placeholder | `string`                                          | Yes      | -       | The placeholder text for the input number.                          |
| prefix      | `ReactNode`                                       | Yes      | -       | The prefix icon or text for the input number.                       |
| step        | `number`                                          | Yes      | -       | The step size for the input number.                                 |
| suffix      | `ReactNode`                                       | Yes      | -       | The suffix icon or text for the input number.                       |
| value       | `number`                                          | Yes      | -       | The value of the input number.                                      |
| onChange    | `(value?: number) => void`                        | Yes      | -       | Callback function triggered when the input number value changes.    |

# Usage

```jsx
import { InputNumber } from "path-to-InputNumber";

// Example usage
<InputNumber className="custom-input-number" prefix={<Icon type="dollar" />} suffix={<Icon type="percent" />} controls disabled={false} max={100} min={0} step={1} onBlur={() => console.log("Blur")} onFocus={() => console.log("Focus")} value={50} onChange={(value) => console.log(value)} />;
```
