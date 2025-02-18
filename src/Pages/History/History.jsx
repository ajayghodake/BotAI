import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ChatFilter from "../../Components/ChatFilter/ChatFilter";
import ChatHistoryCard from "../../Components/ChatHistoryCard/ChatHistoryCard";
import { Box, Typography, Stack, Divider } from "@mui/material";

const History = () => {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);

useEffect(()=>{
    const localChats = localStorage.getItem('chat') || [];
    if(localChats.length > 0){
        setChats(JSON.parse(localChats));
        setFilteredChats(JSON.parse(localChats));
    }
}, [])

  return (
    <Box
      height={"100vh"}
      overflow={"hidden"}
      sx={{
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: "10px" },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(151,133,186,0.4)",
          borderRadius: "8px",
        },
      }}
    >
      <Navbar />

      <Box p={{ xs: 2, md: 3 }}>
        <Typography variant="h2" textAlign={"center"} mb={3}>
          Conversation History
        </Typography>

        {/* ALL CHATS */}
        {chats.length > 0 && <ChatFilter allchats={chats} filteredChats={setFilteredChats} />}

        {/* FILTERED CHATS */}
        {chats.length > 0 && filteredChats.length === 0 && (
             <Typography
             textAlign={'center'}
             p={3}
             bgcolor={"primary.light"}
             borderRadius={2}
           >
             No such chats
           </Typography>
        )}
       
       {/* NO CHATS */}
        {chats.length === 0 && (
             <Typography
             textAlign={"center"}
             p={3}
             bgcolor={"primary.light"}
             borderRadius={2}
           >
             No saved chats
           </Typography>
        )}
         
        {filteredChats.length > 0 && (
            <Stack spacing={4} 
            divider={<Divider sx={{borderColor: 'primary.bg', opacity: 0.4}}/>}
            >
                {filteredChats.map((item, index) => (
                    <ChatHistoryCard details={item} key={index}/>
                ))}
            </Stack>
        )}

      </Box>
    </Box>
  );
};

export default History;
