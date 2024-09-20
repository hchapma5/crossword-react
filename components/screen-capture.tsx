import { useEffect, useRef } from "react";
import { useScreenshot } from "../hooks/useScreenshot";
import { convertBlobUrlToFile } from "@/utils/utils";
import { uploadImageToStorage } from "@/db/storage";

type ScreenCaptureProps = {
  imageId: string;
  children: React.ReactNode;
};

export default function ScreenCapture({
  imageId,
  children,
}: ScreenCaptureProps) {
  const ref = useRef(null);
  const { image, takeScreenshot, clear } = useScreenshot(ref);

  useEffect(() => {
    if (image) {
      convertBlobUrlToFile(image).then((file) =>
        uploadImageToStorage(imageId, file),
      );
      clear();
    } else {
      takeScreenshot();
    }
  }, [image, imageId, takeScreenshot, clear]);

  return <div ref={ref}>{children}</div>;
}
