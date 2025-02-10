'use client';
import { useState, useEffect } from 'react';

const useTypingEffect = (text: string, onTypingCompleted?: () => void) => {
  const [displayedText, setDisplayedText] = useState('');
  const maxDuration = 5000;
  const minDuration = 2000;

  useEffect(() => {
    let index = 0;
    const duration = Math.min(
      maxDuration,
      Math.max(minDuration, text.length * 50),
    );
    const speed = duration / text.length;
    const interval = setInterval(() => {
      const typingValue = text.slice(0, index + 1);
      setDisplayedText(typingValue);

      index++;
      if (index === text.length) {
        clearInterval(interval);
        if (onTypingCompleted) onTypingCompleted();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return displayedText;
};

export default useTypingEffect;
