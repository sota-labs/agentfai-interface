'use client';
import { CopyCheckedIcon, CopyIcon } from '@/assets/icons';
import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={`cursor-pointer w-[36px] h-[36px] rounded-[8px] flex items-center justify-center transition-all duration-300`}
      onClick={handleCopy}
    >
      {copied ? <CopyCheckedIcon /> : <CopyIcon />}
    </div>
  );
}
