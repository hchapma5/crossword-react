import { useState } from "react";
import { postData } from "./utils/utils";
import { CrosswordForm, CrosswordGame } from "./components";
import { Button } from "./components/ui/button";
import { Loader2 } from "lucide-react";
import { CrosswordData } from "./types/types";

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
    <div className="max-h-[100vh] w-[80%] flex justify-center">
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
      {crosswordData && <CrosswordGame data={crosswordData} />}
    </div>
  );
}

export default App;
