import React,{useState} from 'react'
import ProductDetailsForm from '../../components/ProductDetailsForm';
import { axiosInstance } from '../../utils/Constant';
import { useNavigate } from "react-router-dom";


function AddProduct() {
 
  const navigate = useNavigate();

  const [currProduct, setCurrProduct] = useState({
    partNo: "",
    productAttributes: "",//
    additionalInfo: "",//
    productInfo: "", //
    photoUrl: "",
    price: 0,
    manufacturer: "",
    description: "",
    detailDescription: "",
    category: "",
    datasheetURL: "",
    status: "Published"
 });
 const [errorMessage, setErrorMessage] = useState("");

 const handleSubmit=(e)=>{
  e.preventDefault();
  axiosInstance.post("/product/create-product", currProduct)
  .then((res)=>{
    navigate(`/Product/View/${currProduct.partNo}`);
  })
  .catch((err)=>{
    setErrorMessage("Problem in Adding New Product");
  })
 }

  return (
    <ProductDetailsForm label={"Add New Product"} currProduct={currProduct} setCurrProduct={setCurrProduct} handleSubmit={handleSubmit} />
  )
}

export default AddProduct