import React, { useState } from "react";
import LeadForm from "./LeadForm";
import { adminEmail, axiosInstance } from "../../utils/Constant";
import { useNavigate } from 'react-router-dom';

const CreateLead = () =>{

    const navigate = useNavigate();

    const [leadDetails, setLeadDetails] = useState({
        Date: "",
        Company: "",
        Qty: 0,
        PartHash: "",
        PartStatus: "",
        LeadType: "",
        LeadOrigin: "",
        TargetPrice: 0,
        FranchiseAvailability: "", 
        NetCListings: "", 
        Status: "",
        Email: localStorage.getItem("email"), 
        Badge: "Created"
    });

    const handleSubmit=(e)=>{
        e.preventDefault();
        axiosInstance.post("/leads/create-lead", leadDetails)
        .then((res)=>{
            console.log(res.data);
            if(leadDetails.Status==="Approved" && localStorage.getItem("email") === adminEmail)
                navigate(`/fill-Quote/${res.data.leadDetails.id}`);
            else
                navigate(`/leads/view-all`);

        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <LeadForm leadDetails={leadDetails} setLeadDetails={setLeadDetails} handleSubmit={handleSubmit} label={"Create New Lead"} mode={false}/>
    )
}
export default CreateLead;