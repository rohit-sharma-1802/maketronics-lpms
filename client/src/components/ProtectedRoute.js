import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import SideBar from "./Sidebar";
import Header from "./Header";

const ProtectedRoute = ({ children }) => {
 
    return <>
    <Header />
    <Box display={"flex"} sx={{mt:"70px"}}>
        <SideBar />
        {children}
    </Box>
    </>;

};

export default ProtectedRoute;