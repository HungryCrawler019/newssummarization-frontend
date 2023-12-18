import { Box, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import { Nypost } from "../components/Nypost";
import { Manual } from "../components/Manual";

const News = () => {
  const [selectedValue, setSelectedValue] = useState(true);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Box display="flex" alignItems="center">
          <Radio
            checked={selectedValue}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
            onClick={() => {
              handleChange(true);
            }}
          />
          <Typography>NYPOST</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Radio
            checked={!selectedValue}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
            onClick={() => {
              handleChange(false);
            }}
          />
          <Typography>MANUAL</Typography>
        </Box>
      </Box>

      <Box>{selectedValue ? <Nypost /> : <Manual />}</Box>
    </Box>
  );
};

export default News;
