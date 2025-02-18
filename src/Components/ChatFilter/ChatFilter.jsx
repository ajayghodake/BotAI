/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Select, MenuItem, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';

const ChatFilter = ({allchats, filteredChats}) => {

    const [option, setOption] = useState('All Ratings');

// Assingning Rating to the 'option'
    const handleChange = (e) => {
        setOption(e.target.value);
    };

// Filtering the chat as per Ratings
    useEffect(()=>{
        if(option === 'All Ratings' ) {
            filteredChats(allchats)
        } else {
            const filtered = allchats.filter(item => {
                let found = false;
                item.chat.forEach(ch => {
                    if(ch.rating === option){
                        found = true;
                    }
                })
                return found;
            })
            filteredChats(filtered);
        }
    }, [option]);


    return (
        <Box mb={3}>
            <Typography>Filter by rating</Typography>

            <Select value={option} onChange={handleChange} size='small' sx={{minWidth: {xs:1, md:160}}}>
                <MenuItem value='All Ratings'>All Ratings</MenuItem>
                <MenuItem value={1}>1 Star</MenuItem>
                <MenuItem value={2}>2 Star</MenuItem>
                <MenuItem value={3}>3 Star</MenuItem>
                <MenuItem value={4}>4 Star</MenuItem>
                <MenuItem value={5}>5 Star</MenuItem>
            </Select>

        </Box>
    );
};

export default ChatFilter;