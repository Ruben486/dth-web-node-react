import { memo } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";

type LoadImageProps = {
  src: string;
  alt?: string;
};

export const LoadImage = memo(({ src, alt}:LoadImageProps) => {
  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 text-xs rounded-md"
        
      />
    </>
  );
});


