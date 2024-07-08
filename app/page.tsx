import { Input } from "@/components/ui/input";
import { fetchPuzzleData } from "@/actions/fetchPuzzleData";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <form action={fetchPuzzleData}>
      <Input id="theme" name="theme" placeholder="Search for a theme" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
