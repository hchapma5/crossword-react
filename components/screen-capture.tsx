import { useEffect, useRef, useState } from "react";
import { useScreenshot } from "../hooks/useScreenshot";
import { convertBlobUrlToFile } from "@/utils/utils";
import { checkIfThumbnailExists, uploadImageToStorage } from "@/db/storage";

type ScreenCaptureProps = {
  imageId: string;
  children: React.ReactNode;
};

export default function ScreenCapture({
  imageId,
  children,
}: ScreenCaptureProps) {
  const ref = useRef(null);
  const { image, takeScreenshot, isLoading, clear } = useScreenshot(ref);

  useEffect(() => {
    checkIfThumbnailExists(imageId).then((exists) => {
      if (exists) return;

      if (image) {
        convertBlobUrlToFile(image).then((file) =>
          uploadImageToStorage(imageId, file),
        );
        return clear();
      }

      takeScreenshot();
    });
  }, [isLoading]);

  return <div ref={ref}>{children}</div>;
}
