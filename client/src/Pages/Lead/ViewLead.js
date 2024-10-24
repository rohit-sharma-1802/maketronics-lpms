import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/Constant";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Grid, CircularProgress, Button, colors } from "@mui/material";
import { leadDisplayHelper, quotesDisplayHelper } from "../../utils/Constant";
import Colors from "../../utils/Colors";
import UserTextField from "../../components/UserTextField";
import {
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider
  } from "@mui/material";

const ViewLead=()=>{

    const [leadDetails, setLeadDetails] = useState(null);
    const [leadCommentDetails, setLeadCommentDetails] = useState([]);
    const [supplierQuoteDetails, setSupplierQuoteDetails] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Params = useParams();
    const navigate = useNavigate();

    const {id} = Params;
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const {id} = Params;  
              setLoading(true);  
                
              const [response1, response2, response3] = await Promise.all([
                axiosInstance.get(`/leads/get-lead-details/${id}`),
                axiosInstance.get(`/leads/get-quote-details/${id}`),
                axiosInstance.get(`/leads/get-lead-comment/${id}`),
              ]);
              console.log(response1.data);
              console.log(response2.data);
              console.log(response3.data);
              setLeadDetails(response1.data.leadDetails);
              setSupplierQuoteDetails(response2.data.quoteDetails);
              setLeadCommentDetails(response3.data.messageDetails);

            } catch (err) {
              setError(err); 
            } finally {
              setLoading(false); 
            }
          };
      
          fetchData(); 
    }, [])

    const handleComment=()=>{
        
        axiosInstance.post(`/leads/add-lead-comment`, {message: newComment, id: Params.id})
        .then((res)=>{
            const temp = [...leadCommentDetails];
            console.log(res.data.commentDetails);
            temp.push(res.data.commentDetails);
            setLeadCommentDetails(temp);
            setNewComment("");
        })
        .catch((err)=>{
            setError(err);
        })
    }

    if(loading)
        return <CircularProgress />

    if(error)
        return <Typography varinat="h5">Some Error Occured!</Typography>

    return (
        <Box width={"100%"}>
            <Paper sx={{px: 3, py: 2}}>
                <Box sx={{ display: "flex", justifyContent:"center", mt: 2, mb: 4 }}>
                    <Typography variant='h5'>Lead Details</Typography>
                </Box>
                <Box border={0.5} borderRadius={4} paddingBottom={2} mt={3} p={2}>
                    <Grid container spacing={2} mb={1.5}>
                        {leadDisplayHelper.map((leadKey)=>{
                            return(
                                <Grid item md={4} lg={3} sm={4} xs={6} key={leadKey.heading}>
                                    <Box>
                                        <Typography variant="body2">{leadKey.label}</Typography>
                                        <Typography variant="body2">{leadDetails[leadKey.heading]}</Typography>
                                    </Box> 
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Button variant="contained" size="small" onClick={()=>navigate(`/edit-lead-details/${id}`)}>Edit Lead Details</Button>
                </Box>
                {supplierQuoteDetails.length > 0 &&
                <Box border={0.5} borderRadius={4} paddingBottom={2} mt={3}  p={2}>
                    <Box sx={{ display: "flex", justifyContent:"center", mt: 1, mb: 4 }}>
                        <Typography variant='h5'>Lead Quotation Details</Typography>
                    </Box>
                    {supplierQuoteDetails.map((supplierQuote, index)=>{
                        return(
                            <Box mb={3} key={index}>
                                <Typography variant="h6" sx={{mb: 1.5}}>Supplier {index+1} Details</Typography>
                                <Grid container spacing={2}>
                                    {quotesDisplayHelper.map((quotesKey)=>{
                                        return (
                                            <Grid item md={4} lg={3} sm={4} xs={6} key={quotesKey.heading}>
                                                <Box>
                                                    <Typography variant="body2">{quotesKey.label}</Typography>
                                                    <Typography variant="body2">{supplierQuote[quotesKey.heading]}</Typography>
                                                </Box> 
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </Box>
                        )
                    })}
                </Box>
                }
                <Box mt={2}>
                    <Box sx={{ display: "flex", justifyContent:"center", mt: 1, mb: 2 }}>
                        <Typography variant='h5'>Lead Comments</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <Box>
                                <UserTextField 
                                    label="Add New Comment*"
                                    heading="newComment"
                                    handleChange={(label, value, heading)=>setNewComment(value)}
                                    value={newComment}
                                    type="text"
                                    isTextArea={true}
                                />
                                <Button size="small" variant="contained" disabled={newComment.length === 0} onClick={handleComment}>Add</Button>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                        <List sx={{ paddingLeft: "20px",  margin: "20px auto" }}>
                            {leadCommentDetails.map((comment, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        alignItems="flex-start"
                                        sx={{
                                        borderLeft: "3px solid #1976d2", // Vertical line on the left
                                        paddingLeft: "16px", // Padding to give space between the line and the text
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography variant="body2" color="text.secondary">
                                                    {new Date(comment.commentTime).toLocaleString()}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body1" color="text.primary">
                                                    {comment.message}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))}
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
}

export default ViewLead;