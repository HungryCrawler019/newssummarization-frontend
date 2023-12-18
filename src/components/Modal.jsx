import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import { getLanguages } from '../apis';
import { useMyContext } from '../context';

// eslint-disable-next-line react/prop-types
export const Modal = ({ open, handleClose, isSend, textData, handleTraslateLanguage, handleSendMail }) => {
  const [text, setText] = useState("");
  const [languages, setLanguages] = useState([]);
  const { handleIsLoading } = useMyContext();

  useEffect(() => {
    !isSend && fetchLanguages();
  }, [])

  const fetchLanguages = async () => {
    if(!textData) return;
    handleIsLoading(true);
    const data = await getLanguages(textData);
    if(data) {
      setLanguages(data);
    }
    handleIsLoading(false);
  }

  const handleSelectLanguage = (language) => {
    setText(language);
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleTranslate = () => {
    handleTraslateLanguage(text);
    handleClose();
  }

  const handleEmail = () => {
    handleSendMail(text);
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{ isSend ? "Send to" : "Translate" }</DialogTitle>
        <DialogContent sx={{
            width: "400px"
        }}>
          { !isSend && <Box display="flex" gap={1}>
            {
              languages.map((item, i) => {
                return <Chip label={item} key={i} onClick={() => handleSelectLanguage(item)} sx={{
                  cursor: 'pointer'
                }}/>
              })
            }
          </Box> }

          <Box mt={isSend ? 0 : 2}>
            <TextField
              value={text}
              onChange={handleChange}
              autoFocus
              margin="dense"
              type={isSend ? "email" : "text"}
              fullWidth
              variant="standard"
              placeholder={isSend ? "Email" : "Language"}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={isSend ? handleEmail : handleTranslate}>{ isSend ? "Send": "Translate"}</Button>
        </DialogActions>
      </Dialog>
  )
}
