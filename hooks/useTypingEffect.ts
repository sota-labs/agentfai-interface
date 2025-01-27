'use client';
import { useCommonStore } from '@/libs/zustand/store';
import { useState, useEffect } from 'react';

const useTypingEffect = (text: string, duration: number = 10000) => {
  const { setIsSendMessage } = useCommonStore();
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setIsSendMessage(true);
    let index = 0;
    const speed = duration / text.length;
    const interval = setInterval(() => {
      const typingValue = text.slice(0, index + 1);
      setDisplayedText(typingValue);

      index++;
      if (index === text.length) {
        clearInterval(interval);
        setIsSendMessage(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, duration]);

  return displayedText;
};

export default useTypingEffect;
