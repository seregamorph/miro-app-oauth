import { FC, ReactNode } from "react";
interface Props {
  children: string | ReactNode;
  onClick: VoidFunction;
  type: "primary" | "secondary" | "tertiary";
  size: "medium" | "small";
  loading?: boolean;
  label?: string;
  disabled?: boolean;
}
export const Button: FC<Props> = ({
  onClick,
  loading,
  type,
  size,
  children,
  label,
  disabled,
}) => {
  const onButtonClick = () => {
    if (loading || disabled) {
      return;
    }
    onClick();
  };
  return (
    <button
      className={`button button-${type} p-${size}`}
      type="button"
      onClick={onButtonClick}
      aria-label={label}
      disabled={disabled || loading}
    >
      {children}
    </button>
  );
};
