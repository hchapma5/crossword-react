import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

interface ImageCardProps {
  theme: string;
  imgUrl: string;
  username: string;
  createdAt: Date;
}

export default function ImageCard({
  theme,
  imgUrl,
  username,
  createdAt,
}: ImageCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="flex-shrink-0 bg-gray-300 p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={imgUrl}
            alt={`Image of ${theme} crossword`}
            fill
            className="object-scale-down p-2"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-grow flex-col items-start justify-between p-4">
        <div className="w-full">
          <h2 className="truncate text-lg font-semibold">{theme}</h2>
          <p className="truncate text-sm text-gray-600">{username}</p>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          {createdAt.toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
