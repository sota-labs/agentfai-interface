import { LoadingIcon } from '@/assets/icons';
import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  buttonType?: 'primary' | 'outline';
}

export const AppButton = ({
  children,
  className = '',
  buttonType = 'outline',
  isLoading,
  disabled,
  ...restProps
}: IProps) => {
  const mapClassName = {
    primary: 'bg-[#a0faa0] text-gray-950',
    outline:
      'border border-solid border-[#a0faa0]/75 text-[#fff] hover:bg-[#a0faa0]/25 transition-colors duration-300',
  };
  return (
    <button
      className={clsx(
        'py-1 px-2 text-[16px] leading-[24px] rounded-md w-full cursor-pointer',
        mapClassName[buttonType],
        className,
      )}
      disabled={disabled || isLoading}
      {...restProps}
    >
      <div className="flex items-center gap-2 justify-center">
        {children}
        {isLoading && (
          <LoadingIcon className="animate-spin h-5 w-5 mr-2 text-white" />
        )}
      </div>
    </button>
  );
};
