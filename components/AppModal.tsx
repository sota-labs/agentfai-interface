import { CloseIcon } from '@/assets/icons';
import clsx from 'clsx';
import { ReactNode } from 'react';
import ReactModal from 'react-modal';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose?: VoidFunction;
  title?: string | ReactNode;
  zIndex?: number;
  className?: string;
  titleClassName?: string;
  closable?: boolean;
  onAfterOpen?: () => void;
  contentStyles?: any;
}

const AppModal = ({
  isOpen,
  children,
  onClose,
  title,
  className,
  titleClassName,
  closable = true,
  zIndex,
  contentStyles,
  onAfterOpen,
}: Props) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '16px',
      padding: 0,
      background: '#141518',
      overflow: 'inherit',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '4px 4px 8px 0px rgba(8, 9, 12, 0.50)',
      ...contentStyles,
    },
    overlay: {
      background: 'rgba(8, 9, 12, 0.70)',
      backdropFilter: 'blur(7.5px)',
      zIndex: zIndex ?? 999,
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterOpen={onAfterOpen}
      style={customStyles}
      ariaHideApp={false}
      bodyOpenClassName="overflow-hidden"
    >
      <div
        className={`p-[16px] relative min-w-full md:min-w-[420px] max-md:min-w-[375px] ${className}`}
      >
        {(title || closable) && (
          <div
            className={clsx(
              'flex items-center mb-6',
              title ? 'justify-between' : 'justify-end',
            )}
          >
            {title && (
              <div className={clsx('text-lg font-semibold', titleClassName)}>
                {title}
              </div>
            )}
            {closable && (
              <CloseIcon
                onClick={onClose}
                className="text-white-500 hover:text-white-600 cursor-pointer"
              />
            )}
          </div>
        )}

        <div className={'w-full'}>{children}</div>
      </div>
    </ReactModal>
  );
};

export default AppModal;
