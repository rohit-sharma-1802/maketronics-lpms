import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { axiosInstance } from '../../utils/Constant';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



export default function ViewProduct() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productsData, setProductsData] = useState([]);
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

  const editProductDetails = (_id) => {
    // Implement edit functionality
    navigate(`../../Product/Edit/${_id}`);
  };

  const previewProductDetails = (_id) => {
    navigate(`../../Product/View/${_id}`);
  }

  const deleteProductDetails = (partNo) => {
    setIsLoading(true);
    axiosInstance.delete(`/product/delete-product/${partNo}`)
      .then((res) => {
        const temp = totalCount - 1;
        const tempProductData = [...productsData];
        const products = tempProductData.filter((product)=>{
            if(product.partNo !== partNo)
            {
                return product;
            }
        });
        console.log(products);
        setProductsData([...products]);
        setTotalCount(temp);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Problem in deleting Record");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const param = {
      page: page + 1,
      limit: rowsPerPage
    };
    axiosInstance.get('/product/get-products-paginated', { params: param })
      .then((res) => {
        setTotalCount(res.data.totalProduct); // Set total count from the response
        setProductsData(res.data.product);
        setIsLoading(false);
        console.log(res);
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
    productsData?.length > 0 ? (
      <Box width={"100%"}>
        <Box display="flex" justifyContent="right" sx={{my: 1.5}}>
            <Button startIcon={<AddCircleOutlineOutlinedIcon />} variant='contained' onClick={()=>{navigate(`../../Product/Add`);}}>Add Product</Button>
        </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" style={{ minWidth: 100 }}>
                  PartNo
                </StyledTableCell>
                <StyledTableCell align="left" style={{ minWidth: 170 }}>
                  Manufacturer
                </StyledTableCell>
                <StyledTableCell align="left" style={{ minWidth: 170 }}>
                  Price
                </StyledTableCell>
                <StyledTableCell align="left" style={{ minWidth: 170 }}>
                  Category
                </StyledTableCell>
                <StyledTableCell align="center" style={{ minWidth: 170 }}>
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData?.map((product) => {
                return (
                  <TableRow hover key={product?._id}>
                    <TableCell align='left'>
                      {product?.partNo}
                    </TableCell>
                    <TableCell align='left'>
                      {product?.manufacturer}
                    </TableCell>
                    <TableCell align='left'>
                      {product?.price}
                    </TableCell>
                    <TableCell align='left'>
                      {product?.category}
                    </TableCell>
                    <TableCell align="center">
                    <Tooltip title="View Product Details">
                        <IconButton
                          onClick={() => previewProductDetails(product?.partNo)}
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Product Details">
                        <IconButton
                          onClick={() => editProductDetails(product?.partNo)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Product Details">
                        <IconButton
                          onClick={() => deleteProductDetails(product?.partNo)}
                        >
                          <DeleteIcon />
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
