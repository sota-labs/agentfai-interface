import clsx from 'clsx';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface IProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  rootClassName?: string;
  className?: string;
  icon?: ReactNode;
}

const AppInput = forwardRef((props: IProps, ref: React.Ref<HTMLInputElement>) => {
  const { rootClassName, className, icon, ...restProps } = props;
  return (
    <div
      className={clsx(
        'flex items-center gap-1 p-2 rounded-[6px] border border-white-100 bg-black-900',
        rootClassName,
      )}
    >
      {!!icon && icon}
      <input
        ref={ref}
        className={clsx(
          'w-full bg-transparent outline-none text-sm',
          className,
        )}
        {...restProps}
      />
    </div>
  );
});

AppInput.displayName = "AppInput";

export default AppInput;
