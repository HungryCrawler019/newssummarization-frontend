import { Box, Button, TextField } from "@mui/material";

// eslint-disable-next-line react/prop-types
export const TextArea = ({ flag, handleOpen, handleSummary, summary }) => {
  return (
    <Box width="100%">
      <TextField
        value={summary}
        onChange={(e) => handleSummary(e.target.value)}
        type="text"
        multiline
        rows={8}
        sx={{
          width: "100%",
        }}
      />
      <Box mt={1} display="flex" justifyContent="center" gap={3}>
        <Button variant="contained" sx={{ padding: "8px 25px" }}>
          Edit
        </Button>
        {flag && (
          <Button
            variant="contained"
            sx={{ padding: "8px 25px" }}
            onClick={() => handleOpen(false)}
          >
            Translate
          </Button>
        )}
        <Button variant="contained" sx={{ padding: "8px 25px" }}>
          Save
        </Button>
        <Button variant="contained" sx={{ padding: "8px 25px" }}
          onClick={() => handleOpen(true)}
        >
          Save & Send
        </Button>
      </Box>
    </Box>
  );
};
