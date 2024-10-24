import axios from "axios";

const API_BASE_URL = "https://maketronics-lpms.onrender.com/api/v1";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

const adminEmail = "admin@make-tronics.com";

function generateUniqueString() {
    const currentDate = new Date();
    
    const datePart = currentDate.getFullYear().toString() + 
                     (currentDate.getMonth() + 1).toString().padStart(2, '0') + 
                     currentDate.getDate().toString().padStart(2, '0');
    
    const timePart = currentDate.getHours().toString().padStart(2, '0') + 
                     currentDate.getMinutes().toString().padStart(2, '0') + 
                     currentDate.getSeconds().toString().padStart(2, '0');
    
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    const uniqueString = `${datePart}${timePart}${randomNumber}`;
    
    return uniqueString;
}

const leadDisplayHelper=[
    {
        label: "Date",
        heading: "CreationDate"
    },
    {
        label: "Company Name",
        heading: "Company"
    },
    {
        label: "Quantity",
        heading: "Qty"
    },
    {
        label: "Part No",
        heading: "PartHash"
    },
    {
        label: "Part Status",
        heading: "PartStatus"
    },
    {
        label: "Type of Lead",
        heading: "LeadType"
    },
    {
        label: "Origin of Lead",
        heading: "LeadOrigin"
    },
    {
        label: "Target Price",
        heading: "TargetPrice"
    },
    {
        label: "Availability on Franchise",
        heading: "FranchiseAvailability"
    },
    {
        label: "No of listings on NetC",
        heading: "NetCListings"
    },
    {
        label: "Created By",
        heading: "UserEmail"
    },
    {
        label: "Badge",
        heading: "Badge"
    }
]

const quotesDisplayHelper = [
    {
        label: "Company Name",
        heading: "company"
    },
    {
        label: "Price",
        heading: "Price"
    },
    {
        label: "DC",
        heading: "DC"
    },
    {
        label: "Lead Time",
        heading: "LeadTime"
    },
    {
        label: "Warranty",
        heading: "Warranty"
    },
    {
        label: "Quantity",
        heading: "Qty"
    },
    {
        label: "Email",
        heading: "email"
    },
    {
        label: "Quoted Price",
        heading: "QuotedPrice"
    },
    {
        label: "Order Value",
        heading: "OrderValue"
    },
    {
        label: "Lead Status",
        heading: "LeadStatus"
    },
    {
        label: "Customer Feedback",
        heading: "CustomerFeedback"
    },
]



const badgeOptions = ["Created", "Pending", "Completed"];
const partStatusOptions = ["Active", "Active with Long Lead Time", "NRND", "LTB", "Obsolete"];
const leadTypeOptions = ["Broker", "Marketplace"];
const leadOriginOptions = ["Americas", "EU", "MENA", "Asis (Except China and HK)", "China & HK", "ANZ"];
const franchiseAvailabilityOptions = ["Yes", "No"];
const netCListingsOptions = ["0-25", "25-50", "50-75", "75-100", "100-125", "125-150", "150-175", "175-200"];
const statusOptions = ["Approved", "Rejected"];
const LeadStatusOptions = ["Query Received", "Query Floated to Customers", "Q Received from Supplier 1", "Q Received from Supplier 2", "Q Received from Supplier 3", "Quotation Shared with Customer", "Customer responded with Feedback", "Customer Requested for Pictures"];


const BankDetails = [
    {
        BANK_NAME: "ICICI Bank",
        ACCOUNT_HOLDER: "Maketronics Communications LLP",
        ACCOUNT_TYPE: "Current",
        ACCOUNT_NUMBER: "705405500039",
        BANK_IFSC: "ICICI0007054",
        Condition: "100% Advance Payment"
    },
    {
        ACCOUNT_NAME: "MAKETRONICS COMMUNICATIONS L.L.C-FZ",
        ACCOUNT_CURRENCY: "USD",
        IBAN: "AE740860000009855179532",
        BIC: "WIOBAEADXXX",
        ACCOUNT_NUMBER: "9855179532"
    }
]

const OfficeDetails = [
    {
        address: ["Maketronics Communications LLP","106, Jaypee Klassic Wishtown, Sector 134", "Noida, Uttar Pradesh 201304", "India"],
        email: "sales@make-tronics.com"
    },
    {
        address: ["Maketronics Communications LLC-FZ ", "Meydan Grandstand, 6th floor, Meydan road,", "Nad Al Sheba, Dubai", "UAE"],
        email: "sales@make-tronics.com"
    }
]

export {API_BASE_URL, adminEmail, OfficeDetails, BankDetails, generateUniqueString, badgeOptions, quotesDisplayHelper, leadDisplayHelper, axiosInstance, LeadStatusOptions, partStatusOptions, leadOriginOptions, leadTypeOptions, franchiseAvailabilityOptions, netCListingsOptions, statusOptions};
