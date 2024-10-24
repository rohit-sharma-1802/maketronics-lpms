import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import FillQuoteDetails from "./FillQuoteDetails";
import { axiosInstance } from "../../utils/Constant";

const AddQuoteDetails = () => {
    const Params = useParams();
    const navigate = useNavigate();

    // Initial supplier details with dynamic addition
    const [supplierDetails, setSupplierDetails] = useState([{
        id: Params.id,
        price: 0,
        dc: "",
        leadTime: "",
        warranty: "",
        qty: 0,
        email: "",
        company: "",
        quotedPrice: 0,
        orderValue: 0,
        leadStatus: "",
        customerFeedback: ""
    }]);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("/leads/create-lead-quote", supplierDetails)
            .then((res) => {
                console.log(res.data);
                navigate(`/view-lead-details/${Params.id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Function to add more suppliers
    const addSupplier = () => {
        setSupplierDetails([
            ...supplierDetails,
            {
                id: Params.id,
                price: 0,
                dc: "",
                leadTime: "",
                warranty: "",
                qty: 0,
                email: "",
                company: "",
                quotedPrice: 0,
                orderValue: 0,
                leadStatus: "",
                customerFeedback: ""
            }
        ]);
    };

    // Function to remove a supplier
    const removeSupplier = (index) => {
        const updatedSuppliers = [...supplierDetails];
        updatedSuppliers.splice(index, 1); // Remove the supplier at the given index
        setSupplierDetails(updatedSuppliers);
    };

    return (
        <FillQuoteDetails 
            supplierDetails={supplierDetails} 
            setSupplierDetails={setSupplierDetails} 
            handleSubmit={handleSubmit} 
            addSupplier={addSupplier}
            removeSupplier={removeSupplier} 
        />
    );
}

export default AddQuoteDetails;
