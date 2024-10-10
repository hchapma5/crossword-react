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
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="flex-shrink-0 bg-gray-300 p-0 dark:bg-gray-800">
        <div className="relative aspect-square w-full">
          <Image
            src={imgUrl}
            alt={`Image of ${theme} crossword`}
            fill
            sizes="100%"
            priority={true}
            className="object-scale-down p-2"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-grow flex-col items-start space-y-2 p-4">
        <h2 className="truncate text-lg font-semibold">{theme}</h2>
        <StarRating readOnlyRating={rating} />{" "}
        {/* TODO: pull rating as props */}
        <div className="flex w-full items-center justify-between text-center">
          <p className="truncate text-sm text-gray-600">{username}</p>
          <p className="mt-2 text-xs text-gray-500">
            {createdAt.toLocaleDateString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
