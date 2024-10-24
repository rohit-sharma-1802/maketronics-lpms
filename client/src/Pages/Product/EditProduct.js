import React,{useEffect, useState} from 'react'
import ProductDetailsForm from '../../components/ProductDetailsForm';
import { axiosInstance } from '../../utils/Constant';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function EditProduct() {

 const [currProduct, setCurrProduct] = useState(null);
 const [errorMessage, setErrorMessage] = useState("");
 const Params = useParams();
 const navigate = useNavigate();

 useEffect(()=>{
    axiosInstance.get(`/product/get-product/${Params.id}`)
    .then((res)=>{
        setCurrProduct(res.data.product);
    })
    .catch((err)=>{
        setErrorMessage("Problem in fetching details of Product");
    })
 },[])

 const handleSubmit=(e)=>{
    e.preventDefault();
    axiosInstance.put(`/product/update-product`, currProduct)
    .then((res)=>{
        navigate(`../../Product/View`);
    })
    .catch((err)=>{
        setErrorMessage("Problem in Updating Product");
    })
 }

 if(!currProduct)
    return <CircularProgress />

  return (
    <ProductDetailsForm label={"Edit Product Details"} currProduct={currProduct} setCurrProduct={setCurrProduct} handleSubmit={handleSubmit} />
  )
}

export default EditProduct