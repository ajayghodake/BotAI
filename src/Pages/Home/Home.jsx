import { Box, Stack, Typography } from "@mui/material"; 
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { ThemeContext } from "../../Theme/ThemeContext";
import { useContext } from "react";

import Data from "../../Data/sampleData.json";
import Navbar from "../../Components/Navbar/Navbar";
import InitChat from "../../Components/InitChat/InitChat";
import FeedbackModal from "../../Components/FeedbackModal/FeedbackModal";
import ChatingCard from "../../Components/ChatingCard/ChatingCard";
import ChatInput from "../../Components/ChatInput/ChatInput";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [chatId, setChatID] = useState(1);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const { chat, setChat } = useOutletContext();
  const { mode } = useContext(ThemeContext);
  const listRef = useRef(null);

  const generateResponse = (input) => {
    const response = Data.find(
      (item) => input.toLowerCase() === item.question.toLowerCase()
    );
    let answer = "sorry ,Did not understand your query!";

    if (response !== undefined) {
      answer = response.response;
    }

    setChat((prev) => [
      ...prev,
      {
        type: "Human",
        text: input,
        time: new Date(),
        id: chatId,
      },
      {
        type: "AI",
        text: answer,
        time: new Date(),
        id: chatId + 1,
      },
    ]);
    setChat((prev) => prev + 2);
  };

  return (
    <Stack
    height={'100vh'}
      justifyContent={'space-between'}
      sx={{
        "@media (max-width : 767px)": {
          background:
            mode === "light" ? "linear-gradient(#F9FAFA 60%, #EDE4FF)" : "",
        },
      }}
    >
      <Navbar />

      {chat.length === 0 && <InitChat geneteateResponse={generateResponse} />}

      {chat.length > 0 && (
        <Stack
          height={1}
          flexGrow={0}
          p={{ xs: 2, md: 3 }}
          spacing={{ xs: 2, md: 3 }}
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(151, 133, 186,0.4)",
              borderRadius: "8px",
            },
          }}
          ref={listRef}
        >
          {chat.map((item, index) => (
            <ChatingCard
              details={item}
              key={index}
              updateChat={setChat}
              setSelectedChatId={setSelectedChatId}
              showFeedbackModal={() => setShowModal(true)}
            />
          ))}
        </Stack>
      )}
      <ChatInput
        generateResponse={generateResponse}
        setScroll={setScrollToBottom}
        chat={chat}
        clearChat={() => setChat([])}
      />

      <FeedbackModal open={showModal} updateChat={setChat} chatId={selectedChatId} handleClose={()=>setShowModal(false)}/>
    </Stack>
  );
};

export default Home;
