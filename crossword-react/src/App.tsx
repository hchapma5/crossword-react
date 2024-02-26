import { useState } from 'react'
import { postData } from './utils'

import './App.css'
import { Box, Button, Slider, TextField } from '@mui/material'

function App() {
  const [theme, setTheme] = useState<string>('')
  const [wordCount, setWordCount] = useState<number>(10)
  const [data, setData] = useState(null)

  const handleSubmit = async () => {
    const cd = await postData(theme, wordCount)
    let cleaned = cd.slice(1, -1)
    cleaned = cleaned.replace(/\\"/g, '"')
    cleaned = cleaned.replace(/\{\{/g, '{').replace(/\}\}/g, '}');
    setData(JSON.parse(cleaned))
  }

  return (
    <div className='container'>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
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
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
} 

export default App
