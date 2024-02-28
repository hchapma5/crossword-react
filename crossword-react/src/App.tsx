import { useState } from "react";
import { Clues, Crossword } from "./components";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Slider,
  TextField,
} from "@mui/material";
import { CrosswordData, postData } from "./utils/utils";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(10);
  const [data, setData] = useState<CrosswordData | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await postData(theme, wordCount);
    setData(res);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        !data && (
          <Box
            className="form-container"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField
              id="theme-input"
              label="Theme"
              variant="outlined"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
            <Slider
              defaultValue={10}
              aria-label="Default"
              valueLabelDisplay="auto"
              step={1}
              min={5}
              max={20}
              value={wordCount}
              onChange={(_, value) => setWordCount(value as number)}
            />
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Box>
        )
      )}
      {/* Conditionally render the data if it exists */}
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      {data && (
        <Container>
          <Crossword data={data} />
          <Clues data={data} />
        </Container>
      )}
    </>
  );
}

export default App;
