import React,{useEffect, useState} from 'react'
import { axiosInstance } from '../../utils/Constant';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ClientSupplierDetailsForm from '../../components/ClientSupplierDetailsForm';
import { Box, Alert } from '@mui/material';

function EditSupplier() {

 const [currSupplier, setCurrSupplier] = useState({
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
    axiosInstance.get(`/supplier/get-supplier/${Params.id}`)
    .then((res)=>{
        setCurrSupplier(res.data.supplier);
    })
    .catch((err)=>{
        setErrorMessage("Problem in fetching details");
    })
 },[])

 const handleSubmit=(e)=>{
    e.preventDefault();
    setErrorMessage("");
    const temp = {...currSupplier, id: Params.id};
    axiosInstance.put(`/supplier/update-supplier`, temp)
    .then((res)=>{
        navigate(`/records/suppliers`);
    })
    .catch((err)=>{
        setErrorMessage("Problem in Updating Details");
    })
 }

 
  return (
    <Box width={"100%"}>
        {errorMessage.length > 0 && <Alert severity='error' sx={{marginBottom: 2}} onClose={()=> setErrorMessage("")}>{errorMessage}</Alert>}
        <ClientSupplierDetailsForm label={"Edit Supplier Details"} currDetails={currSupplier} setCurrDetails={setCurrSupplier} handleSubmit={handleSubmit} />
    </Box>
  )
}

export default EditSupplier