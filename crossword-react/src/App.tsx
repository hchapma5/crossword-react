import { useState } from "react";
import { CrosswordData, postData } from "./utils/utils";
import { CrosswordForm } from "./components";
import { Button } from "./components/ui/button";
import { Loader2 } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(false);
  const [crosswordData, setCrosswordData] = useState<CrosswordData | null>(
    null
  );

  const handleFormData = async (theme: string, wordCount: number) => {
    setLoading(true);
    const data = await postData(theme, wordCount);
    setCrosswordData(data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Button variant={"ghost"} disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
      ) : (
        !crosswordData && <CrosswordForm onSubmit={handleFormData} />
      )}
      {crosswordData && <div>{JSON.stringify(crosswordData, null, 2)}</div>}
    </>
  );
}

export default App;
