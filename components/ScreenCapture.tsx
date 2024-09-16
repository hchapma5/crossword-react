import { useEffect, useRef, useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useScreenshot } from "../hooks/useScreenshot";
import { check } from "drizzle-orm/mysql-core";

const supabase = createClient();

const checkIfThumbnailExists = async (imageId: string) => {
  const { data, error } = await supabase.storage
    .from("crosswords")
    .exists(`${imageId}.png`);
  return data && !error;
};

async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}

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

  const handleUpload = async (image: string) => {
    const imageFile = await convertBlobUrlToFile(image);
    const { error } = await supabase.storage
      .from("crosswords")
      .upload(`${imageId}.png`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) console.error("Error uploading image: ", error);
  };

  useEffect(() => {
    checkIfThumbnailExists(imageId).then((exists) => {
      if (exists) return;

      if (image) {
        handleUpload(image);
        return clear();
      }

      takeScreenshot();
    });
  }, [isLoading]);

  return <div ref={ref}>{children}</div>;
}
