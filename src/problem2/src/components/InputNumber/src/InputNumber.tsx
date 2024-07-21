import { InputNumber as AntInputNumber, InputNumberProps as AntInputNumberProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, useRef, useState } from 'react';
import './styles.css';
import { useInitializeContext } from '~/components/InitializeContext';
import { useIsMounted } from '~/shared/useIsMounted';
import { useDeepCompareEffect } from '~/shared/useDeepCompareEffect';

export interface Props
  extends Pick<
    AntInputNumberProps<number>,
    | 'addonAfter'
    | 'addonBefore'
    | 'className'
    | 'disabled'
    | 'formatter'
    | 'max'
    | 'min'
    | 'onBlur'
    | 'onFocus'
    | 'parser'
    | 'placeholder'
    | 'prefix'
    | 'step'
    | 'suffix'
  > {
  /** Whether to show the controls. */
  controls?: boolean;
  /** The value of the input number. */
  value?: number;
  /** Callback function triggered when the input number value changes. */
  onChange?: (value?: number) => void;
}

/**
 * InputNumber component that extends the functionality of the Ant Design InputNumber component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the InputNumber component.
 * @param {ReactNode} [props.addonAfter] - The element to display on the right side of the input number field.
 * @param {ReactNode} [props.addonBefore] - The element to display on the left side of the input number field.
 * @param {boolean} [props.controls=true] - Whether to show the controls.
 * @param {string} [props.className] - Custom CSS class for styling the input number.
 * @param {boolean} [props.disabled] - Whether the input number is disabled.
 * @param {Function} [props.formatter] - Specifies the format of the value presented.
 * @param {number} [props.max] - The maximum value of the input number.
 * @param {number} [props.min=0] - The minimum value of the input number.
 * @param {Function} [props.onBlur] - Callback function triggered when the input number is blurred.
 * @param {Function} [props.onFocus] - Callback function triggered when the input number is focused.
 * @param {Function} [props.parser] - Specifies the value extracted from the formatted value.
 * @param {string} [props.placeholder] - The placeholder text for the input number.
 * @param {ReactNode} [props.prefix] - The prefix icon or text for the input number.
 * @param {number} [props.step] - The step size for the input number.
 * @param {ReactNode} [props.suffix] - The suffix icon or text for the input number.
 * @param {number} [props.value] - The value of the input number.
 * @param {Function} [props.onChange] - Callback function triggered when the input number value changes.
 * @returns {ReactNode} The rendered InputNumber component.
 */
export const InputNumber: FC<Props> = ({
  addonAfter,
  addonBefore,
  className,
  controls = true,
  disabled,
  formatter,
  max,
  min = 0,
  onBlur,
  onChange,
  onFocus,
  parser,
  placeholder,
  prefix,
  step,
  suffix,
  value,
}) => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange: AntInputNumberProps<number>['onChange'] = value => {
    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined ? undefined : Number(value);
    setValueState(value_);
    onChange?.(value_);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <AntInputNumber<number>
      keyboard
      ref={inputRef}
      onKeyDown={event => {
        // User type Ctrl + A or Meta + A ==> Accept
        if (event.metaKey || event.ctrlKey) {
          return;
        }
        // Only type number
        if (event.key.length === 1 && !/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
      value={isMounted ? valueState : undefined}
      onChange={handleChange}
      step={step}
      controls={controls}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      className={classNames('InputNumber__container', className)}
      disabled={disabled}
      max={max}
      min={min}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      formatter={formatter}
      parser={parser}
    />
  );
};
