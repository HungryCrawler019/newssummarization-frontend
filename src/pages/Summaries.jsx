import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import { getSummaries } from "../apis";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Summaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await getSummaries();
        console.log(response);
        setSummaries(response);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      }
    };

    fetchSummaries();
  }, []);

  const handleOpen = (summary) => {
    setSelectedSummary(summary);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box width="80%" mx="auto" my={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                width="35%"
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                Original
              </TableCell>
              <TableCell
                width="35%"
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                Summary
              </TableCell>
              <TableCell
                width="30%"
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaries &&
              summaries.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {row.text.length > 90
                      ? row.text.slice(0, 90) + "..."
                      : row.text}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {row.content.length > 90
                      ? row.content.slice(0, 90) + "..."
                      : row.content}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleOpen(row)}>
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detailed View
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Original Text"
              fullWidth
              multiline
              rows={7}
              defaultValue={selectedSummary?.text}
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Summary Text"
              fullWidth
              multiline
              rows={7}
              defaultValue={selectedSummary?.content}
              variant="outlined"
              margin="normal"
            />
          </Typography>
          <Box mt={2}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Summaries;
