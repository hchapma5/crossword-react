import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function uploadImageToStorage(id: string, file: File) {
  const { error } = await supabase.storage
    .from("crosswords")
    .upload(`${id}.png`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) console.error("Error uploading image: ", error);
}

export async function checkIfThumbnailExists(imageId: string) {
  const { data, error } = await supabase.storage
    .from("crosswords")
    .exists(`${imageId}.png`);
  return data && !error;
}
