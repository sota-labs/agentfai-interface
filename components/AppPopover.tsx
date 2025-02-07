import React, { useEffect, useRef, useCallback } from 'react';

interface AppPopoverProps {
  onClose?: () => void;
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'custom';
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  customPosition?: string;
  customClassWrapper?: string;
  hideClickOutside?: boolean;
}

export const AppPopover: React.FC<AppPopoverProps> = ({
  onClose,
  trigger,
  content,
  position = 'right',
  isOpen,
  onToggle,
  customPosition,
  customClassWrapper = '',
  hideClickOutside = true,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<any>(null);

  const getPositionClass = useCallback(() => {
    const positionClasses = {
      top: 'bottom-0 mb-8',
      left: 'right-0 mt-2',
      right: 'left-0 mt-2',
      bottom: 'top-0 mt-2',
      custom: customPosition,
    };
    return positionClasses[position] || 'right-0 ml-2';
  }, [position, customPosition]);

  const handleTriggerClick = useCallback(() => {
    onToggle(!isOpen);
    if (isOpen) {
      onClose?.();
    }
  }, [isOpen, onToggle, onClose]);

  const handleClickOutside = (event: Event) => {
    if (
      contentRef.current &&
      hideClickOutside &&
      !contentRef.current.contains(event.target as Node) &&
      !popoverRef.current?.contains(event.target as Node)
    ) {
      onClose?.();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={popoverRef} className="relative">
      <div className="popover-trigger" onClick={handleTriggerClick}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={contentRef}
          className={`popover-content absolute z-10 shadow-lg rounded ${customClassWrapper} ${getPositionClass()} `}
        >
          {content}
        </div>
      )}
    </div>
  );
};
