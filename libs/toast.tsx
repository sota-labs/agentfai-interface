import { CheckBrokenIcon, MessageCriticalIcon } from '@/assets/icons';
import { toast } from 'react-toastify';

interface IMessageProps {
  message: string;
  hash?: string;
}

interface IMessagePropsWithTitle {
  message?: string;
  title?: string;
}

export const successMsg = (message: string, hash?: string) => {
  if (message)
    toast(<SuccessMessage message={message} hash={hash} />, {
      type: 'success',
      style: { backgroundColor: '#212224' },
    });
};

export const errorMsg = (message: string) => {
  toast(<ErrorMessage message={message} />, {
    type: 'error',
    style: { backgroundColor: '#212224' },
  });
};

export const MsgWithTitle = (
  title?: string,
  message?: string,
  time?: number,
) => {
  toast(<MessageWithTitle title={title} message={message} />, {
    type: 'error',
    style: { backgroundColor: '#212224' },
    autoClose: time || 3000,
  });
};

export const ErrorMessage = (props: IMessageProps) => {
  const { message } = props;
  return (
    <div className="px-4 flex items-center gap-3" style={{ color: '#fff' }}>
      <div className="mr-1">
        <MessageCriticalIcon />
      </div>{' '}
      <div className="text-[14px]">{message ?? 'Error'}</div>
    </div>
  );
};

export const MessageWithTitle = (props: IMessagePropsWithTitle) => {
  const { message, title } = props;
  return (
    <div className="flex flex-col gap-1" style={{ color: '#fff' }}>
      <div className="">{title}</div>
      <div className="text-[14px] text-white-700 font-normal">
        {message ?? 'Error'}
      </div>
    </div>
  );
};

export const SuccessMessage = (props: IMessageProps) => {
  const { message, hash } = props;
  return (
    <div className="px-4 flex flex-col gap-2" style={{ color: '#fff' }}>
      <div className="flex items-center gap-3">
        <CheckBrokenIcon />
        <div className="text-[14px]">{message ?? 'Successfully'}</div>
      </div>
    </div>
  );
};
