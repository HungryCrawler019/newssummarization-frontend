import { Box, TextField } from '@mui/material'

// eslint-disable-next-line react/prop-types
export const ManualIntput = ({ textData, handleTextData }) => {

  const handleChange = (e) => {
    handleTextData(e.target.value);
  }

  return (  
    <Box my={2}>
        <TextField
          onChange={handleChange}
          value={textData}
          type="text"
          multiline
          rows={8}
          sx={{
              width: "100%",
          }}
        />
    </Box>
  )
}
