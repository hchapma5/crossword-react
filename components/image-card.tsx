import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import StarRating from "./star-rating";

interface ImageCardProps {
  theme: string;
  imgUrl: string;
  username: string;
  createdAt: Date;
  rating: number;
}

export default function ImageCard({
  theme,
  imgUrl,
  username,
  createdAt,
  rating,
}: ImageCardProps) {
  return (
    <Card className="flex h-96 w-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="flex-shrink-0 bg-gray-300 p-2 dark:bg-gray-800">
        <div className="relative aspect-square w-full">
          <Image
            src={imgUrl}
            alt={`Image of ${theme} crossword`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={true}
            className="object-contain"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-grow flex-col items-start space-y-2 p-4">
        <h2 className="w-full truncate text-lg font-semibold">{theme}</h2>
        <StarRating readOnly={true} initialRating={rating} />
        <div className="flex w-full items-center justify-between text-center">
          <p className="max-w-[60%] truncate text-sm text-gray-600">
            {username}
          </p>
          <p className="text-xs text-gray-500">
            {createdAt.toLocaleDateString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
