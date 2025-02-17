import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const ChatInput = ({ generateResponse, setScroll, chat, clearChat }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    generateResponse(input);
    setInput("");
    setScroll((prev) => !prev);
  };

  const handleSave = () => {
    const chatHistory = JSON.parse(localStorage.getItem('chat')) || [];
    const date = new Date();
    localStorage.setItem('chat', JSON.stringify([{chat: chat, datetime: date}, ...chatHistory]));
    clearChat();
    setShowSnackbar(true);
  }

  useEffect(()=> {
    inputRef.current.focus();
  }, [])

  return (
    <Box flexShrink={0} px={{ xs: 0.5, md: 3 }} pb={{ xs: 1, md: 3 }}>
      <Box component={"form"} onSubmit={handleSubmit}>
        <Stack direction={"row"} spacing={{ xs: 0.5, md: 2 }}>
          <TextField
            placeholder="Message Bot AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            inputRef={inputRef}
            sx={{
              flex: 1,
              bgcolor: "primary.light",
              borderRadius: 1,
              "& input": {
                fontSize: { xs: 12, md: 16 },
                paddingLeft: { xs: 1, md: 2 },
                paddingRight: { xs: 1, md: 2 },
              },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width: 747px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
          >
            Ask
          </Button>
          <Button
            variant="outlined"
            onClick={handleSave}
            disabled={!chat.length > 0}
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width: 747px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={showSnackbar}
        message={"chat saved."}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={5000}
        action={
          <Link to={"/history"}>
            <Button>See past conversations</Button>
          </Link>
        }
      />
    </Box>
  );
};

export default ChatInput;
