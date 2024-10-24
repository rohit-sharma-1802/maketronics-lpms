import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import UserTextField from '../../components/UserTextField';
import AutoFillTextField from "../../components/AutoFillTextField";
import { axiosInstance } from '../../utils/Constant';
import { useParams } from 'react-router-dom';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AddIcon from '@mui/icons-material/Add';

const ViewOrder = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [mode, setMode] = useState("");
  const [openStatus, setOpenStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const Params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/order/get-all-orders/${Params.id}`);
  
        // Use Promise.all to wait for all async operations to complete
        const updatedOrderDetails = await Promise.all(
          res.data.orderDetails.map(async (currOrder) => {
            const status = await fetchStatusDetails(currOrder.orderId, currOrder.partNo);
            return { ...currOrder, status };
          })
        );
  
        // Update the state after all orders have their statuses resolved
        setOrderDetails(updatedOrderDetails);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  
  const fetchStatusDetails = async (orderId, partNo) => {
    try {
      const response = await axiosInstance.get(`/order/get-status/${orderId}/${partNo}`);
      console.log(response.data);
      return response.data.status;
    } catch (error) {
      console.log("Error fetching status:", error);
      return "Unknown"; // Fallback value if there is an error
    }
  };
  

  const handleChange=(label, value, heading, index)=>{
    if(label === "Add Status")
    {
      setNewStatus(value);
      return ;
    }
    const temp = {...selectedOrder};
    if(Array.isArray(value))
    temp[heading] = value[0];
    else
    temp[heading] = value;
    setSelectedOrder(temp);
}

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleAddClick = (order) =>{
    setSelectedOrder(order);
    setOpenStatus(true);
  }

  // Close the modal
  const handleClose = () => {
    setMode("");
    setOpen(false);
    setOpenStatus(false);
    setNewStatus("");
    setSelectedOrder(null);
  };

  const handleSave = () => {
    console.log("Updated Order: ", selectedOrder);
    axiosInstance.put("/order/edit-part", selectedOrder)
    .then((res)=>{
        const tempOrderDetails = orderDetails.map(currOrder => currOrder.partNo === selectedOrder.partNo ? selectedOrder : currOrder);
        setOrderDetails(tempOrderDetails);
        handleClose(); 
    })
    .catch((err)=>{
        console.log(err);
        handleClose();
    })
     // Close the modal after saving
  };

  const handleAddStatus = ()=>{
    axiosInstance.post("/order/add-status", {status: newStatus, orderId: selectedOrder.orderId, partNo: selectedOrder.partNo})
    .then((res)=>{
      const temp = orderDetails.map((order)=>{
        if(order.partNo === selectedOrder.partNo)
        {
          const currOrder = {...selectedOrder};
          currOrder.status.push({status: newStatus});
          return currOrder;
        }
        return order;
      })
      setOrderDetails(temp);
      handleClose();
    })
    .catch((err)=>{
      console.log(err);
      handleClose();
    })
  }

  const addNewPart=()=>{
    setMode("Add");
    setSelectedOrder({partNo: "", orderId: Params.id, origin: "", dest: "", status: "", remark: ""});
    setOpen(true);
  }

  const handleAdd = () =>{
    axiosInstance.post("/order/add-part", selectedOrder)
    .then((res)=>{
        const tempOrderDetails = [...orderDetails];
        const status = [{status: selectedOrder.status}];
        tempOrderDetails.push({...selectedOrder,status});
        setOrderDetails(tempOrderDetails); 
        handleClose();
    })
    .catch((err)=>{
        console.log(err);
        handleClose();
    })
    
  }

  return (
    <Box width={"80%"} mt={3}>
        <Box display={"flex"} justifyContent={"center"}>
            <Typography variant='h5'>Track Order Details</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"right"} my={2}>
            <Button variant="contained" size="small" onClick={addNewPart}>Add Part</Button>
        </Box>
      <List sx={{ paddingLeft: "20px", margin: "20px auto" }}>
        {orderDetails.map((order, index) => (
          <React.Fragment key={index}>
            <ListItem
              alignItems="flex-start"
              sx={{
                borderLeft: "3px solid #1976d2", // Vertical line on the left
                paddingLeft: "16px", // Padding to give space between the line and the text
              }}
            >
              <ListItemText
                primary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Part No: {order.partNo}
                    </Typography>
                    
                  </>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="text.primary">
                      Origin: {order.origin}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      Destination: {order.dest}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      Remark: {order.remark}
                    </Typography>
                    {order.status.map((status, index)=>{
                      return (
                        <Box display={"flex"} key={index} my={1}>
                            <CheckCircleRoundedIcon />
                            <Typography variant="body2" sx={{ml: 0.3, mt: 0.3}}>{status.status}</Typography>
                        </Box>
                      )
                    })}
                  </>
                }
              />
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(order)}>
                <EditIcon />
              </IconButton>
              <Tooltip title="Add Status" placement='top'>
              <IconButton edge="end" aria-label='add' onClick={()=> handleAddClick(order)}>
                <AddIcon />
              </IconButton>
              </Tooltip>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>

      {/* Modal for Editing Order */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{ mode === "Add" ? "Add" : "Edit" } Part Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} height={400} minWidth={550}>
              <UserTextField
                label="Part No"
                heading="partNo"
                value={selectedOrder.partNo}
                handleChange={handleChange}
                readOnly={mode !== "Add"}
              />
              <UserTextField
                label="Origin"
                heading="origin"
                value={selectedOrder.origin}
                handleChange={handleChange}
              />
              <UserTextField
                label="Destination"
                heading="dest"
                value={selectedOrder.dest}
                handleChange={handleChange}
              />
              { mode === "Add" &&
              <AutoFillTextField
                label="Status"
                length={1}
                heading="status"
                options={["Draft", "Completed"]}
                values={selectedOrder.status ? [selectedOrder.status] : []}
                handleChange={handleChange}

              />
              }
              <UserTextField
                label="Remark"
                heading={"remark"}
                value={selectedOrder.remark}
                isTextArea={true}
                handleChange={handleChange}
              />
              
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ mode === "Add" ? handleAdd : handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openStatus} onClose={handleClose}>
        <DialogTitle>Add Status</DialogTitle>
        <DialogContent>
          <UserTextField
          label="Add Status"
          heading="Add Status"
          fullWidth
          value={newStatus}
          handleChange={handleChange} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddStatus} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ViewOrder;
