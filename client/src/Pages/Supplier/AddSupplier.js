import React,{useState} from 'react'
import { axiosInstance } from '../../utils/Constant';
import { useNavigate } from "react-router-dom";
import { Alert, Box } from '@mui/material';
import ClientDetailsForm from '../../components/ClientSupplierDetailsForm';


function AddSupplier() {
 
  const navigate = useNavigate();

  const [currSupplier, setCurrSupplier] = useState({
    name: "",
    email: [],
    companyName: "",
    phone: [],
    country: "",
    address: ""
 });
 const [errorMessage, setErrorMessage] = useState("");

 const handleSubmit=(e)=>{
  e.preventDefault();
  setErrorMessage("");
  axiosInstance.post("/supplier/create-supplier", currSupplier)
  .then((res)=>{
    navigate("/records/suppliers");
  })
  .catch((err)=>{
    setErrorMessage("Problem in Adding Details");
  })
 }

  return (
    <Box width={"100%"}>
        {errorMessage.length > 0 && <Alert severity='error' sx={{marginBottom: 2}} onClose={()=> setErrorMessage("")}>{errorMessage}</Alert>}
        <ClientDetailsForm label={"Add New Supplier"} currDetails={currSupplier} setCurrDetails={setCurrSupplier} handleSubmit={handleSubmit} />
    </Box>
  )
}

export default AddSupplier;