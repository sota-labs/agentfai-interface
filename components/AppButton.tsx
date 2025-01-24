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
  buttonType?:
    | 'contained-brand'
    | 'outlined-brand'
    | 'outlined-grey'
    | 'contained-grey'
    | 'contained-brand-900'
    | 'contained-blue';
}

export const AppButton = ({
  children,
  className = '',
  buttonType = 'contained-brand',
  isLoading,
  disabled,
  ...restProps
}: IProps) => {
  const mapClassName = {
    'contained-brand': 'bg-brand-500 text-black-900',
    'contained-brand-900': 'bg-brand-900 text-brand-500',
    'outlined-brand': 'bg-white-50 text-brand-500 border border-brand-800',
    'contained-grey': 'bg-white-100',
    'outlined-grey': 'bg-white-50 text-white-1000 border border-white-100',
    'contained-blue': 'bg-[#1DA1F2] text-white-1000 border border-white-100 ',
  };
  return (
    <button
      className={clsx(
        'px-4 py-2 text-[14px] flex items-center justify-center font-medium rounded-lg transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
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
