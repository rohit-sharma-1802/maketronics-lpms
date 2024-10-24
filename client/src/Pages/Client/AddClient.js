import React,{useState} from 'react'
import { axiosInstance } from '../../utils/Constant';
import { useNavigate } from "react-router-dom";
import { Alert, Box } from '@mui/material';
import ClientSupplierDetailsForm from '../../components/ClientSupplierDetailsForm';


function AddClient() {
 
  const navigate = useNavigate();

  const [currClient, setCurrClient] = useState({
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
  axiosInstance.post("/client/create-client", currClient)
  .then((res)=>{
    navigate("/records/clients");
  })
  .catch((err)=>{
    setErrorMessage("Problem in Adding New Product");
  })
 }

  return (
    <Box width={"100%"}>
        {errorMessage.length > 0 && <Alert severity='error' sx={{marginBottom: 2}} onClose={()=> setErrorMessage("")}>{errorMessage}</Alert>}
        <ClientSupplierDetailsForm label={"Add New Client"} currDetails={currClient} setCurrDetails={setCurrClient} handleSubmit={handleSubmit} />
    </Box>
  )
}

export default AddClient;