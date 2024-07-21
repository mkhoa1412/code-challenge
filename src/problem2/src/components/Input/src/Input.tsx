import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useInitializeContext } from '~/components/InitializeContext';
import { useDebouncedValue } from '~/shared/useDebouncedValue';
import { useDeepCompareEffect } from '~/shared/useDeepCompareEffect';
import { useIsMounted } from '~/shared/useIsMounted';


export interface Props
  extends Pick<
    AntInputProps,
    | 'addonAfter'
    | 'addonBefore'
    | 'allowClear'
    | 'className'
    | 'disabled'
    | 'maxLength'
    | 'onBlur'
    | 'onFocus'
    | 'placeholder'
    | 'prefix'
    | 'suffix'
  > {
  /** The value of the input. */
  value?: string;
  /** Callback function triggered when the input value changes. */
  onChange?: (value: string | undefined) => void;
  /** Callback function that is triggered when the input value changes, but only after a debounce delay. */
  onDebounceChange?: (value: string | undefined) => void;
}

/**
 * Input component that extends the functionality of the Ant Design Input component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the Input component.
 * @param {ReactNode} [props.addonAfter] - The element to display on the right side of the input field.
 * @param {ReactNode} [props.addonBefore] - The element to display on the left side of the input field.
 * @param {boolean} [props.allowClear=true] - Whether a clear button is displayed when there is input.
 * @param {string} [props.className] - Custom CSS class for styling the input.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @param {number} [props.maxLength] - The maximum length of the input value.
 * @param {Function} [props.onBlur] - Callback function triggered when the input is blurred.
 * @param {Function} [props.onFocus] - Callback function triggered when the input is focused.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {ReactNode} [props.prefix] - The prefix icon or text for the input.
 * @param {ReactNode} [props.suffix] - The suffix icon or text for the input.
 * @param {string} [props.value] - The value of the input.
 * @param {Function} [props.onChange] - Callback function triggered when the input value changes.
 * @param {Function} [props.onDebounceChange] - Callback function that is triggered when the input value changes, but only after a debounce delay.
 * @returns {ReactNode} The rendered Input component.
 */
export const Input: FC<Props> = ({
  addonAfter,
  addonBefore,
  allowClear = true,
  className,
  disabled = false,
  maxLength,
  onBlur,
  onChange,
  onDebounceChange,
  onFocus,
  placeholder,
  prefix,
  suffix,
  value,
}) => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);
  const { value: valueStateDebounced, clearTimeout } = useDebouncedValue(valueState, { timeoutMs: 300 });

  const handleChange: AntInputProps['onChange'] = event => {
    const isUndefined = isEmpty(event.target.value) || null;
    const value = isUndefined ? undefined : event.target.value;
    setValueState(value);
    onChange?.(value);
  };

  const handleBlur: AntInputProps['onBlur'] = event => {
    const isUndefined = isEmpty(event.target.value) || null;
    const value = isUndefined ? undefined : event.target.value;
    clearTimeout();
    onBlur?.(event);
    setValueState(value);
    onDebounceChange?.(value);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  useEffect(() => {
    if (isMounted) {
      onDebounceChange?.(valueStateDebounced);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueStateDebounced]);

  return (
    <AntInput
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      className={classNames('Input__container', className)}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={onFocus}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      value={isMounted ? valueState : undefined}
    />
  );
};
