import { Box, Button } from "@mui/material"
import { ManualIntput } from "./ManualIntput"
import { useRef, useState } from "react";
import { useMyContext } from "../context";
import { getContentText, getSummarization } from "../apis";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export const PdfBox = ({ handleSummary, type, textData, handleTextData }) => {
    const uploadFileRef = useRef(null);
    const [pdf, setPdf] = useState(null);
    const { handleIsLoading } = useMyContext();

    const fetchText = async () => {
        if(!pdf) {
            toast.error('No pdf provided!');
            return;
        }
        handleIsLoading(true);
        const data = await getContentText(pdf);
        if(data){
            handleTextData(data);
        }
        handleIsLoading(false);
    }

    const fetchSummarization = async (value) => {
        if(!textData) return;
        handleIsLoading(true);
        const data = await getSummarization({
          text: textData,
          type,
          length_type: +value
        })
        if(data){
            handleSummary(data);
        }
        handleIsLoading(false);
    }

    const handleUploadFile = () => {
      uploadFileRef.current.click();
    }
  
    const handleInputChange = (e) => {
      setPdf(e.target.files[0]);
    }

    return (
        <>
            <Box width="100%" display="flex" justifyContent="end" gap={2} mb={2}>
            <Button variant="contained" sx={{ padding: "8px 25px" }} onClick={handleUploadFile}>
                Upload file
            </Button>
            <Button variant="contained" sx={{ padding: "8px 25px" }} onClick={fetchText}>
                Get Text
            </Button>
            <input type="file" name="pdf" onChange={handleInputChange} ref={uploadFileRef} 
                accept="application/pdf"
                style={{
                display: 'none' 
                }} 
            />
            </Box>
            
            <ManualIntput textData={textData} handleTextData={handleTextData}/>

            <Box display="flex" justifyContent="end" gap={2} mb={2}>
            <Button variant="contained" sx={{ padding: "8px 25px" }}
                onClick={() => fetchSummarization(0)}
            >
                300 words
            </Button>
            <Button variant="contained" sx={{ padding: "8px 25px" }}
                onClick={() => fetchSummarization(1)}
            >
                600 words
            </Button>
            </Box>
        </>
    ) 
}
