import { uploadImageToStorage } from "@/db/storage";
import { toPng } from "html-to-image";
import { RefObject } from "react";

export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

export async function captureScreenshotAndUploadToStorage(
  ref: RefObject<HTMLElement>,
  storageId: string,
) {
  let image: string | undefined;

  if (!ref.current) return;

  try {
    image = await toPng(ref.current);
  } catch (e) {
    console.error(e);
  } finally {
    if (image) {
      const file = await convertBlobUrlToFile(image);
      await uploadImageToStorage(storageId, file);
    }
  }
}
