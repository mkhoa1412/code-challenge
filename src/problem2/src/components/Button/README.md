# Overview

The `Button` component extends the functionality of the Ant Design Button component by providing additional customization and support for stricter type safety. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Button component.

# Props

| Prop         | Type         | Optional | Default   | Description                                                    |
| ------------ | ------------ | -------- | --------- | -------------------------------------------------------------- |
| block        | `boolean`    | Yes      | -         | Option to fit button width to its parent width.                |
| children     | `ReactNode`  | Yes      | -         | Content to be rendered inside the button.                      |
| className    | `string`     | Yes      | -         | Custom CSS class for styling the button.                       |
| disabled     | `boolean`    | Yes      | -         | Disabled state of button.                                      |
| ghost        | `boolean`    | Yes      | -         | Make background transparent and invert text and border colors. |
| href         | `string`     | Yes      | -         | Redirect URL of link button.                                   |
| htmlType     | `string`     | Yes      | 'button'  | Set the original HTML `type` of button.                        |
| icon         | `ReactNode`  | Yes      | -         | Set the icon component of button.                              |
| iconPosition | `string`     | Yes      | -         | Set the position of the icon in the button.                    |
| loading      | `boolean`    | Yes      | false     | Set the loading state of button.                               |
| onClick      | `() => void` | Yes      | -         | Set the handler to handle click event.                         |
| shape        | `string`     | Yes      | -         | Can be set to `circle`, `round`, or omitted.                   |
| target       | `string`     | Yes      | '\_blank' | Set the target of link button.                                 |
| form         | `string`     | Yes      | -         | Associate the button with a form.                              |
| type         | `string`     | Yes      | -         | Can be set to `button`, `text`, `link`.                        |
| color        | `Color`      | Yes      | -         | Custom color for the button.                                   |

# Usage

```jsx
import { Button } from "path-to-Button";

// Example usage
<Button block danger disabled ghost href="https://example.com" htmlType="submit" icon={<IconComponent />} iconPosition="left" loading={true} onClick={handleClick} shape="round" target="_self" type="primary">
  Click Me
</Button>;
```
