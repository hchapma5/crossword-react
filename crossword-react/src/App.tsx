import { useState } from 'react'
import { postData } from './utils'

import './App.css'
import { Box, Button, CircularProgress, Slider, TextField } from '@mui/material'

function App() {
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState<string>('')
  const [wordCount, setWordCount] = useState<number>(10)
  const [data, setData] = useState(null)

  const handleSubmit = async () => {
    setLoading(true)
    const cd = await postData(theme, wordCount)
    setData(cd)
    setLoading(false)
  }

  return (
    <div className='container'>
      {loading ? (
        // Display a loading indicator when the component is loading
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        !data && (
          <Box
            className="form-container"
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField id='theme-input' label='Theme' variant='outlined'
            value={theme} onChange={(e) => setTheme(e.target.value)} />
            <Slider
              defaultValue={10}
              aria-label='Default'
              valueLabelDisplay='auto'
              step={1}
              min={5}
              max={20}
              value={wordCount}
              onChange={(_, value) => setWordCount(value as number)}
            />
            <Button variant='outlined' type='submit'>
              Submit
            </Button>
          </Box>
        )
      )}
      {/* Conditionally render the data if it exists */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App
