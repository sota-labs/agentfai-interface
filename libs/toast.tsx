import { toast } from 'react-toastify';

interface IMessageProps {
  message: string;
  hash?: string;
}

interface IMessagePropsWithTitle {
  message?: string;
  title?: string;
}

export const toastSuccess = (message: string, hash?: string) => {
  toast(<SuccessMessage message={message} hash={hash} />, {
    type: 'success',
  });
};

export const toastError = (message: string) => {
  toast(<ErrorMessage message={message} />, {
    type: 'error',
  });
};

export const toastErrorWithTitle = (
  title?: string,
  message?: string,
  time?: number,
) => {
  toast(<MessageWithTitle title={title} message={message} />, {
    type: 'error',

    autoClose: time || 3000,
  });
};

export const ErrorMessage = (props: IMessageProps) => {
  const { message } = props;
  return (
    <div style={{ color: '#fff' }}>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            opacity=".4"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
            fill="#f24040"
          ></path>
          <path
            d="M12 13.75c.41 0 .75-.34.75-.75V8c0-.41-.34-.75-.75-.75s-.75.34-.75.75v5c0 .41.34.75.75.75ZM12.92 15.619c-.05-.12-.12-.23-.21-.33-.1-.09-.21-.16-.33-.21a1 1 0 0 0-.76 0c-.12.05-.23.12-.33.21-.09.1-.16.21-.21.33-.05.12-.08.25-.08.38s.03.26.08.38c.05.13.12.23.21.33.1.09.21.16.33.21.12.05.25.08.38.08s.26-.03.38-.08.23-.12.33-.21c.09-.1.16-.2.21-.33.05-.12.08-.25.08-.38s-.03-.26-.08-.38Z"
            fill="#f24040"
          ></path>
        </svg>
        <div className="text-[14px]" style={{ marginLeft: '8px' }}>
          {message ?? 'Error'}
        </div>
      </div>
    </div>
  );
};

export const MessageWithTitle = (props: IMessagePropsWithTitle) => {
  const { message, title } = props;
  return (
    <div style={{ color: '#fff' }}>
      <div className="">{title}</div>
      <div className="text-[14px] text-white-700 font-normal">
        {message ?? 'Error'}
      </div>
    </div>
  );
};

export const SuccessMessage = (props: IMessageProps) => {
  const { message } = props;
  return (
    <div style={{ color: '#fff' }}>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            opacity=".4"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
            fill="#17d01a"
          ></path>
          <path
            d="M10.58 15.582a.75.75 0 0 1-.53-.22l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.67 5.67a.75.75 0 0 1-.53.22Z"
            fill="#17d01a"
          ></path>
        </svg>
        <div className="text-[14px]" style={{ marginLeft: '8px' }}>
          {message ?? 'Successfully'}
        </div>
      </div>
    </div>
  );
};
