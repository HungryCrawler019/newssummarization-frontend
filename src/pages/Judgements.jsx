import { Box } from "@mui/material";
import { TextArea } from "../components/TextArea";
import { Modal } from "../components/Modal";
import { useState } from "react";
import { PdfBox } from "../components/PdfBox";
import { sendMail, translateText } from "../apis";
import { useMyContext } from "../context";
import toast from "react-hot-toast";

const Judgements = () => {
  const [open, setOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [summary, setSummary] = useState('');
  const [textData, setTextData] = useState('');
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

  const handleOpen = (value) => {
    setOpen(true);
    setIsSend(value);
  };

  const handleTraslateLanguage = async (language) => {
    if(!summary) return;
    handleIsLoading(true);
    const data = await translateText({ 
      text: summary,
      language
    })
    if(data) {
      setSummary(data);
    }
    handleIsLoading(false);
  }

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
      { open && <Modal open={open} handleClose={handleClose} isSend={isSend} textData={textData} 
          handleTraslateLanguage={handleTraslateLanguage} handleSendMail={handleSendMail}
      /> }
      <Box width="80%">
        <PdfBox handleSummary={handleSummary} type={1} textData={textData} handleTextData={handleTextData} />

        <TextArea flag handleOpen={handleOpen} handleSummary={handleSummary} summary={summary} />
      </Box>
    </Box>
  );
};

export default Judgements;
