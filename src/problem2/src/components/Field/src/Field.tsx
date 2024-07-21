import classNames from 'classnames';
import { createElement } from 'react';
import type { ReactNode, HtmlHTMLAttributes, FC } from 'react';
import './styles.css';

export interface Props {
  /** The label for the input field */
  label: ReactNode;
  /** The children components */
  children: ReactNode;
  /** Error message to display if input validation fails */
  error?: ReactNode;
  /** Help message to provide additional information */
  help?: ReactNode;
  /** If true, indicates that the field is required */
  withRequiredMark?: boolean;
  /** HTML tag name for the field wrapper */
  tagName?: keyof HTMLElementTagNameMap;
  /** Additional CSS class for styling */
  className?: string;
  /** CSS class for the field wrapper */
  fieldWrapperClassName?: string;
  /** CSS class for the label wrapper */
  labelWrapperClassName?: string;
}

/**
 * FieldError component to display error messages for form fields.
 * @param {object} props - Props for the FieldError component.
 * @param {ReactNode} props.error - Error message to be displayed.
 * @param {string} [props.className] - Additional CSS class names for styling.
 * @param {object} [props...rest] - Additional HTML attributes to be spread onto the div element.
 * @returns {JSX.Element} - The rendered FieldError component.
 */
const FieldError: FC<Pick<Props, 'error'> & Omit<HtmlHTMLAttributes<HTMLDivElement>, 'children'>> = ({
  error,
  className,
  ...props
}) => {
  return (
    <div {...props} className={classNames('Field__error', className)}>
      {error}
    </div>
  );
};

/**
 * FieldHelp component to display help messages for form fields.
 * @param {object} props - Props for the FieldHelp component.
 * @param {ReactNode} props.help - Help message to be displayed.
 * @param {string} [props.className] - Additional CSS class names for styling.
 * @param {object} [props...rest] - Additional HTML attributes to be spread onto the div element.
 * @returns {JSX.Element} - The rendered FieldHelp component.
 */
const FieldHelp: FC<Pick<Props, 'help'> & Omit<HtmlHTMLAttributes<HTMLDivElement>, 'children'>> = ({
  help,
  className,
  ...props
}) => {
  return (
    <div {...props} className={classNames('Field__help', className)}>
      {help}
    </div>
  );
};

/**
 * Field component to render form field with label, children, and optional error message.
 * @param {object} props - Props for the Field component.
 * @param {ReactNode} props.label - The label for the input field.
 * @param {ReactNode} props.children - The child components to be rendered within the field.
 * @param {ReactNode} [props.error] - Error message to be displayed if input validation fails.
 * @param {ReactNode} [props.help] - Help message to provide additional information.
 * @param {boolean} [props.withRequiredMark] - If true, indicates that the field is required.
 * @param {keyof HTMLElementTagNameMap} [props.tagName=label] - HTML tag name for the field wrapper.
 * @param {string} [props.className] - Additional CSS class names for styling the field container.
 * @param {string} [props.fieldWrapperClassName] - CSS class for the field wrapper.
 * @param {string} [props.labelWrapperClassName] - CSS class for the label wrapper.
 * @returns {JSX.Element} - The rendered Field component.
 */
const FieldComponent: FC<Props> = ({
  label,
  children,
  error,
  help,
  withRequiredMark,
  tagName = 'label',
  className,
  fieldWrapperClassName,
  labelWrapperClassName,
}) => {
  const renderRequiredMark: FC = () => {
    if (withRequiredMark) {
      return <span className="Field__required-mark">*</span>;
    }
    return null;
  };

  return createElement(
    tagName,
    {
      className: classNames('Field__container', className),
    },
    <>
      <div className={classNames(labelWrapperClassName)}>
        {renderRequiredMark({})}
        <span className={classNames('Field__label', 'text-neutral-500')}>{label}</span>
      </div>
      <div className={classNames(fieldWrapperClassName)}>{children}</div>
      {!!help && <FieldHelp help={help} />}
      {!!error && <FieldError error={error} />}
    </>,
  );
};

// @ts-ignore
export const Field: FC<Props> & { FieldHelp: typeof FieldHelp; FieldError: typeof FieldError } = FieldComponent;
Field.FieldHelp = FieldHelp;
Field.FieldError = FieldError;
