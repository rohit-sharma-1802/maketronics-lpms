import React,{useEffect, useState} from 'react'
import { axiosInstance } from '../../utils/Constant';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ClientSupplierDetailsForm from '../../components/ClientSupplierDetailsForm';
import { Box, Alert } from '@mui/material';

function EditClient() {

 const [currClient, setCurrClient] = useState({
    name: "",
    email: [],
    companyName: "",
    phone: [],
    country: "",
    address: ""
 });
 const [errorMessage, setErrorMessage] = useState("");
 const Params = useParams();
 const navigate = useNavigate();

 useEffect(()=>{
    axiosInstance.get(`/client/get-client/${Params.id}`)
    .then((res)=>{
        setCurrClient(res.data.client);
    })
    .catch((err)=>{
        setErrorMessage("Problem in fetching details of Client");
    })
 },[])

 const handleSubmit=(e)=>{
    e.preventDefault();
    setErrorMessage("");
    const temp = {...currClient, id: Params.id};
    axiosInstance.put(`/client/update-client`, temp)
    .then((res)=>{
        navigate(`/records/clients`);
    })
    .catch((err)=>{
        setErrorMessage("Problem in Updating Product");
    })
 }

 
  return (
    <Box width={"100%"}>
        {errorMessage.length > 0 && <Alert severity='error' sx={{marginBottom: 2}} onClose={()=> setErrorMessage("")}>{errorMessage}</Alert>}
        <ClientSupplierDetailsForm label={"Edit Client Details"} currDetails={currClient} setCurrDetails={setCurrClient} handleSubmit={handleSubmit} />
    </Box>
  )
}

export default EditClient