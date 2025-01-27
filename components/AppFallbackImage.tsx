'use client';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { memo, useState } from 'react';

type AppFallbackImageProps = ImageProps & {
  fallbackSrc: string | StaticImageData;
};

const AppFallbackImage: React.FC<AppFallbackImageProps> = memo(
  ({ fallbackSrc, ...props }) => {
    const [src, setSrc] = useState(props.src);

    const handleError = () => {
      setSrc(fallbackSrc);
    };

    return (
      <Image {...props} src={src} onError={handleError} alt={props?.alt} />
    );
  },
);
AppFallbackImage.displayName = 'AppFallbackImage';
export default AppFallbackImage;
