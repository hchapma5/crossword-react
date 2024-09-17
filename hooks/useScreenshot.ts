import { useState, useCallback, RefObject } from "react";
import { toPng } from "html-to-image";

export const useScreenshot = (ref: RefObject<HTMLElement>) => {
  const [image, setImage] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  const takeScreenshot = useCallback(async () => {
    setLoading(true);
    let tempImage: string | undefined;

    if (!ref.current) return;

    try {
      tempImage = await toPng(ref.current);
      setImage(tempImage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);

      return tempImage;
    }
  }, [ref]);

  const clear = useCallback(() => setImage(undefined), []);

  return { image, takeScreenshot, isLoading, clear };
};

export default useScreenshot;
