import { useState } from "react";
import { CrosswordData, postData } from "./utils/utils";
import { CrosswordClues, CrosswordForm, CrosswordGrid } from "./components";
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
      {/* Used for testing purposes */}
      {/* {crosswordData && <div>{JSON.stringify(crosswordData, null, 2)}</div>} */}
      {crosswordData && (
        <div className="flex flex-col w-4/5 justify-center items-center gap-4">
          <CrosswordGrid data={crosswordData} />
          <CrosswordClues data={crosswordData} />
        </div>
      )}
    </>
  );
}

export default App;
