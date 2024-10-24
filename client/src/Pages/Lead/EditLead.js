import React, { useEffect, useState } from "react";
import LeadForm from "./LeadForm";
import { axiosInstance } from "../../utils/Constant";
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from "@mui/material";


const EditLead = () =>{

    const navigate = useNavigate();
    const Params = useParams();

    const [leadDetails, setLeadDetails] = useState(null);


    useEffect(()=>{
        axiosInstance.get(`/leads/get-lead-details/${Params.id}`)
        .then((res)=>{
            console.log(res.data);
            const temp = {...res.data.leadDetails, Date: res.data.leadDetails.CreationDate};
            setLeadDetails(temp);
        })
    }, [])

    const handleSubmit=(e)=>{
        e.preventDefault();
        axiosInstance.put("/leads/update-lead-details", leadDetails)
        .then((res)=>{
            navigate(`/view-lead-details/${leadDetails.id}`);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    if(leadDetails === null)
        return <CircularProgress />

    return(
        <LeadForm leadDetails={leadDetails} setLeadDetails={setLeadDetails} handleSubmit={handleSubmit} label={"Edit Lead Details"} mode={true}/>
    )
}
export default EditLead;