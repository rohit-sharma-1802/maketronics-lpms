import React, { useState } from "react";
import { Stepper, Step, StepLabel, Box} from '@mui/material';
import InvoiceForm from "./InvoiceForm";
import PartForm from "./PartForm";
import ViewInvoice from "./ViewInvoice";

const steps = ["Invoice Details", "Part Details", "View Invoice"]

const CreateInvoice=()=>{

    const [activeStep, setActiveStep] = useState(0);
    const [invoiceId, setInvoiceId] = useState("");

    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return <InvoiceForm setInvoiceId={setInvoiceId} setActiveStep={setActiveStep} />;
          case 1:
            return <PartForm invoiceId={invoiceId} setActiveStep={setActiveStep} />;
          case 2:
            return <ViewInvoice invoiceId={invoiceId}/>;
          default:
            return 'Unknown step';
        }
      };

    return(
        <Box width={"100%"} display={"flex"}>

            <Box width={"88%"}>
                {getStepContent(activeStep)}
            </Box>
            
            <Box width={"12%"} sx={{py: 5, px: 1.5}}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step)=>{
                        return (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
            </Box>
        </Box>

    )
}
export default CreateInvoice;