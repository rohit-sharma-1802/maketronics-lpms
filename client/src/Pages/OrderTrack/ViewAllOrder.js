import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Tooltip, IconButton, Typography } from '@mui/material';
import { axiosInstance } from '../../utils/Constant';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";



export default function ViewAllOrders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ordersData, setOrdersData] = useState([]);
  const [totalCount, setTotalCount] = useState(1); 
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const previewProductDetails = (orderId) => {
    navigate(`/orders/view-order/${orderId}`);
  }

  useEffect(() => {
    const param = {
      page: page + 1,
      limit: rowsPerPage
    };
    axiosInstance.get('/order/get-all-order', { params: param })
      .then((res) => {
        setTotalCount(res.data.totalOrderId); // Set total count from the response
        setOrdersData(res.data.orderIds);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Problem in Fetching Records");
        setIsLoading(false);
      });
  }, [page, rowsPerPage]);

  if(isLoading)
  return <div>Loading....</div>

  return (
    ordersData?.length > 0 ? (
      <Box width={"100%"}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" component="div" sx={{ padding: 2 }}>
          Orders Table
        </Typography>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Order Id
                </TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersData?.map((order) => {
                return (
                  <TableRow hover key={order.orderId}>
                    <TableCell align='left'>
                      {order.orderId}
                    </TableCell>
                    <TableCell align="center">
                    <Tooltip title="View Order Details">
                        <IconButton
                          onClick={() => previewProductDetails(order.orderId)}
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={totalCount} 
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Box>
    ) : (
      <div>Loading...</div>
    )
  );
}
