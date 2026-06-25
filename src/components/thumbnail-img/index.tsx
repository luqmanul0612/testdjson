import clsx from "clsx";
import cn from "./thumbnail-img.module.scss";
import { useState } from "react";
import { Spin } from "antd";

const ThumbnailImg = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  if(!src) return <div className={clsx(cn.thumbnailContainer, className)}><span className={cn.noImage}>No Image</span></div>;
  return (
    <div className={clsx(cn.thumbnailContainer, className)}>
      {!loaded && (
        <div className={cn.thumbnailLoading}>
          <Spin />
        </div>
      )}
      <img src={src} alt={alt} className={cn.thumbnail} onLoad={() => setLoaded(true)} />
    </div>
  );
};

export default ThumbnailImg;
