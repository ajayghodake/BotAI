import React from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import Icon from "../../assets/bot.png";
import InitChatCard from "./InitChatCard";

const InitChat = ({ generateResponse }) => {
  const initialData = [
    {
      heading: "Hi, what is the weather",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, what is my location",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, what is the temperature",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, how are you",
      subtext: "Get immediate AI generated response",
    },
  ];

  return (
    <Stack justifyContent={"flex-end"} height={1} p={{ xs: 2, md: 3 }}>
      <Stack alignItems={"center"} spacing={2} my={5}>
        <Typography variant="h2">How Can I Help You Today?</Typography>
        <Box
          component={"img"}
          src={Icon}
          height={{ xs: 42, md: 70 }}
          width={{ xs: 42, md: 70 }}
          boxShadow={4}
          borderRadius={"50%"}
        />
      </Stack>

    <Grid container spacing={{ xs: 1, md: 3 }}>
        {initialData.map(item => (
            <Grid item key={item.heading} xs={12} md={6}>
                
                <InitChatCard heading={item.heading} subtext={item.subtext} handleClick={generateResponse} />
            </Grid>
        ))}
    </Grid>

    </Stack>
  );
};

export default InitChat;
