import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface ImageCardProps {
  theme: string;
  imgUrl: string;
  username: string;
  createdAt: Date;
}

export default function ImageCard(props: ImageCardProps) {
  const { theme, imgUrl, username, createdAt } = props;

  return (
    <Card className="mx-auto w-full max-w-sm overflow-hidden">
      <div className="relative aspect-[3/2]">
        <Image
          src={imgUrl}
          alt={`Image of ${theme} crossword`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <h2 className="text-2xl font-bold">{theme}</h2>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">{username}</span> •{" "}
          {createdAt.toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
