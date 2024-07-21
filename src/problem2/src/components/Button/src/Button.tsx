import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { colors } from './constants/colors';
import { Color } from './types/Color';
import './styles.css';
import { useInitializeContext } from '~/components/InitializeContext';

export interface Props
  extends Pick<
    AntButtonProps,
    | 'block'
    | 'children'
    | 'className'
    | 'disabled'
    | 'ghost'
    | 'href'
    | 'htmlType'
    | 'icon'
    | 'iconPosition'
    | 'loading'
    | 'onClick'
    | 'shape'
    | 'target'
    | 'form'
  > {
  /** Can be set to `button`, `text`, `link`. */
  type?: 'button' | 'text' | 'link';
  /** Custom color for the button. */
  color?: Color;
}

/**
 * Button component that extends the functionality of the Ant Design Button component
 * by providing additional customization and support for stricter type safety.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Button component.
 *
 * @param {Props} props - The properties for the Button component.
 * @param {boolean} [props.block] - Option to fit button width to its parent width.
 * @param {ReactNode} [props.children] - Content to be rendered inside the button.
 * @param {string} [props.className] - Custom CSS class for styling the button.
 * @param {boolean} [props.disabled] - Disabled state of button.
 * @param {boolean} [props.ghost] - Make background transparent and invert text and border colors.
 * @param {string} [props.href] - Redirect URL of link button.
 * @param {string} [props.htmlType='button'] - Set the original HTML `type` of button.
 * @param {ReactNode} [props.icon] - Set the icon component of button.
 * @param {string} [props.iconPosition] - Set the position of the icon in the button.
 * @param {boolean} [props.loading=false] - Set the loading state of button.
 * @param {() => void} [props.onClick] - Set the handler to handle click event.
 * @param {string} [props.shape] - Can be set to `circle`, `round`, or omitted.
 * @param {string} [props.target='_blank'] - Set the target of link button.
 * @param {string} [props.form] - Associate the button with a form.
 * @param {string} [props.type] - Can be set to `button`, `text`, `link`.
 * @param {Color} [props.color] - Custom color for the button.
 * @returns {ReactNode} The rendered Button component.
 */
export const Button: FC<Props> = ({
  block,
  children,
  className,
  disabled,
  ghost,
  href,
  htmlType = 'button',
  icon,
  iconPosition,
  loading = false,
  onClick,
  shape,
  target = '_blank',
  type = 'button',
  color = 'default',
  form,
}) => {
  useInitializeContext();
  return (
    <AntButton
      form={form}
      block={block}
      children={children}
      className={classNames('Button__container', colors[color], className)}
      disabled={disabled}
      ghost={ghost}
      href={href}
      htmlType={htmlType}
      icon={icon}
      iconPosition={iconPosition}
      loading={loading}
      onClick={onClick}
      shape={shape}
      target={target}
      type={type === 'button' ? 'default' : type}
    />
  );
};
