import { useState, type ImgHTMLAttributes } from "react";

interface PhotoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  /** Local image shown if the remote photo fails to load (offline / blocked). */
  fallback?: string;
}

/** <img> that swaps to a local fallback when the remote photo can't be loaded. */
export function Photo({ src, fallback, alt = "", loading = "lazy", onError, ...rest }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed && fallback ? fallback : src}
      alt={alt}
      loading={loading}
      onError={(e) => { if (!failed && fallback) setFailed(true); onError?.(e); }}
      {...rest}
    />
  );
}
