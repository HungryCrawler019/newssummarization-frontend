import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { TextArea } from "./TextArea";
import { getNews, getSummarization } from "../apis";
import { useMyContext } from "../context";

export const Nypost = () => {
  const [news, setNews] = useState([]);
  const [summary, setSummary] = useState('');
  const { handleIsLoading } = useMyContext();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await getNews();
      setNews(response);
    } catch (error) {
      console.error("Error fetching summaries:", error);
    }
  };

  const fetchSummarization = async (value, textData) => {
    if (!textData) return;
    handleIsLoading(true);
    const data = await getSummarization({
      text: textData,
      type: 0,
      length_type: +value,
    });
    if (data) {
      setSummary(data);
    }
    handleIsLoading(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={2}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Box position="relative" width="100%" mb={2}>
            <Typography variant="h6" textAlign="center">
              News from NYTimes
            </Typography>
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => fetchNews()}
            >
              Refresh
            </Button>
          </Box>

          <Box my={2} px={4} border="1px solid black">
            <Box
              width="100%"
              height="250px"
              py={2}
              display="flex"
              flexDirection="column"
              gap={2}
              overflow="auto"
            >
              {news.length > 0 && news.map((item, index) => (
                <Grid container key={index} alignItems="center" justifyContent="space-between" spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        variant="subtitle1"
                        noWrap
                        color="primary"
                      >
                        {item.title}
                      </Typography>
                    </a>
                  </Grid>
                  <Grid item container xs={12} sm={5} justifyContent="flex-end" spacing={1}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => fetchSummarization(0, item.abstract)}
                      >
                        300 words
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => fetchSummarization(1, item.abstract)}
                      >
                        600 words
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>

          <TextArea summary={summary} handleSummary={setSummary}/>
        </Grid>
      </Grid>
    </Box>
  );
};
