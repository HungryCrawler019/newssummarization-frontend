import { Box } from "@mui/material";
import { TextArea } from "./TextArea";
import { PdfBox } from "./PdfBox";
import { useState } from "react";
import { useMyContext } from "../context";
import { sendMail } from "../apis";
import toast from "react-hot-toast";
import { Modal } from "./Modal";

export const Manual = () => {
  const [summary, setSummary] = useState('');
  const [textData, setTextData] = useState('');
  const [open, setOpen] = useState(false);
  const { handleIsLoading } = useMyContext();

  const handleTextData = (data) => {
    setTextData(data);
  }

  const handleSummary = (value) => {
    setSummary(value);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSendMail = async (email) => {
    if(!summary || !email) return;
    handleIsLoading(true);
    const response = await sendMail({
        text: summary,
        email
    })
    
    if(response){
      toast.success('Email successfully sent!');
    }else{
      toast.error('Email failed!');
    }
    handleIsLoading(false);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={2}>
      { open && <Modal open={open} handleClose={handleClose} isSend handleSendMail={handleSendMail} /> }
      <Box width="80%">
        <PdfBox handleSummary={handleSummary} type={0} textData={textData} handleTextData={handleTextData} />

        <TextArea handleOpen={handleOpen} handleSummary={handleSummary} summary={summary} />
      </Box>
    </Box>
  );
};
